import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import dbService from '@/services/db.service';
import notificationsService from '@/services/notifications.service';
import i18nService from '@/services/i18n.service';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // all loading state
  const [loaded, setLoaded] = useState(false);

  // load fonts
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // database init
  const [databaseInit, setDatabaseInit] = useState(false);
  useEffect(() => {
    (async () => {
      await dbService.init();
      setDatabaseInit(true);
    })();
  }, [setDatabaseInit]);


  // notifications init
  const [notificationsInit, setNotificationsInit] = useState(false);
  useEffect(() => {
    notificationsService.init();
    setNotificationsInit(true);
  }, [setNotificationsInit]);

  // i18n init
  const [i18nInit, setI18nInit] = useState(false);
  useEffect(() => {
    (async () => {
      await i18nService.init();
      setI18nInit(true);
    })();
  }, [setI18nInit]);

  // is everything loaded?
  useEffect(() => {
    if (fontsLoaded && databaseInit && notificationsInit && i18nInit) {
      setLoaded(true);
    }
  }, [fontsLoaded, databaseInit, notificationsInit, i18nInit, setLoaded]);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
