import useTranslate from "@/hooks/useTranslate";
import PageContainer from "../PageContainer";
import { ThemedText } from "../ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedTextInput from "../ThemedTextInput";
import ThemedSwitch from "../ThemedSwitch";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import ThemedPicker from "../ThemedPicker";
import ThemedPickerItem from "../ThemedPickerItem";

export default function AddEditCar() {
  const db = useDb();
  const { t } = useTranslate();
  const searchParams = useLocalSearchParams();
  const [car, setCar] = useState<CarEntity>({
    display_name: "",
    make: "",
    model: "",
    vin: "",
    year: new Date().getFullYear()
  });

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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Pressable style={styles.pressable}>
          <ThemedText type="subtitle">{t("ui.addEditCar.obd")}</ThemedText>
          <View style={styles.obdWrapper}>
            <ThemedText>
              {t("ui.addEditCar.device")}: {t("ui.addEditCar.none")}
            </ThemedText>
            <ThemedButton title={t("ui.addEditCar.scan")} />
          </View>
          <ThemedText type="subtitle">{t("ui.addEditCar.data")}</ThemedText>
          <View style={styles.form}>
            <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
            <ThemedTextInput
              keyboardType="numeric"
              placeholder={t("ui.addEditCar.odometer")}
            />
            <View style={styles.useImperialWrapper}>
              <ThemedText>{t("ui.addEditCar.useImperial")}</ThemedText>
              <ThemedSwitch
                onChange={(e) =>
                  setCar({ ...car, uses_imperial: e.nativeEvent.value ? 1 : 0 })
                }
                value={
                  car.uses_imperial && car.uses_imperial === 1 ? true : false
                }
              />
            </View>
            <ThemedText>{t("ui.addEditCar.make")}</ThemedText>
            <ThemedPicker mode="dropdown">
              <ThemedPickerItem value={"asd"} label="asdasda" />
              <ThemedPickerItem value={"aasdsd"} label="asdasasdda" />
              <ThemedPickerItem value={"as3d"} label="as3dasda" />
            </ThemedPicker>
            <ThemedText>{t("ui.addEditCar.model")}</ThemedText>
            <ThemedPicker mode="dropdown">
              <ThemedPickerItem value={"asd"} label="asdasda" />
              <ThemedPickerItem value={"aasdsd"} label="asdasasdda" />
              <ThemedPickerItem value={"as3d"} label="as3dasda" />
            </ThemedPicker>
            <ThemedTextInput
              keyboardType="numeric"
              placeholder={t("ui.addEditCar.year")}
            />
            <ThemedTextInput placeholder={t("ui.addEditCar.displayName")} />
            <ThemedButton title={t("ui.addEditCar.save")} />
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  pressable: {
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
  }
});
