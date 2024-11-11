import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import useTranslate from "@/hooks/useTranslate";
import { View } from "react-native";

export default function Home() {
  const { t } = useTranslate();

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/home.png"),
        title: t("ui.home.home"),
        contextMenuVisible: true
      }}
    >
      <View>
        <ThemedText>Home here</ThemedText>
      </View>
    </PageContainer>
  );
}
