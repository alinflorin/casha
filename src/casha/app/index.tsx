import PageContainer from "@/components/PageContainer";
import { ThemedLink } from "@/components/ThemedLink";
import { View } from "react-native";

export default function Home() {
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/home.png"),
        title: "home",
        nameTranslateKey: "Home",
        contextMenuVisible: true
      }}
    >
      <View>
        <ThemedLink push href="/about">
          About
        </ThemedLink>
      </View>
    </PageContainer>
  );
}
