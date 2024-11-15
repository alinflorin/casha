import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import { ThemedMessageBar } from "@/components/ThemedMessageBar";
import { ThemedText } from "@/components/ThemedText";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

export default function Home() {
  const { t } = useTranslate();
  const [alerts, setAlerts] = useState<string[]>([]);
  const [cars, setCars] = useState<CarEntity[]>([]);

  const accentColor = useThemeColor({}, "tint");
  const warningColor = useThemeColor({}, "warn");
  const router = useRouter();

  const db = useDb();

  useEffect(() => {
    (async () => {
      const allCars = await db.getAllCars();
      setCars([
        {
          display_name: "asdasda",
          make: "asda",
          model: "asda",
          vin: "asdasd",
          year: 2011
        }
      ]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCarClicked = useCallback(() => {
    router.navigate("/car/add");
  }, [router]);

  const deleteCarClicked = useCallback(
    (id: number, index: number) => {
      Alert.alert(t("ui.general.confirmation"), t("ui.general.areYouSure"), [
        {
          text: t("ui.general.cancel"),
          style: "cancel"
        },
        {
          text: t("ui.general.ok"),
          onPress: () => {
            (async () => {
              await db.deleteCar(id);
              const carsCopy = [...cars];
              carsCopy.splice(index, 1);
              setCars(carsCopy);
            })();
          }
        }
      ]);
    },
    [t, cars, setCars, db]
  );

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/home.png"),
        title: t("ui.home.home"),
        contextMenuVisible: true
      }}
    >
      <ScrollView>
        <View style={styles.wrapper}>
          <ThemedText style={styles.subtitle} type="subtitle">
            {t("ui.home.alerts")}
          </ThemedText>
          {!alerts ||
            (alerts.length === 0 && (
              <ThemedMessageBar type="success">
                <ThemedText>{t("ui.home.noAlerts")}</ThemedText>
              </ThemedMessageBar>
            ))}
          {alerts && alerts.length > 0 && (
            <>
              {alerts.map((a, i) => (
                <ThemedMessageBar key={i + ""} type="warn">
                  <ThemedText>{a}</ThemedText>
                </ThemedMessageBar>
              ))}
            </>
          )}

          <View style={styles.spacer}></View>

          <ThemedText style={styles.subtitle} type="subtitle">
            {t("ui.home.myCars")}
          </ThemedText>
          <View style={styles.carsWrapper}>
            {cars &&
              cars.map((c, i) => (
                <Card
                  key={i + ""}
                  style={styles.carCard}
                  icon="warning"
                  iconColor={warningColor}
                  title={c.display_name}
                  contextMenu={[
                    {
                      title: t("ui.home.view"),
                      action: () => router.navigate("/about")
                    },
                    {
                      title: t("ui.home.edit"),
                      action: () => router.navigate("/about")
                    },
                    {
                      title: t("ui.home.delete"),
                      destructive: true,
                      action: () => deleteCarClicked(c.id!, i)
                    }
                  ]}
                >
                  {c.km && (
                    <ThemedText>
                      {c.km} {c.uses_imperial ? "mi." : "km."}
                    </ThemedText>
                  )}
                  <ThemedText>{c.year}</ThemedText>
                </Card>
              ))}

            <TouchableOpacity onPress={addCarClicked} style={styles.carCard}>
              <Card onPress={addCarClicked} title={t("ui.home.addCar")}>
                <View style={styles.addCarCardContent}>
                  <Ionicons
                    name="add"
                    size={32}
                    color={accentColor}
                    underlayColor="transparent"
                    style={styles.addCarButton}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 5
  },
  subtitle: {
    textDecorationLine: "underline"
  },
  spacer: {
    width: "100%",
    height: 5,
    backgroundColor: "transparent"
  },
  carsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  carCard: {
    flexBasis: "48%",
    maxWidth: "48%",
    margin: 2
  },
  addCarCardContent: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center"
  },
  addCarButton: {
    width: "100%",
    textAlign: "center"
  }
});
