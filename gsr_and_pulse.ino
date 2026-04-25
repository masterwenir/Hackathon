#define USE_ARDUINO_INTERRUPTS true
#include <PulseSensorPlayground.h>

const int Pulse_Pin   = A0;
const int GSR_Pin     = A2;
const int Buzzer_Pin  = 9;
const int LED_Pin     = 13;

int baselineGSR = 0;
int gsrThreshold = 10;
int baselineBPM = 0;
bool calibrated = false;

PulseSensorPlayground pulseSensor;

void setup() {
  Serial.begin(9600);
  pinMode(Buzzer_Pin, OUTPUT);
  pinMode(LED_Pin, OUTPUT);

  // Set up PulseSensor
  pulseSensor.analogInput(Pulse_Pin);
  pulseSensor.setThreshold(700);         // Just below your peak (720–800)
  pulseSensor.blinkOnPulse(LED_Pin);
  pulseSensor.begin();

  // Calibration
  Serial.println("🔁 Calibrating BPM...");
  long totalBPM = 0;
  int count = 0;
  unsigned long start = millis();

  while (millis() - start < 5000) {
    if (pulseSensor.sawStartOfBeat()) {
      int bpm = pulseSensor.getBeatsPerMinute();
      if (bpm >= 45 && bpm <= 130) {
        totalBPM += bpm;
        count++;
      }
    }
    delay(20);
  }

  if (count > 0) {
    baselineBPM = totalBPM / count;
    calibrated = true;
    Serial.print("✅ Baseline BPM: ");
    Serial.println(baselineBPM);
  } else {
    Serial.println("❌ BPM calibration failed.");
  }

  Serial.println("🔁 Calibrating GSR...");
  long gsrTotal = 0;
  for (int i = 0; i < 500; i++) {
    gsrTotal += analogRead(GSR_Pin);
    delay(2);
  }
  baselineGSR = gsrTotal / 500;
  Serial.print("✅ Baseline GSR: ");
  Serial.println(baselineGSR);
}

void loop() {
  if (!calibrated) return;

  // Read GSR
  long gsrSum = 0;
  for (int i = 0; i < 100; i++) {
    gsrSum += analogRead(GSR_Pin);
    delay(2);
  }
  int gsrAvg = gsrSum / 100;
  int gsrDiff = gsrAvg - baselineGSR;

  // Heartbeat detection
  static int lastBPM = baselineBPM;
  if (pulseSensor.sawStartOfBeat()) {
    int bpm = pulseSensor.getBeatsPerMinute();
    if (bpm >= 45 && bpm <= 130) {
      lastBPM = bpm;
    }

    int bpmDiff = lastBPM - baselineBPM;

    Serial.print("❤️ BPM: ");
    Serial.print(lastBPM);
    Serial.print(" | Δ: ");
    Serial.println(bpmDiff);

    Serial.print("GSR: ");
    Serial.print(gsrAvg);
    Serial.print(" | Δ: ");
    Serial.println(gsrDiff);

    if (bpmDiff > 10 || abs(gsrDiff) > gsrThreshold) {
      Serial.println("⚠️ Stress Detected — Buzzing!");
      tone(Buzzer_Pin, 1000);
      delay(200);
      noTone(Buzzer_Pin);
    } else {
      Serial.println("✅ Normal");
    }
  }
}