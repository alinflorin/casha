import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import ColorMode from "@/constants/ColorMode";
import useColorMode from "@/hooks/useColorMode";
import useDb from "@/hooks/useDb";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

export default function Theme() {
  const { t } = useTranslate();
  const { update } = useColorMode();

  const [colorMode, setColorMode] = useState<ColorMode>("auto");

  const accentColor = useThemeColor({}, "tint");
  const db = useDb();

  useEffect(() => {
    (async () => {
      const cm = await db.getSetting("colorMode");
      if (cm) {
        setColorMode(cm as ColorMode);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeColorMode = useCallback(
    async (newColorMode: ColorMode) => {
      update(newColorMode);
      await db.setSetting("colorMode", newColorMode);
      setColorMode(newColorMode);
    },
    [db, update, setColorMode]
  );

  return (
    <PageContainer
      headerOptions={{
        backButton: {
          buttonText: t("ui.settings.settings"),
          href: "/settings"
        },
        bgResource: require("../../assets/images/pages/theme.png"),
        title: t("ui.theme.theme")
      }}
    >
      <ScrollView style={styles.wrapper}>
        <Pressable style={styles.pressable}>
          <View style={styles.themeWrapper}>
            <View style={styles.themesList}>
              <TouchableOpacity
                onPress={() => changeColorMode("auto")}
                style={styles.themeRow}
              >
                <View style={styles.themeNameAndIcon}>
                  <ThemedText>{t("ui.theme.auto")}</ThemedText>
                </View>
                {colorMode === "auto" && (
                  <Ionicons
                    size={20}
                    name="checkmark-circle"
                    color={accentColor}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeColorMode("light")}
                style={styles.themeRow}
              >
                <View style={styles.themeNameAndIcon}>
                  <ThemedText>{t("ui.theme.light")}</ThemedText>
                </View>
                {colorMode === "light" && (
                  <Ionicons
                    size={20}
                    name="checkmark-circle"
                    color={accentColor}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeColorMode("dark")}
                style={styles.themeRow}
              >
                <View style={styles.themeNameAndIcon}>
                  <ThemedText>{t("ui.theme.dark")}</ThemedText>
                </View>
                {colorMode === "dark" && (
                  <Ionicons
                    size={20}
                    name="checkmark-circle"
                    color={accentColor}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.currencyWrapper}></View>
        </Pressable>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 10
  },
  themeWrapper: {
    flex: 1,
    flexDirection: "column"
  },
  themesList: {
    padding: 10
  },
  currenciesList: {
    padding: 10
  },
  currencyWrapper: {
    flex: 1,
    flexDirection: "column"
  },
  themeRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  currencyRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  themeNameAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10
  }
});
