import { HelloWave } from "@/components/HelloWave";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import notificationsService from "@/services/notifications.service";
import { useCallback } from "react";
import { Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const testNotifications = useCallback(async () => {
    await notificationsService.show("test", "testttttt");
  }, []);

  return (
    <ThemedSafeAreaView style={styles.titleContainer}>
      <ThemedText type="title">Welcome home!</ThemedText>
      <Button onPress={testNotifications} title="Test Notifications" />
      <HelloWave />
      <HelloWave />
      <HelloWave />
      <HelloWave />
      <HelloWave />
    </ThemedSafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    flex: 1,
  },
});
