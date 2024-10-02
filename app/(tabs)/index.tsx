import { HelloWave } from "@/components/HelloWave";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView style={styles.titleContainer}>
      <ThemedText type="title">Welcome home!</ThemedText>
      <HelloWave /><HelloWave /><HelloWave /><HelloWave /><HelloWave />
    </ThemedSafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    flex: 1,
  },
});
