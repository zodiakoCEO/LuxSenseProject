**
 * LuxSense ESP32 - Control de iluminación por movimiento
 * 
 * Arquitectura:
 *   Core 1 → Loop principal: lee PIR y controla relé (tiempo real)
 *   Core 0 → Tarea HTTP: envía eventos al backend sin bloquear
 * 
 * Conexiones:
 *   PIR OUT  → GPIO26
 *   Relé IN1 → GPIO27
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ==================== CONFIGURACIÓN ====================
const char* WIFI_SSID      = "CODEFIX";
const char* WIFI_PASSWORD  = "Nixesali91036@";
const char* BACKEND_URL    = "http://192.168.101.6:3000/api/ambientes/evento";
const char* DEVICE_API_KEY = "196338adbfe8e8fd0cb0cb28ba2de5c84e54eca8b4ccdf4233f6a75c01ecb6f5";
const char* SENSOR_ID      = "esp32_001";        // debe coincidir con sensor_id en MongoDB

// ==================== PINES ====================
#define PIR_PIN    26
#define RELAY_PIN  27

// ==================== TIEMPOS ====================
const unsigned long RELAY_ON_TIME = 30000; // 30 seg sin movimiento → apagar
const unsigned long DEBOUNCE_TIME = 200;   // antirrebote del PIR

// ==================== FREERTOS QUEUE ====================
struct EventoSensor {
    char estado[12]; // "encendido" o "apagado"
};

QueueHandle_t eventoQueue;

// ==================== ESTADO GLOBAL ====================
volatile bool          releActivo      = false;
volatile unsigned long ultimoMovimiento = 0;
volatile unsigned long lastDebounce     = 0;
volatile int           lastPirState     = LOW;

// ==================== TAREA HTTP (Core 0) ====================
void tareaHTTP(void* parameter) {
    EventoSensor evento;

    for (;;) {
        // Bloquea hasta que llegue un evento en la cola
        if (xQueueReceive(eventoQueue, &evento, portMAX_DELAY) == pdTRUE) {

            // Reconectar WiFi si fue necesario
            if (WiFi.status() != WL_CONNECTED) {
                Serial.println("[WiFi] Reconectando...");
                WiFi.reconnect();
                int intentos = 0;
                while (WiFi.status() != WL_CONNECTED && intentos < 20) {
                    vTaskDelay(500 / portTICK_PERIOD_MS);
                    intentos++;
                }
                if (WiFi.status() != WL_CONNECTED) {
                    Serial.println("[WiFi] No se pudo reconectar, evento descartado");
                    continue;
                }
            }

            HTTPClient http;
            http.begin(BACKEND_URL);
            http.addHeader("Content-Type", "application/json");
            http.addHeader("x-device-key", DEVICE_API_KEY);
            http.setTimeout(5000);

            JsonDocument doc;
            doc["sensor_id"] = SENSOR_ID;
            doc["estado"]    = evento.estado;

            String body;
            serializeJson(doc, body);

            int httpCode = http.POST(body);
            http.end();

            if (httpCode == 200 || httpCode == 201) {
                Serial.printf("[HTTP] POST '%s' → %d\n", evento.estado, httpCode);
            } else {
                Serial.printf("[HTTP] Error POST '%s' → %d\n", evento.estado, httpCode);
            }
        }
    }
}

// ==================== HELPERS ====================
void activarRele() {
    digitalWrite(RELAY_PIN, LOW);
    releActivo = true;

    EventoSensor ev;
    strcpy(ev.estado, "encendido");
    xQueueSend(eventoQueue, &ev, 0);

    Serial.println("Movimiento → RELÉ ENCENDIDO");
}

void desactivarRele() {
    digitalWrite(RELAY_PIN, HIGH);
    releActivo = false;

    EventoSensor ev;
    strcpy(ev.estado, "apagado");
    xQueueSend(eventoQueue, &ev, 0);

    Serial.println(" Sin movimiento → RELÉ APAGADO");
}

// ==================== SETUP ====================
void setup() {
    Serial.begin(115200);
    delay(500);

    // Configurar pines
    pinMode(PIR_PIN, INPUT);
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, HIGH); // Apagado al inicio

    // Conectar WiFi
    Serial.printf("[WiFi] Conectando a %s", WIFI_SSID);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.printf("\n[WiFi]  Conectado — IP: %s\n", WiFi.localIP().toString().c_str());

    // Crear cola de eventos (capacidad 10)
    eventoQueue = xQueueCreate(10, sizeof(EventoSensor));
    if (eventoQueue == NULL) {
        Serial.println("[ERROR] No se pudo crear la queue FreeRTOS");
        while(1);
    }

    // Crear tarea HTTP en Core 0 (Core 1 es el loop principal)
    xTaskCreatePinnedToCore(
        tareaHTTP,  // función
        "HTTPTask", // nombre
        8192,       // stack en bytes
        NULL,       // parámetro
        1,          // prioridad
        NULL,       // handle (no necesario)
        0           // Core 0
    );

    Serial.println("[PIR] Calibrando sensor, espera 5 segundos...");
    delay(5000);
    Serial.println("[Sistema]  Listo para detectar movimiento");
}

// ==================== LOOP PRINCIPAL (Core 1) ====================
void loop() {
    int pirReading = digitalRead(PIR_PIN);
    unsigned long ahora = millis();

    // Antirrebote
    if (pirReading != lastPirState) {
        lastDebounce = ahora;
    }

    if ((ahora - lastDebounce) > DEBOUNCE_TIME) {
        if (pirReading == HIGH) {
            ultimoMovimiento = ahora;

            if (!releActivo) {
                activarRele();
            }
        }
    }

    lastPirState = pirReading;

    // Apagar si no hay movimiento por RELAY_ON_TIME
    if (releActivo && (ahora - ultimoMovimiento > RELAY_ON_TIME)) {
        desactivarRele();
    }

    delay(50);
}