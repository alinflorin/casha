import { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Device } from "react-native-ble-plx";

const manager = new BleManager();

export default function useBluetooth() {
  const [btState, setBtState] = useState<string | undefined>(undefined);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      setBtState(state);
    }, true);
    return () => subscription.remove();
  }, []);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === "ios") {
      return true;
    }
    if (
      Platform.OS === "android" &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]);
        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    return false;
  }, []);

  const startScan = useCallback(
    async (
      onDeviceFound?: (device: Device) => void,
      onError?: (err: BleError) => void
    ) => {
      await manager.startDeviceScan(
        null,
        {
          allowDuplicates: false
        },
        (error, device) => {
          if (error) {
            if (onError) {
              onError(error);
            }
            return;
          }

          if (device && onDeviceFound) {
            onDeviceFound(device);
          }
        }
      );
    },
    []
  );

  const stopScan = useCallback(async () => {
    await manager.stopDeviceScan();
  }, []);

  return { requestPermissions, btState, startScan, stopScan };
}
