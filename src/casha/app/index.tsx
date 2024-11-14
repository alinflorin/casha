import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import { ThemedMessageBar } from "@/components/ThemedMessageBar";
import { ThemedText } from "@/components/ThemedText";
import { CarEntity } from "@/entities/car.entity";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  const { t } = useTranslate();
  const [alerts, setAlerts] = useState<string[]>([]);
  const [cars, setCars] = useState<CarEntity[]>([
    {
      display_name: "MB Benz",
      make: "Mercedes",
      model: "C250",
      vin: "asdasd",
      year: 2011,
      id: 1
    },
    {
      display_name: "MB Benz",
      make: "Mercedes",
      model: "C250",
      vin: "asdasd",
      year: 2011,
      id: 1
    },
    {
      display_name: "MB Benz",
      make: "Mercedes",
      model: "C250",
      vin: "asdasd",
      year: 2011,
      id: 1
    },
    {
      display_name: "MB Benz",
      make: "Mercedes",
      model: "C250",
      vin: "asdasd",
      year: 2011,
      id: 1
    },
    {
      display_name: "MB Benz",
      make: "Mercedes",
      model: "C250",
      vin: "asdasd",
      year: 2011,
      id: 1
    }
  ]);

  const accentColor = useThemeColor({}, "tint");
  const warningColor = useThemeColor({}, "warn");
  const router = useRouter();

  const addCarClicked = useCallback(() => {
    router.navigate("/about");
  }, [router]);

  const deleteCarClicked = useCallback(
    (id: number) => {
      Alert.alert(t("ui.general.confirmation"), t("ui.general.areYouSure"), [
        {
          text: t("ui.general.cancel"),
          style: "cancel"
        },
        {
          text: t("ui.general.ok"),
          onPress: () => {
            console.warn("TO DELETE: " + id);
          }
        }
      ]);
    },
    [t]
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
                      action: () => deleteCarClicked(c.id!)
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

            <Card title={t("ui.home.addCar")} style={styles.carCard}>
              <View style={styles.addCarCardContent}>
                <Ionicons
                  name="add"
                  size={32}
                  color={accentColor}
                  underlayColor="transparent"
                  onPress={addCarClicked}
                  style={styles.addCarButton}
                />
              </View>
            </Card>
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
