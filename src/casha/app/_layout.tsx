import { useFonts } from "expo-font";
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
import { Stack } from "expo-router";
import ColorModeProvider from "@/providers/color-mode.provider";
import ColorMode from "@/constants/ColorMode";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // all loading state
  const [loaded, setLoaded] = useState(false);

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
  const [colorModeInit, setColorModeInit] = useState(false);
  const [preferredColorMode, setPreferredColorMode] =
    useState<ColorMode>("auto");

  const onInitDb = useCallback(async (db: SQLiteDatabase) => {
    const dbSvc = dbInternal(db);
    await dbSvc.initDb();
    setDbInit(true);

    const preferredLanguage = await dbSvc.getSetting("language");
    initI18N(preferredLanguage);
    setI18nInit(true);

    const preferredColorModeValue = await dbSvc.getSetting("colorMode");
    setPreferredColorMode((preferredColorModeValue as ColorMode) || "auto");
    setColorModeInit(true);
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
      colorModeInit
    ) {
      setLoaded(true);
    }
  }, [
    fontsLoaded,
    notificationsInit,
    i18nInit,
    dbInit,
    setLoaded,
    colorModeInit
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
      <ColorModeProvider initialValue={preferredColorMode}>
        {loaded && (
          <Stack
            screenOptions={{
              headerShown: false
            }}
          ></Stack>
        )}
      </ColorModeProvider>
    </SQLiteProvider>
  );
}
