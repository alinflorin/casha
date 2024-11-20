#include <Arduino.h>
#include <NimBLEDevice.h>
#include <NimBLEDevice.h>
#include <BLE_DESIGN.g.h>

// Hidden wrapper class for setting GATT Server (Services, Characteristics)
// TODO Make ESP32 running 2 core with xTask
// Task are reading sensor and calling BLE wrapper
// https://www.youtube.com/watch?v=El7_ZUn6NeU
// using RTOS (Roud Robin Queue base one [execution quota] to comsume task)
// https://github.com/chegewara/esp32-OTA-over-BLE/blob/master/BLE_server/main/main_ble.cpp

#ifndef MYBLE_H_
#define MYBLE_H_
static bool deviceConnected = false;
class MyBLE
{
private:
    NimBLEServer *gpServer;
    NimBLEService *pEngineServices;
    NimBLEService *pVehicleServices;

    NimBLEService *pGenericServices;

    //
    NimBLEService *pThermometerServices;
    NimBLEService *pRadarServices;
    NimBLEService *pRFIDServices;

    NimBLEService *pOTAServices;

    // Abstaction for bring-up services & charecteristic
    void initEngineBLE();
    void initVehicleBLE();
    ///

    /* data */
public:
    MyBLE();
    void init(NimBLEServer *pBLE_SERVER);
    bool isMobileConnected();

    //
    void setEngineSpeedMeter(String number, bool isNotify = true);
    void setEngineLoad(String number, bool isNotify = true);
    void setEngineRPM(String number, bool isNotify = true);

    // TODO implementation which <T> type
    // using to testout new BLE gatt profile
    //
    // BLE_SERVICE_UUID
    // with dynamic BLE_CHARACTERISTIC_UUID
    void setGeneric(String number, char *BLE_UUID, bool isNotify = true);
    // void setGeneric(char *BLE_UUID, String number, bool isNotify = true);
    void setGeneric(char *BLE_SERVICE_UUID, char *BLE_CHARACTERISTIC_UUID, String number, bool isNotify = true);
    // TODO :> OTA
    void enableOTA();

    class MyBLEServerCallbacks : public NimBLEServerCallbacks
    {
        // TODO enable connected (1) -> gat disable advertise GATT profile packages for CPU, power mather
        void onConnect(NimBLEServer *pServer)
        {
            deviceConnected = true;
        }

        void onDisconnect(NimBLEServer *pServer, ble_gap_conn_desc *desc)
        {
            // CMT ARE COPIED FROM SNIPPET !

            // Peer disconnected, add them to the whitelist
            // This allows us to use the whitelist to filter connection attempts
            // which will minimize reconnection time.
            NimBLEDevice::whiteListAdd(NimBLEAddress(desc->peer_ota_addr));
            deviceConnected = false;
        }
        void onMTUChange(uint16_t MTU, ble_gap_conn_desc *desc)
        {
            Serial.printf("MTU updated: %u for connection ID: %u\n", MTU, desc->conn_handle);
        };
    };
};

// MyBLE myBLELib;
#endif