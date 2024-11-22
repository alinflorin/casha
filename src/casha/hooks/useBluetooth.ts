import { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Device,
  Subscription
} from "react-native-ble-plx";

export default function useBluetooth() {
  const [manager, setManager] = useState<BleManager | undefined>();
  const [btReady, setBtReady] = useState(false);

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

  useEffect(() => {
    let subscription: Subscription | undefined;
    let localManager: BleManager | undefined;
    (async () => {
      if (await requestPermissions()) {
        localManager = new BleManager();
        setManager(localManager);
        subscription = localManager.onStateChange((state) => {
          setBtReady(state === "PoweredOn");
        }, true);
      }
    })();
    return () => {
      setManager(undefined);
      if (subscription) {
        subscription.remove();
      }
      if (localManager) {
        localManager.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScan = useCallback(
    async (
      onDeviceFound?: (device: Device) => void,
      onError?: (err: BleError) => void
    ) => {
      if (!manager) {
        throw new Error("BLE Manager not initialized");
      }
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
    [manager]
  );

  const stopScan = useCallback(async () => {
    if (!manager) {
      throw new Error("BLE Manager not initialized");
    }
    await manager.stopDeviceScan();
  }, [manager]);

  return { btReady, startScan, stopScan };
}
