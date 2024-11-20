#include <OBD2.h>
#include <BLE_DESIGN.g.h>
#include <MyBLE.h>

#ifndef OBD_COMMANDER_STRUCT_H
#define OBD_COMMANDER_STRUCT_H

struct obd_commander_struct
{
    int obd_pid;
    char *BLE_CHARACTERISTIC_UUID;
    char *BLE_SERVICE_UUID;
    String data;

} OBD_COMMANDER_STRUCT;

typedef obd_commander_struct (*decodeOBDFromSlave)(String obdEncodedString);
typedef void (*decodedOBDPackage)(obd_commander_struct data, MyBLE *bleLib);

String getOBDName(int pid)
{
    return OBD2.pidName(pid);
}

String getOBDUnit(int pid)
{
    return OBD2.pidUnits(pid);
}

char *getBLECharacteristicGattUUIDFromOBD(int obd_pid)
{
    char *ble_gatt_uuid;
    switch (obd_pid)
    {
    case ENGINE_RPM:
        ble_gatt_uuid = BLE_ENGINE_RPM_CHARACTERISTIC;
        break;
    case CALCULATED_ENGINE_LOAD:
        ble_gatt_uuid = BLE_ENGINE_LOAD_CHARACTERISTIC;
        break;
    case ENGINE_COOLANT_TEMPERATURE:
        ble_gatt_uuid = BLE_ENGINE_COOLANT_TEMPERATURE_CHARACTERISTIC;
        break;
    case VEHICLE_SPEED:
        ble_gatt_uuid = BLE_VEHICLE_SPEED_CHARACTERISTIC;
        break;
    case ENGINE_OIL_TEMPERATURE:
        ble_gatt_uuid = BLE_ENGINE_OIL_TEMPERATURE_CHARACTERISTIC;
        break;
    case DISTANCE_TRAVELED_WITH_MIL_ON:
        ble_gatt_uuid = BLE_VEHICLE_DISTANCE_TRAVELED_WITH_MIL_ON_CHARACTERISTIC;
        break;
    case DISTANCE_TRAVELED_SINCE_CODES_CLEARED:
        ble_gatt_uuid = BLE_VEHICLE_DISTANCE_TRAVELED_SINCE_CODES_CLEARED_CHARACTERISTIC;
        break;
    case TIME_SINCE_TROUBLE_CODES_CLEARED:
        ble_gatt_uuid = BLE_VEHICLE_TIME_SINCE_CODES_CLEARED_CHARACTERISTIC;
        break;
    case AIR_INTAKE_TEMPERATURE:
        ble_gatt_uuid = BLE_ENGINE_AIR_INTAKE_TEMP_CHARACTERISTIC;
        break;
    default:
        break;
    }
    return ble_gatt_uuid;
};

char *getBLEServiceGattUUIDFromOBD(int obd_pid)
{
    char *ble_gatt_uuid;
    switch (obd_pid)
    {
    case ENGINE_RPM:
        ble_gatt_uuid = BLE_SERVICE_ENGINE_UUID;
        break;
    case CALCULATED_ENGINE_LOAD:
        ble_gatt_uuid = BLE_SERVICE_ENGINE_UUID;
        break;
    case ENGINE_COOLANT_TEMPERATURE:
        ble_gatt_uuid = BLE_SERVICE_ENGINE_UUID;
        break;
    case VEHICLE_SPEED:
        ble_gatt_uuid = BLE_SERVICE_VEHICLE_UUID;
        break;
    case ENGINE_OIL_TEMPERATURE:
        ble_gatt_uuid = BLE_SERVICE_ENGINE_UUID;
        break;
    case DISTANCE_TRAVELED_WITH_MIL_ON:
        ble_gatt_uuid = BLE_SERVICE_VEHICLE_UUID;
        break;
    case DISTANCE_TRAVELED_SINCE_CODES_CLEARED:
        ble_gatt_uuid = BLE_SERVICE_VEHICLE_UUID;
        break;
    case TIME_SINCE_TROUBLE_CODES_CLEARED:
        ble_gatt_uuid = BLE_SERVICE_VEHICLE_UUID;
        break;
    case AIR_INTAKE_TEMPERATURE:
        ble_gatt_uuid = BLE_SERVICE_ENGINE_UUID;
        break;
    default:
        break;
    }
    return ble_gatt_uuid;
};

obd_commander_struct decodeOBD(String obdEncodedString)
{
    obd_commander_struct data;
    // mock
    // data.obd_pid = 12;
    // data.BLE_SERVICE_UUID = BLE_SERVICE_ENGINE_UUID;
    // data.BLE_CHARACTERISTIC_UUID = BLE_ENGINE_RPM_CHARACTERISTIC;
    // data.data = "1700";
    int markIndex = obdEncodedString.indexOf(":");
    int pid = atoi(obdEncodedString.substring(0, markIndex).c_str());
    String pidData = obdEncodedString.substring(markIndex + 1, obdEncodedString.length());
    data.obd_pid = pid;
    data.BLE_CHARACTERISTIC_UUID = getBLECharacteristicGattUUIDFromOBD(pid);
    data.BLE_SERVICE_UUID = getBLEServiceGattUUIDFromOBD(pid);
    data.data = pidData;
    return data;
}
#endif