#include <WiFi.h>
#include <HTTPClient.h>

// Definición de Pines
#define PIR_A_PIN 32
#define PIR_B_PIN 27
#define RELE_A_PIN 26
#define RELE_B_PIN 25

const long tiempoEncendido = 10000; // 10 segundos

unsigned long tiempoUltimoMovimientoA = 0;
unsigned long tiempoUltimoMovimientoB = 0;

// ---- CREDENCIALES WIFI ----
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";

// ---- URL DE TU BACKEND ----
String serverUrl = "http://TU_IP:PUERTO/api/evento";

// ---- FUNCION PARA ENVIAR DATOS ----
void enviarEvento(String zona, String accion) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"zona\":\"" + zona + "\",\"accion\":\"" + accion + "\"}";

    int codigo = http.POST(json);

    Serial.print("Envío a backend: ");
    Serial.println(json);
    Serial.print("Código respuesta: ");
    Serial.println(codigo);

    http.end();
  } else {
    Serial.println("WiFi desconectado, no se pudo enviar.");
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(PIR_A_PIN, INPUT);
  pinMode(PIR_B_PIN, INPUT);
  pinMode(RELE_A_PIN, OUTPUT);
  pinMode(RELE_B_PIN, OUTPUT);

  digitalWrite(RELE_A_PIN, HIGH);
  digitalWrite(RELE_B_PIN, HIGH);

  Serial.println("Conectando al WiFi...");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi conectado.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {

  // --- ESPACIO 1 ---
  if (digitalRead(PIR_A_PIN) == HIGH) {
    tiempoUltimoMovimientoA = millis();
    digitalWrite(RELE_A_PIN, LOW);

    Serial.println("Movimiento en ESPACIO 1");
    enviarEvento("ESPACIO_1", "Movimiento");
  }

  if (millis() - tiempoUltimoMovimientoA > tiempoEncendido) {
    digitalWrite(RELE_A_PIN, HIGH);

    // Enviar solo si estaba encendido
    if (millis() - tiempoUltimoMovimientoA < tiempoEncendido + 50) {
      enviarEvento("ESPACIO_1", "ApagadoAutomático");
    }
  }

  // --- ESPACIO 2 ---
  if (digitalRead(PIR_B_PIN) == HIGH) {
    tiempoUltimoMovimientoB = millis();
    digitalWrite(RELE_B_PIN, LOW);

    Serial.println("Movimiento en ESPACIO 2");
    enviarEvento("ESPACIO_2", "Movimiento");
  }

  if (millis() - tiempoUltimoMovimientoB > tiempoEncendido) {
    digitalWrite(RELE_B_PIN, HIGH);

    if (millis() - tiempoUltimoMovimientoB < tiempoEncendido + 50) {
      enviarEvento("ESPACIO_2", "ApagadoAutomático");
    }
  }
}