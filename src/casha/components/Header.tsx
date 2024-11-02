import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import HairLine from "./HairLine";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";

export default function Header() {
  return (
    <ThemedSafeAreaView style={styles.root}>
      <ThemedView style={styles.content}>
        <ThemedText>header</ThemedText>
      </ThemedView>
      <HairLine />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "red"
  },
  content: {
    flex: 1,
    backgroundColor: "transparent"
  }
});
