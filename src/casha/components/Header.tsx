import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import HairLine from "./HairLine";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";

export default function Header() {
  return (
    <ThemedView style={styles.root}>
      <ThemedSafeAreaView edges={['top', 'left', 'right']} style={styles.content}>
        <ThemedText>header</ThemedText>
      </ThemedSafeAreaView>
      <HairLine />
    </ThemedView>
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
