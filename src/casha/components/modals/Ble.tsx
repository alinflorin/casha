import { useCallback, useEffect, useState } from "react";
import ThemedModal from "../ThemedModal";
import { ThemedText } from "../ThemedText";
import useBluetooth from "@/hooks/useBluetooth";
import { Device } from "react-native-ble-plx";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import useTranslate from "@/hooks/useTranslate";
import useDialogs from "@/hooks/useDialogs";
import { OdbBleCharacteristicData } from "@/models/obd-adapter-data";
import { ScanDialogData } from "@/models/scan-dialog-data";
import ThemedActivityIndicator from "../ThemedActivityIndicator";

export interface BleProps {
  visible: boolean;
  onClose: (result?: any) => void;
}

export default function Ble({ visible, onClose }: BleProps) {
  const { btReady, startScan, stopScan, writeAndRead } = useBluetooth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const { showAlert } = useDialogs();

  const onDeviceFound = useCallback((device: Device) => {
    if (device.name == null) {
      return;
    }
    setDevices((previousDevices) => {
      if (previousDevices.findIndex((d) => d.id === device.id) > -1) {
        return previousDevices;
      }
      return [...previousDevices, device];
    });
  }, []);

  useEffect(() => {
    if (!btReady) {
      return;
    }
    (async () => {
      await startScan(onDeviceFound);
    })();
    return () => {
      (async () => {
        await stopScan();
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btReady]);

  const selectDevice = useCallback(
    async (d: Device) => {
      setLoading(true);
      try {
        if (!d.isConnectable) {
          throw new Error("Device unconnectable");
        }
        await d.connect();

        let serviceUuid: string | undefined;
        let readCharacteristicData: OdbBleCharacteristicData | undefined;
        let writeCharacteristicData: OdbBleCharacteristicData | undefined;

        await d.discoverAllServicesAndCharacteristics();
        const services = await d.services();

        for (const service of services) {
          serviceUuid = service.uuid;
          const characteristics = await service.characteristics();
          const readCharacteristic = characteristics.find(
            (c) => c.isReadable || c.isNotifying || c.isIndicatable
          );
          const writeCharacteristic = characteristics.find(
            (c) => c.isWritableWithResponse || c.isWritableWithoutResponse
          );

          if (readCharacteristic && writeCharacteristic) {
            readCharacteristicData = {
              uuid: readCharacteristic.uuid,
              isIndicatable: readCharacteristic.isIndicatable,
              isNotifiable: readCharacteristic.isNotifiable,
              isReadable: readCharacteristic.isReadable,
              isWritableWithoutResponse: false,
              isWritableWithResponse: false
            };
            writeCharacteristicData = {
              uuid: writeCharacteristic.uuid,
              isIndicatable: false,
              isNotifiable: false,
              isReadable: false,
              isWritableWithoutResponse:
                writeCharacteristic.isWritableWithoutResponse,
              isWritableWithResponse: writeCharacteristic.isWritableWithResponse
            };
            break;
          }
        }

        if (
          !serviceUuid ||
          !readCharacteristicData ||
          !writeCharacteristicData
        ) {
          throw new Error("No service/characteristic are usable");
        }

        const vinReply = await writeAndRead(
          d.id,
          serviceUuid,
          readCharacteristicData.uuid,
          writeCharacteristicData.uuid,
          "0902"
        );

        console.log(vinReply);

        try {
          await d.cancelConnection();
        } catch (err) {
          console.warn(err);
        }

        onClose({
          obd_adapter_data: {
            ble: {
              deviceName: d.name,
              deviceAddress: d.id,
              serviceUuid: serviceUuid,
              readCharacteristic: readCharacteristicData,
              writeCharacteristic: writeCharacteristicData
            }
          },
          km: 100,
          vin: "WDD23422AAAAAA023"
        } as ScanDialogData);
      } catch (e) {
        try {
          await d.cancelConnection();
        } catch (err) {
          console.warn(err);
        }
        console.error(e);
        showAlert(t("ui.general.error"), t("ui.general.anErrorHasOccurred"));
      }
      setLoading(false);
    },
    [onClose, t, showAlert, setLoading, writeAndRead]
  );

  return (
    <ThemedModal
      transparent
      animationType="slide"
      onClose={onClose}
      visible={visible}
      closeDisabled={loading}
      style={styles.modal}
    >
      <ScrollView style={styles.scrollView}>
        <Pressable style={styles.pressable}>
          <View style={styles.row}>
            <ThemedText type="subtitle">{t("ui.ble.devices")}</ThemedText>
            {loading && <ThemedActivityIndicator />}
          </View>
          <View style={styles.devicesList}>
            {devices.map((d) => (
              <TouchableOpacity onPress={() => selectDevice(d)} key={d.id}>
                <ThemedText>{d.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "60%",
    maxHeight: "60%",
    width: "90%"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  scrollView: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  pressable: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  devicesList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5
  },
  device: {
    padding: 5
  }
});
