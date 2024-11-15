import useTranslate from "@/hooks/useTranslate";
import PageContainer from "../PageContainer";
import { ThemedText } from "../ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView, StyleSheet, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedTextInput from "../ThemedTextInput";

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
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
          <ThemedTextInput placeholder={t("ui.addEditCar.vin")} />
        </View>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 5
  },
  obdWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    display: "flex",
    gap: 5,
    flexDirection: "column"
  }
});
