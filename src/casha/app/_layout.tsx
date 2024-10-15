import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
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
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      )}
    </SQLiteProvider>
  );
}
