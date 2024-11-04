import { ThemedLink } from "@/components/ThemedLink";
import { View } from "react-native";

export default function Home() {
  return (
    <View>
      <ThemedLink push href="/about">
        About
      </ThemedLink>
    </View>
  );
}
