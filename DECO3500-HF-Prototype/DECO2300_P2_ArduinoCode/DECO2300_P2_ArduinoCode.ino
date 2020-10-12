/*
  Optical Heart Rate Detection (PBA Algorithm) using the MAX30105 Breakout
  By: Nathan Seidle @ SparkFun Electronics
  Date: October 2nd, 2016
  https://github.com/sparkfun/MAX30105_Breakout

  This is a demo to show the reading of heart rate or beats per minute (BPM) using
  a Penpheral Beat Amplitude (PBA) algorithm.

  It is best to attach the sensor to your finger using a rubber band or other tightening
  device. Humans are generally bad at applying constant pressure to a thing. When you
  press your finger against the sensor it varies enough to cause the blood in your
  finger to flow differently which causes the sensor readings to go wonky.

  Hardware Connections (Breakoutboard to Arduino):
  -5V = 5V (3.3V is allowed)
  -GND = GND
  -SDA = A4 (or SDA)
  -SCL = A5 (or SCL)
  -INT = Not connected

  The MAX30105 Breakout can handle 5V or 3.3V I2C logic. We recommend powering the board with 5V
  but it will also run at 3.3V.
*/
// Circuit Playground Accelerometer Mouse Example
// Tilt Circuit Playground left/right and up/down to move your mouse, and
// press the left and right push buttons to click the mouse buttons!  Make sure
// the slide switch is in the on (+) position to enable the mouse, or slide into
// the off (-) position to disable it.  By default the sketch assumes you hold
// Circuit Playground with the USB cable coming out the top.
// Author: Tony DiCola
// License: MIT License (https://opensource.org/licenses/MIT)
#include <Adafruit_CircuitPlayground.h>
#include <Mouse.h>
#include <Wire.h>
#include <SPI.h>


// Configuration values to adjust the sensitivity and speed of the mouse.
// X axis (left/right) configuration:
#define XACCEL_MIN 0.1      // Minimum range of X axis acceleration, values below
                            // this won't move the mouse at all.
#define XACCEL_MAX 8.0      // Maximum range of X axis acceleration, values above
                            // this will move the mouse as fast as possible.
#define XMOUSE_RANGE 25.0   // Range of velocity for mouse movements.  The higher
                            // this value the faster the mouse will move.
#define XMOUSE_SCALE 1      // Scaling value to apply to mouse movement, this is
                            // useful to set to -1 to flip the X axis movement.

// Y axis (up/down) configuration:
// Note that the meaning of these values is exactly the same as the X axis above,
// just applied to the Y axis and up/down mouse movement.  You probably want to
// keep these values the same as for the X axis (which is the default, they just
// read the X axis values but you can override with custom values).
#define YACCEL_MIN XACCEL_MIN
#define YACCEL_MAX XACCEL_MAX
#define YMOUSE_RANGE XMOUSE_RANGE
#define YMOUSE_SCALE 1

// Set this true to flip the mouse X/Y axis with the board X/Y axis (what you want
// if holding with USB cable facing up).
#define FLIP_AXES true


// Floating point linear interpolation function that takes a value inside one
// range and maps it to a new value inside another range.  This is used to transform
// each axis of acceleration to mouse velocity/speed. See this page for details
// on the equation: https://en.wikipedia.org/wiki/Linear_interpolation
float lerp(float x, float x0, float x1, float y0, float y1) {
  // Check if the input value (x) is outside its desired range and clamp to
  // those min/max y values.
  if (x <= x0) {
    return y0;
  }
  else if (x >= x1) {
    return y1;
  }
  // Otherwise compute the value y based on x's position within its range and
  // the desired y min & max.
  return y0 + (y1-y0)*((x-x0)/(x1-x0));
}

#include <Wire.h>
#include "MAX30105.h"

#include "heartRate.h"

MAX30105 particleSensor;

const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;

void setup()
{
   // Initialize Circuit Playground library.
  CircuitPlayground.begin();
  // Initialize Arduino mouse library.
  Mouse.begin();
  Serial.begin(115200);
 // Serial.println("Initializing...");

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    //Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  //Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
}

void loop()
{ long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true)
  {
    //We sensed a beat!
    long delta = millis() - lastBeat;
    lastBeat = millis();

    beatsPerMinute = 60 / (delta / 1000.0);

    if (beatsPerMinute < 255 && beatsPerMinute > 20)
    {
      rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
      rateSpot %= RATE_SIZE; //Wrap variable

      //Take average of readings
      beatAvg = 0;
      for (byte x = 0 ; x < RATE_SIZE ; x++)
        beatAvg += rates[x];
      beatAvg /= RATE_SIZE;
    }
  }

  //Serial.print("IR=");
  //Serial.print(irValue);
  //Serial.print(", BPM=");
  //Serial.print(beatsPerMinute);
  //Serial.print(", Avg BPM=");
  Serial.print(beatAvg);

 // if (irValue < 50000)
 //   Serial.print(" No finger?");

  Serial.println();
  // Check if the slide switch is enabled (on +) and if not then just exit out
  // and run the loop again.  This lets you turn on/off the mouse movement with
  // the slide switch.
  if (!CircuitPlayground.slideSwitch()) {
    return;
  }

  // Grab initial left & right button states to later check if they are pressed
  // or released.  Do this early in the loop so other processing can take some
  // time and the button state change can be detected.
  boolean left_first = CircuitPlayground.leftButton();
  boolean right_first = CircuitPlayground.rightButton();

  // Grab x, y acceleration values (in m/s^2).
  float x = CircuitPlayground.motionX();
  float y = CircuitPlayground.motionY();
  // Use the magnitude of acceleration to interpolate the mouse velocity.
  float x_mag = abs(x);
  float x_mouse = lerp(x_mag, XACCEL_MIN, XACCEL_MAX, 0.0, XMOUSE_RANGE);
  float y_mag = abs(y);
  float y_mouse = lerp(y_mag, YACCEL_MIN, YACCEL_MAX, 0.0, YMOUSE_RANGE);
  // Change the mouse direction based on the direction of the acceleration.
  if (x < 0) {
    x_mouse *= -1.0;
  }
  if (y < 0) {
    y_mouse *= -1.0;
  }
  // Apply any global scaling to the axis (to flip it for example) and truncate
  // to an integer value.
  x_mouse = floor(x_mouse*XMOUSE_SCALE);
  y_mouse = floor(y_mouse*YMOUSE_SCALE);

  // Move mouse.
  if (!FLIP_AXES) {
    // Non-flipped axes, just map board X/Y to mouse X/Y.
    Mouse.move((int)x_mouse, (int)y_mouse, 0);
  }
  else {
    // Flipped axes, swap them around.
    Mouse.move((int)y_mouse, (int)x_mouse, 0);
  }

  // Small delay to wait for button state changes and slow down processing a bit.
  delay(10);

  // Grab a second button state reading to check if the buttons were pressed or
  // released.
  boolean left_second = CircuitPlayground.leftButton();
  boolean right_second = CircuitPlayground.rightButton();

  // Check for left button pressed / released.
  if (!left_first && left_second) {
    // Low then high, button was pressed!
    Mouse.press(MOUSE_LEFT);
  }
  else if (left_first && !left_second) {
    // High then low, button was released!
    Mouse.release(MOUSE_LEFT);
  }
  // Check for right button pressed / released.
  if (!right_first && right_second) {
    // Low then high, button was pressed!
    Mouse.press(MOUSE_RIGHT);
  }
  else if (right_first && !right_second) {
    // High then low, button was released!
    Mouse.release(MOUSE_RIGHT);
  }
 
}
