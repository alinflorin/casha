import useTranslate from "@/hooks/useTranslate";
import PageContainer from "../PageContainer";
import { ThemedText } from "../ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import { StyleSheet, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedTextInput from "../ThemedTextInput";
import ThemedSwitch from "../ThemedSwitch";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { decodeVIN, validateVIN, splitVIN } from "universal-vin-decoder";
import useDialogs from "@/hooks/useDialogs";
import Ble from "../modals/Ble";
import { OdbAdapterData } from "@/models/obd-adapter-data";
import { ScanDialogData } from "@/models/scan-dialog-data";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import WiFi from "../modals/WiFi";

export default function AddEditCar() {
  const db = useDb();
  const { t } = useTranslate();
  const searchParams = useLocalSearchParams();
  const router = useRouter();

  const [car, setCar] = useState<CarEntity>({
    display_name: "",
    make: "",
    model: "",
    vin: "",
    year: new Date().getFullYear(),
    uses_imperial: false
  });

  const [bleVisible, setBleVisible] = useState(false);
  const [wifiVisible, setWifiVisible] = useState(false);
  const [obdAdapterData, setObdAdapterData] = useState<
    OdbAdapterData | undefined
  >();

  const editedCarId = useMemo(() => {
    if (!searchParams || !searchParams.id) {
      return undefined;
    }
    return +searchParams.id;
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (!editedCarId) {
        return;
      }
      const editedCar = await db.getCar(editedCarId);
      if (!editedCar) {
        throw new Error("Car doesn't exist.");
      }
      setCar(editedCar);
      if (editedCar.obd_adapter_data) {
        setObdAdapterData(JSON.parse(editedCar.obd_adapter_data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateDetailsFromVin = useCallback((car: CarEntity) => {
    const carCopy = { ...car };
    const decoded = decodeVIN(carCopy.vin);
    if (decoded.isValid) {
      const split = splitVIN(carCopy.vin);
      carCopy.make = decoded.info?.manufacturer || "";
      carCopy.model = split.vds;
      carCopy.year = decoded.info?.modelYear
        ? +decoded.info?.modelYear
        : new Date().getFullYear();
    }
    return carCopy;
  }, []);

  const isFormValid = useMemo(() => {
    return (
      car.display_name &&
      car.make &&
      car.model &&
      car.uses_imperial != null &&
      car.vin &&
      validateVIN(car.vin).isValid &&
      car.year &&
      car.display_name.length > 0 &&
      car.make.length > 0 &&
      car.model.length > 0 &&
      car.vin.length > 0 &&
      car.year > 0
    );
  }, [car]);

  const vinChanged = useCallback(
    (newVin: string) => {
      setCar((car) => {
        let carCopy: CarEntity = { ...car };
        carCopy.vin = newVin;
        carCopy = populateDetailsFromVin(carCopy);
        return carCopy;
      });
    },
    [populateDetailsFromVin, setCar]
  );

  const { showAlert } = useDialogs();

  const save = useCallback(async () => {
    try {
      if (editedCarId) {
        await db.editCar(editedCarId, car);
      } else {
        await db.addCar(car);
      }
      router.navigate("/");
    } catch (err: any) {
      console.error(err);
      showAlert(t("ui.general.error"), t("ui.general.anErrorHasOccurred"));
    }
  }, [db, car, editedCarId, t, router, showAlert]);

  const wifiDialogClosed = useCallback(
    (d: ScanDialogData | undefined) => {
      if (d) {
        setObdAdapterData(d.obd_adapter_data);
        setCar((c) => {
          let carCopy = { ...c };
          carCopy.vin = d.vin;
          carCopy.km = d.km;
          carCopy.obd_adapter_data = JSON.stringify(d.obd_adapter_data);
          carCopy = populateDetailsFromVin(carCopy);
          return carCopy;
        });
      }
      setWifiVisible(false);
    },
    [setWifiVisible, setObdAdapterData, setCar, populateDetailsFromVin]
  );

  const bleDialogClosed = useCallback(
    (d: ScanDialogData | undefined) => {
      if (d) {
        setObdAdapterData(d.obd_adapter_data);
        setCar((c) => {
          let carCopy = { ...c };
          carCopy.vin = d.vin;
          carCopy.km = d.km;
          carCopy.obd_adapter_data = JSON.stringify(d.obd_adapter_data);
          carCopy = populateDetailsFromVin(carCopy);
          return carCopy;
        });
      }
      setBleVisible(false);
    },
    [setBleVisible, setObdAdapterData, setCar, populateDetailsFromVin]
  );

  const errorColor = useThemeColor({}, "error");

  const removeDevice = useCallback(() => {
    setObdAdapterData(undefined);
    setCar((c) => ({ ...c, obd_adapter_data: undefined }));
  }, [setObdAdapterData, setCar]);

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/add_edit_car.png"),
        title: t(
          editedCarId ? "ui.addEditCar.editCar" : "ui.addEditCar.addCar"
        ),
        backButton: {
          buttonText: t("ui.home.home"),
          href: "/"
        }
      }}
    >
      <KeyboardAwareScrollView style={styles.wrapper}>
        <ThemedText type="subtitle">
          {t("ui.addEditCar.obd")} ({t("ui.addEditCar.ble")})
        </ThemedText>
        <View style={styles.obdWrapper}>
          <ThemedText>
            {t("ui.addEditCar.device")}:{" "}
            {obdAdapterData?.ble
              ? obdAdapterData.ble.deviceName
              : t("ui.addEditCar.none")}
          </ThemedText>
          <View style={styles.row}>
            {obdAdapterData && obdAdapterData.ble && (
              <Ionicons.Button
                name="trash-bin"
                backgroundColor="transparent"
                onPress={removeDevice}
                color={errorColor}
              />
            )}
            <ThemedButton
              onPress={() => setBleVisible(true)}
              title={t("ui.addEditCar.scan")}
            />
          </View>
          {bleVisible && <Ble onClose={bleDialogClosed} visible={bleVisible} />}
        </View>
        <ThemedText type="subtitle">
          {t("ui.addEditCar.obd")} ({t("ui.addEditCar.wifi")})
        </ThemedText>
        <View style={styles.obdWrapper}>
          <ThemedText>
            {t("ui.addEditCar.device")}:{" "}
            {obdAdapterData?.wifi
              ? obdAdapterData.wifi.ip
              : t("ui.addEditCar.none")}
          </ThemedText>
          <View style={styles.row}>
            {obdAdapterData && obdAdapterData.wifi && (
              <Ionicons.Button
                name="trash-bin"
                backgroundColor="transparent"
                onPress={removeDevice}
                color={errorColor}
              />
            )}
            <ThemedButton
              onPress={() => setWifiVisible(true)}
              title={t("ui.addEditCar.connect")}
            />
          </View>
          {wifiVisible && (
            <WiFi onClose={wifiDialogClosed} visible={wifiVisible} />
          )}
        </View>
        <ThemedText type="subtitle">{t("ui.addEditCar.data")}</ThemedText>
        <View style={styles.form}>
          <ThemedTextInput
            value={car.vin}
            onChangeText={vinChanged}
            placeholder={t("ui.addEditCar.vin") + "*"}
          />
          <ThemedTextInput
            keyboardType="numeric"
            value={car.km ? car.km.toString() : undefined}
            onChangeText={(v) =>
              setCar((c) => ({ ...c, km: v ? +v : undefined }))
            }
            placeholder={t("ui.addEditCar.odometer")}
          />
          <View style={styles.useImperialWrapper}>
            <ThemedText>{t("ui.addEditCar.useImperial")}</ThemedText>
            <ThemedSwitch
              onValueChange={(v) => setCar((c) => ({ ...c, uses_imperial: v }))}
              value={car.uses_imperial}
            />
          </View>
          <ThemedTextInput
            value={car.make}
            onChangeText={(v) => setCar((c) => ({ ...c, make: v }))}
            placeholder={t("ui.addEditCar.make") + "*"}
          />
          <ThemedTextInput
            value={car.model}
            onChangeText={(v) => setCar((c) => ({ ...c, model: v }))}
            placeholder={t("ui.addEditCar.model") + "*"}
          />
          <ThemedTextInput
            value={car.year + ""}
            onChangeText={(v) => setCar((c) => ({ ...c, year: v ? +v : 0 }))}
            keyboardType="numeric"
            placeholder={t("ui.addEditCar.year") + "*"}
          />
          <ThemedTextInput
            value={car.display_name}
            onChangeText={(v) => setCar((c) => ({ ...c, display_name: v }))}
            placeholder={t("ui.addEditCar.displayName") + "*"}
          />
          <ThemedButton
            disabled={!isFormValid}
            onPress={save}
            title={t("ui.addEditCar.save")}
          />
        </View>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 10
  },
  obdWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    display: "flex",
    gap: 10,
    flexDirection: "column"
  },
  useImperialWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
