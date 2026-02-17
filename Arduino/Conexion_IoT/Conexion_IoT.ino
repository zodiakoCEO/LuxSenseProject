/*
  ESP32 + PIR HC-SR501 + Relé 8 Canales 12V
  -----------------------------------------
  Hardware:
  - ESP32 (cualquier modelo compatible con Arduino IDE)
  - Sensor PIR HC-SR501:
      VCC -> 5V ESP32
      GND -> GND ESP32
      OUT -> GPIO12 (D12)
  - Módulo Relé 8 canales 12V:
      VCC -> 5V ESP32
      GND -> GND ESP32
      IN1 -> GPIO26 (D26)
      Alimentación relés: 12V externa con GND común
  - Carga (bombillo) conectada a NC/NO del relé

  Funcionalidad:
  - Detecta movimiento con PIR
  - Activa relé para encender lámpara
  - Mantiene lámpara encendida mientras hay movimiento
  - Apaga cuando no detecta movimiento
  - Monitor serial para debug
*/

// ==================== CONFIGURACIÓN DE PINES ====================
#define PIR_PIN     12    // Sensor PIR HC-SR501 conectado a GPIO12
#define RELAY_PIN   26    // Relé IN1 conectado a GPIO26

// ==================== CONFIGURACIÓN DE TIEMPOS ====================
const unsigned long DEBOUNCE_TIME = 200;      // Tiempo antirrebote PIR (ms)
const unsigned long RELAY_ON_TIME = 5000;     // Tiempo que permanece encendido el relé después del último movimiento (ms)

// ==================== VARIABLES GLOBALES ====================
bool motionDetected = false;
bool relayState = false;
unsigned long lastMotionTime = 0;
unsigned long lastDebounceTime = 0;
int lastPirState = LOW;

// ==================== SETUP ====================
void setup() {
  // Inicializar comunicación serial
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n\n=================================");
  Serial.println("ESP32 + PIR + Relé Iniciado");
  Serial.println("=================================");
  
  // Configurar pines
  pinMode(PIR_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  
  // Estado inicial del relé (apagado)
  // IMPORTANTE: La mayoría de módulos son ACTIVO BAJO (LOW = ON, HIGH = OFF)
  digitalWrite(RELAY_PIN, HIGH);  // Relé apagado
  relayState = false;
  
  Serial.println("Configuración completada:");
  Serial.print("  - PIR en GPIO: ");
  Serial.println(PIR_PIN);
  Serial.print("  - Relé en GPIO: ");
  Serial.println(RELAY_PIN);
  Serial.println("Sistema listo. Esperando movimiento...\n");
}

// ==================== LOOP PRINCIPAL ====================
void loop() {
  // Leer estado del sensor PIR
  int pirReading = digitalRead(PIR_PIN);
  
  // ========== ANTIRREBOTE DEL PIR ==========
  if (pirReading != lastPirState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > DEBOUNCE_TIME) {
    // Si el estado es estable, procesarlo
    if (pirReading == HIGH && !motionDetected) {
      motionDetected = true;
      lastMotionTime = millis();
      
      // Activar relé (encender lámpara)
      if (!relayState) {
        activateRelay();
      }
      
      Serial.println("MOVIMIENTO DETECTADO!");
      Serial.print("   Tiempo: ");
      Serial.print(millis() / 1000);
      Serial.println(" seg");
    }
    
    if (pirReading == HIGH) {
      // Actualizar tiempo mientras sigue detectando movimiento
      lastMotionTime = millis();
      motionDetected = true;
    }
  }
  
  lastPirState = pirReading;
  
  // ========== CONTROL DEL RELÉ ==========
  // Si hay movimiento reciente, mantener relé activo
  if (motionDetected) {
    unsigned long timeSinceMotion = millis() - lastMotionTime;
    
    if (timeSinceMotion > RELAY_ON_TIME) {
      // Apagar relé si pasó el tiempo sin movimiento
      if (relayState) {
        deactivateRelay();
      }
      motionDetected = false;
      Serial.println("⚪ Sin movimiento - Lámpara apagada");
      Serial.println("-----------------------------------\n");
    }
  }
  
  // Pequeño delay para estabilidad
  delay(50);
}

// ==================== FUNCIONES AUXILIARES ====================

// Función para activar el relé (encender lámpara)
void activateRelay() {
  digitalWrite(RELAY_PIN, LOW);  // ACTIVO BAJO: LOW = encender relé
  relayState = true;
  Serial.println("RELÉ ACTIVADO - Lámpara encendida");
}

// Función para desactivar el relé (apagar lámpara)
void deactivateRelay() {
  digitalWrite(RELAY_PIN, HIGH);  // ACTIVO BAJO: HIGH = apagar relé
  relayState = false;
  Serial.println(" RELÉ DESACTIVADO - Lámpara apagada");
}