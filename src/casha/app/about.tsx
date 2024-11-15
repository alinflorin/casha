import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import useTranslate from "@/hooks/useTranslate";
import { View } from "react-native";

export default function About() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/about.png"),
        title: t("ui.about.about"),
        backButton: {
          href: "/",
          buttonText: t("ui.home.home")
        }
      }}
    >
      <View>
        <ThemedText>About here</ThemedText>
      </View>
    </PageContainer>
  );
}
