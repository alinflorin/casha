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
import { OdbAdapterData } from "@/models/obd-adapter-data";
import base64 from "react-native-base64";

export interface BleProps {
  visible: boolean;
  onClose: (result?: any) => void;
}

export default function Ble({ visible, onClose }: BleProps) {
  const { btReady, startScan, stopScan } = useBluetooth();
  const [devices, setDevices] = useState<Device[]>([]);
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
      try {
        if (!d.isConnectable) {
          throw new Error("Device unconnectable");
        }
        if (!(await d.isConnected())) {
          await d.connect();
        }

        let serviceUuid: string | undefined;
        let readCharacteristicUuid: string | undefined;
        let writeCharacteristicUuid: string | undefined;

        await d.discoverAllServicesAndCharacteristics();
        const services = await d.services();

        for (const service of services) {
          console.log("Service " + service.uuid);
          serviceUuid = service.uuid;
          const characteristics = await service.characteristics();
          for (const chr of characteristics) {
            console.log("CHR " + chr.uuid);
            if (!writeCharacteristicUuid) {
              try {
                await chr.writeWithoutResponse(base64.encode("0100"));
                writeCharacteristicUuid = chr.uuid;
              } catch (err) {
                console.warn(err);
              }
            }

            if (!readCharacteristicUuid) {
              try {
                const reply = await chr.read();
                if (reply && reply.value) {
                  readCharacteristicUuid = chr.uuid;
                }
              } catch (err) {
                console.warn(err);
              }
            }

            if (readCharacteristicUuid && writeCharacteristicUuid) {
              break;
            }
          }
        }

        if (
          !serviceUuid ||
          !readCharacteristicUuid ||
          !writeCharacteristicUuid
        ) {
          throw new Error("No service/characteristic are usable");
        }

        onClose({
          ble: {
            deviceName: d.name,
            deviceAddress: d.id,
            serviceUuid: serviceUuid,
            readCharacteristicUuid: readCharacteristicUuid,
            writeCharacteristicUuid: writeCharacteristicUuid
          }
        } as OdbAdapterData);
      } catch (e) {
        console.error(e);
        showAlert(t("ui.general.error"), t("ui.general.anErrorHasOccurred"));
      }
    },
    [onClose, t, showAlert]
  );

  return (
    <ThemedModal
      transparent
      animationType="slide"
      onClose={onClose}
      visible={visible}
      style={styles.modal}
    >
      <ScrollView style={styles.scrollView}>
        <Pressable style={styles.pressable}>
          <ThemedText type="subtitle">{t("ui.ble.devices")}</ThemedText>
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
