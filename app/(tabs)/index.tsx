import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
      <ThemedView>
        <ThemedText type="title">Welcome home!</ThemedText>
        <HelloWave />
      </ThemedView>
  );
}
