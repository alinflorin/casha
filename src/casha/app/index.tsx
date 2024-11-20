import Card from "@/components/Card";
import PageContainer from "@/components/PageContainer";
import { ThemedMessageBar } from "@/components/ThemedMessageBar";
import { ThemedText } from "@/components/ThemedText";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import useDialogs from "@/hooks/useDialogs";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { t } = useTranslate();
  const [alerts, setAlerts] = useState<string[]>([]);
  const [cars, setCars] = useState<CarEntity[]>([]);

  const accentColor = useThemeColor({}, "tint");
  const warningColor = useThemeColor({}, "warn");
  const router = useRouter();

  const db = useDb();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const allCars = await db.getAllCars();
        setCars(allCars);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const addCarClicked = useCallback(() => {
    router.navigate("/car/add");
  }, [router]);

  const { showConfirmation } = useDialogs();

  const deleteCarClicked = useCallback(
    (id: number, index: number) => {
      showConfirmation(() => {
        (async () => {
          await db.deleteCar(id);
          const carsCopy = [...cars];
          carsCopy.splice(index, 1);
          setCars(carsCopy);
        })();
      });
    },
    [cars, setCars, db, showConfirmation]
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
                <TouchableOpacity
                  style={styles.carCard}
                  key={i + ""}
                  onPress={() =>
                    router.navigate({
                      pathname: "/car/[id]",
                      params: {
                        id: c.id!
                      }
                    })
                  }
                >
                  <Card
                    icon="warning"
                    iconColor={warningColor}
                    title={c.display_name}
                    contextMenu={[
                      {
                        title: t("ui.home.view"),
                        action: () =>
                          router.navigate({
                            pathname: "/car/[id]",
                            params: {
                              id: c.id!
                            }
                          })
                      },
                      {
                        title: t("ui.home.edit"),
                        action: () =>
                          router.navigate({
                            pathname: "/car/edit/[id]",
                            params: {
                              id: c.id!
                            }
                          })
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
                </TouchableOpacity>
              ))}

            <TouchableOpacity onPress={addCarClicked} style={styles.carCard}>
              <Card title={t("ui.home.addCar")}>
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
    margin: 2,
    minHeight: 110
  },
  addCarCardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  addCarButton: {
    width: "100%",
    textAlign: "center"
  }
});
