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
        await d.connect();
        await d.discoverAllServicesAndCharacteristics();
        const services = await d.services();
        for (let s of services) {
          console.log(s.id);
          const chars = await s.characteristics();
          console.log(chars.map((c) => c.value));
        }
        onClose(d);
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
