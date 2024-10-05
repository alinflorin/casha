import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedSafeAreaView style={styles.titleContainer}>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText type="title">Explore</ThemedText>
    </ThemedSafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    flex: 1
  }
});
