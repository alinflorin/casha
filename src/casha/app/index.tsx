import PageContainer from "@/components/PageContainer";
import { ThemedLink } from "@/components/ThemedLink";
import { View } from "react-native";

export default function Home() {
  return (
    <PageContainer>
      <View>
        <ThemedLink push href="/about">
          About
        </ThemedLink>
      </View>
    </PageContainer>
  );
}
