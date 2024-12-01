import { useCallback, useMemo, useState } from "react";
import ThemedModal from "../ThemedModal";
import { ThemedText } from "../ThemedText";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import useTranslate from "@/hooks/useTranslate";
import ThemedActivityIndicator from "../ThemedActivityIndicator";
import ThemedTextInput from "../ThemedTextInput";
import ThemedButton from "../ThemedButton";
import { ScanDialogData } from "@/models/scan-dialog-data";
import useDialogs from "@/hooks/useDialogs";

export interface WiFiProps {
  visible: boolean;
  onClose: (result?: any) => void;
}

export default function WiFi({ visible, onClose }: WiFiProps) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const [address, setAddress] = useState("192.168.0.2");
  const [port, setPort] = useState(35000);
  const { showAlert } = useDialogs();

  const isFormValid = useMemo(() => {
    return address && address.length > 0 && port && port > 0;
  }, [address, port]);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      onClose({
        obd_adapter_data: {
          wifi: {
            ip: address,
            port: port
          }
        },
        km: 100,
        vin: "asd"
      } as ScanDialogData);
    } catch (err) {
      console.error(err);
      showAlert(t("ui.general.error"), t("ui.general.anErrorHasOccurred"));
    }
    setLoading(false);
  }, [address, onClose, port, setLoading, showAlert, t]);

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
            <ThemedText type="subtitle">{t("ui.wifi.connect")}</ThemedText>
            {loading && <ThemedActivityIndicator />}
          </View>
          <ThemedTextInput
            value={address}
            onChangeText={(v) => setAddress(v)}
            placeholder={t("ui.wifi.address") + "*"}
          />
          <ThemedTextInput
            value={port + ""}
            onChangeText={(v) => setPort(+v)}
            keyboardType="numeric"
            placeholder={t("ui.wifi.port") + "*"}
          />
          <ThemedButton
            disabled={!isFormValid}
            onPress={connect}
            title={t("ui.wifi.connect")}
          />
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
  }
});