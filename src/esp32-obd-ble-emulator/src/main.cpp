#include <Arduino.h>
#include <device_config.h>
#include <NimBLEDevice.h>
#include <BLE_DESIGN.g.h>
#include <SPI.h>
#include <MyBLE.h>
#include <serial_emulator.h>
#include <OBD2.h>
#include <Wire.h>

#include <OBDCommanderStruct.h>
#include <Commander.h>
// #define OBD_COMMANDER_STRUCT_H

// const int SPI_CS_PIN = 10;
// const int CAN_INT_PIN = 2;

const int SPI_CS_PIN = 5;
const int CAN_INT_PIN = 26;

// https://github.com/sandeepmistry/arduino-CAN

// https://github.com/collin80/ESP32RET
// https://github.com/collin80/esp32_can

// question close BLE GATT advs

// gpServer is use to controlling BLE GATT with sensor
static NimBLEServer *gpServer;

// Hidden wrapper for gatt server setup & control central pairing
static MyBLE myBLELib;

static BLESerialEmulator serialEmulator;

void obdPackageBLECallBack(obd_commander_struct obd, MyBLE *bleLib)
{
  if (bleLib->isMobileConnected())
  {
    bleLib->setGeneric(obd.BLE_SERVICE_UUID, obd.BLE_CHARACTERISTIC_UUID, obd.data);
  }
  else
  {
    Serial.println("Mobile NOT Connected");
  }
}

void setup()
{
  Serial.begin(115200);
  Serial.println("Starting BLE serverx");
  Serial1.begin(9600, SERIAL_8N1, 16, 17);

  NimBLEDevice::init(DEVICE_NAME);
  NimBLEDevice::setPower(ESP_PWR_LVL_P9);
  gpServer = NimBLEDevice::createServer();
  myBLELib.init(gpServer);

  // TODO Mode
  // 1. READ continuously for OBD data
  // 2. Request read via PID
  // put your setup code here, to run once:
#ifdef DEBUG_BLE_SERIAL_EMULATOR
  serialEmulator.init(&myBLELib);
#endif
  delay(500);
#if defined(COMMANDER_SERIAL_TO_BLE) && !defined(DEBUG_BLE_SERIAL_EMULATOR)
  Commander.init(&Serial1, &myBLELib);
  Commander.initWatchCallBack(decodeOBD);
  Commander.initWatchParsedCallBack(obdPackageBLECallBack);
  delay(500);
#endif
}
/// TODO READ OBD Code from car
/// 1. how does it hook up to the vehicle
void loop()
{
#ifdef DEBUG_BLE_SERIAL_EMULATOR
  serialEmulator.start();
#endif
#if defined(COMMANDER_SERIAL_TO_BLE) && !defined(DEBUG_BLE_SERIAL_EMULATOR)
  if (myBLELib.isMobileConnected())
  {
    Commander.watch();
  }
#endif
}