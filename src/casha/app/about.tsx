import { ThemedLink } from "@/components/ThemedLink";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function About() {
  return (
    <View>
      <ThemedText>About here</ThemedText>
      <ThemedLink push href="/">
        Home
      </ThemedLink>
    </View>
  );
}
