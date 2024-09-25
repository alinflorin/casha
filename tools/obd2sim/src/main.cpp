#include <Arduino.h>

// Define the built-in LED pin
const int ledPin = 2; // Typically, the built-in LED is on GPIO 2

void setup() {
  // Initialize the built-in LED pin as an output
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Turn the LED on
  digitalWrite(ledPin, HIGH);
  delay(1000); // Wait for a second

  // Turn the LED off
  digitalWrite(ledPin, LOW);
  delay(1000); // Wait for a second
}
