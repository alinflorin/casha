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
import { StyleSheet, useColorScheme, View } from "react-native";
import Header from "@/components/Header";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAssetsPreload from "@/hooks/useAssetsPreload";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // all loading state
  const [loaded, setLoaded] = useState(false);

  // preload assets
  const [assetsLoaded] = useAssetsPreload([
    require("../assets/images/icon.png"),
    require("../assets/images/pages/home.png"),
    require("../assets/images/pages/about.png"),
    require("../assets/images/pages/unknown.png"),

    require("../assets/fonts/OpenSans-Light.ttf"),
    require("../assets/fonts/OpenSans-Regular.ttf"),
    require("../assets/fonts/OpenSans-SemiBold.ttf"),
    require("../assets/fonts/OpenSans-Bold.ttf")
  ]);

  // load fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf")
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
    if (
      fontsLoaded &&
      notificationsInit &&
      i18nInit &&
      dbInit &&
      assetsLoaded
    ) {
      setLoaded(true);
    }
  }, [
    fontsLoaded,
    notificationsInit,
    i18nInit,
    dbInit,
    assetsLoaded,
    setLoaded
  ]);

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
              <View style={styles.header}>
                <Header />
              </View>
              <View style={styles.slot}>
                <SafeAreaView
                  edges={["bottom", "left", "right"]}
                  style={styles.contentSafeArea}
                >
                  <Slot />
                </SafeAreaView>
              </View>
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
    flex: 4,
    padding: 10
  }
});
