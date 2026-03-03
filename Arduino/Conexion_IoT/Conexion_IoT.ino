#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ==================== CONFIGURACIÓN WIFI ====================
const char *WIFI_SSID = "CODEFIX";
const char *WIFI_PASSWORD = "Nixesali91036@";

// ==================== CONFIGURACIÓN BACKEND ====================
const char *BACKEND_URL = "http://192.168.101.3:5002/api/ambientes/evento";

// ==================== CONFIGURACIÓN DE PINES ====================
#define PIR_PIN_1 12   // PIR Habitación principal
#define RELAY_PIN_1 26 // Relé Habitación principal

#define PIR_PIN_2 14   // PIR Cocina
#define RELAY_PIN_2 27 // Relé Cocina

// ==================== CONFIGURACIÓN DE AMBIENTES ====================
struct Ambiente
{
  const char *id;
  const char *nombre;
  int pirPin;
  int relayPin;
  bool motionDetected;
  bool relayState;
  unsigned long lastMotionTime;
  unsigned long lastDebounceTime;
  int lastPirState;
};

Ambiente ambientes[] = {
    {"amb_001", "Habitación Principal", PIR_PIN_1, RELAY_PIN_1, false, false, 0, 0, LOW},
    {"amb_002", "Cocina", PIR_PIN_2, RELAY_PIN_2, false, false, 0, 0, LOW}};

const int NUM_AMBIENTES = 2;

// ==================== TIEMPOS ====================
const unsigned long DEBOUNCE_TIME = 200;
const unsigned long RELAY_ON_TIME = 5000;

// ==================== SETUP ====================
void setup()
{
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n=================================");
  Serial.println("LuxSense ESP32 Iniciando...");
  Serial.println("=================================");

  // Configurar pines
  for (int i = 0; i < NUM_AMBIENTES; i++)
  {
    pinMode(ambientes[i].pirPin, INPUT);
    pinMode(ambientes[i].relayPin, OUTPUT);
    digitalWrite(ambientes[i].relayPin, HIGH); // Apagado inicial
  }

  // Conectar WiFi
  connectWiFi();
}

// ==================== LOOP PRINCIPAL ====================
void loop()
{
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("WiFi desconectado. Reconectando...");
    connectWiFi();
  }

  // Procesar cada ambiente
  for (int i = 0; i < NUM_AMBIENTES; i++)
  {
    procesarAmbiente(i);
  }

  delay(50);
}

// ==================== PROCESAR AMBIENTE ====================
void procesarAmbiente(int idx)
{
  Ambiente &amb = ambientes[idx];
  int pirReading = digitalRead(amb.pirPin);

  // Antirrebote
  if (pirReading != amb.lastPirState)
  {
    amb.lastDebounceTime = millis();
  }

  if ((millis() - amb.lastDebounceTime) > DEBOUNCE_TIME)
  {
    if (pirReading == HIGH && !amb.motionDetected)
    {
      amb.motionDetected = true;
      amb.lastMotionTime = millis();

      if (!amb.relayState)
      {
        activarRele(idx);
      }
    }

    if (pirReading == HIGH)
    {
      amb.lastMotionTime = millis();
      amb.motionDetected = true;
    }
  }

  amb.lastPirState = pirReading;

  // Control tiempo sin movimiento
  if (amb.motionDetected)
  {
    if ((millis() - amb.lastMotionTime) > RELAY_ON_TIME)
    {
      if (amb.relayState)
      {
        desactivarRele(idx);
      }
      amb.motionDetected = false;
    }
  }
}

// ==================== ACTIVAR RELÉ ====================
void activarRele(int idx)
{
  Ambiente &amb = ambientes[idx];
  digitalWrite(amb.relayPin, LOW);
  amb.relayState = true;

  Serial.print("ENCENDIDO: ");
  Serial.println(amb.nombre);

  enviarEvento(amb.id, amb.nombre, "encendido");
}

// ==================== DESACTIVAR RELÉ ====================
void desactivarRele(int idx)
{
  Ambiente &amb = ambientes[idx];
  digitalWrite(amb.relayPin, HIGH);
  amb.relayState = false;

  Serial.print("APAGADO: ");
  Serial.println(amb.nombre);

  enviarEvento(amb.id, amb.nombre, "apagado");
}

// ==================== ENVIAR EVENTO AL BACKEND ====================
void enviarEvento(const char *ambienteId, const char *nombre, const char *estado)
{
  if (WiFi.status() != WL_CONNECTED)
    return;

  HTTPClient http;
  http.begin(BACKEND_URL);
  http.addHeader("Content-Type", "application/json");

  JsonDocument doc;
  doc["ambiente_id"] = ambienteId;
  doc["nombre"] = nombre;
  doc["estado"] = estado;
  doc["timestamp"] = millis();

  String jsonBody;
  serializeJson(doc, jsonBody);

  int httpCode = http.POST(jsonBody);

  if (httpCode == 200 || httpCode == 201)
  {
    Serial.print("Evento enviado al backend: ");
    Serial.println(estado);
  }
  else
  {
    Serial.print("Error enviando evento: ");
    Serial.println(httpCode);
  }

  http.end();
}

// ==================== CONECTAR WIFI ====================
void connectWiFi()
{
  Serial.print("Conectando a WiFi: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 20)
  {
    delay(500);
    Serial.print(".");
    intentos++;
  }

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("\nWiFi conectado!");
    Serial.print("IP del ESP32: ");
    Serial.println(WiFi.localIP());
  }
  else
  {
    Serial.println("\nNo se pudo conectar al WiFi");
  }
}