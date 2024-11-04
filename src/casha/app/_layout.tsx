import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import Constants from "expo-constants";
import { dbInternal } from "@/hooks/useDb";
import { initI18N } from "@/hooks/useTranslate";
import {
  askNotificationsPermission,
  initNotifications
} from "@/hooks/useNotifications";
import { StyleSheet, useColorScheme } from "react-native";
import Header from "@/components/Header";
import { ThemedView } from "@/components/ThemedView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index"
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // all loading state
  const [loaded, setLoaded] = useState(false);

  // load fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });

  // DB and i18n
  const [dbInit, setDbInit] = useState(false);
  const [i18nInit, setI18nInit] = useState(false);

  const onInitDb = useCallback(async (db: SQLiteDatabase) => {
    const dbSvc = dbInternal(db);
    await dbSvc.initDb();
    setDbInit(true);

    const preferredLanguage = await dbSvc.getSetting("language");
    initI18N(preferredLanguage);
    setI18nInit(true);
  }, []);

  // notifications init
  const [notificationsInit, setNotificationsInit] = useState(false);
  useEffect(() => {
    initNotifications();
    setNotificationsInit(true);
  }, [setNotificationsInit]);

  // is everything loaded?
  useEffect(() => {
    if (fontsLoaded && notificationsInit && i18nInit && dbInit) {
      setLoaded(true);
    }
  }, [fontsLoaded, notificationsInit, i18nInit, dbInit, setLoaded]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      askNotificationsPermission().then();
    }
  }, [loaded]);

  return (
    <SQLiteProvider
      databaseName={Constants.expoConfig!.extra!.databaseName}
      onInit={onInitDb}
    >
      {loaded && (
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <ThemedView style={styles.container}>
              <ThemedView style={styles.header}>
                <Header />
              </ThemedView>
              <ThemedView style={styles.slot}>
                <ThemedSafeAreaView
                  edges={["bottom", "left", "right"]}
                  style={styles.contentSafeArea}
                >
                  <Slot />
                </ThemedSafeAreaView>
              </ThemedView>
            </ThemedView>
          </SafeAreaProvider>
        </ThemeProvider>
      )}
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentSafeArea: {
    flex: 1
  },
  header: {
    flex: 1
  },
  slot: {
    flex: 5,
    padding: 10
  }
});
