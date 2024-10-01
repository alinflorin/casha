import { Stack } from "expo-router";
import {useNotificationObserver} from '@/hooks/useNotificationObserver';

export default function RootLayout() {
  useNotificationObserver();

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
