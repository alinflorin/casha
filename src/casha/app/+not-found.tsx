import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import useTranslate from "@/hooks/useTranslate";
import { View } from "react-native";

export default function About() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/unknown.png"),
        title: t("ui.notFound.notFound"),
        canGoBack: true,
        backButtonOptions: {
          href: "/",
          buttonText: t("ui.home.home")
        }
      }}
    >
      <View>
        <ThemedText>{t("ui.notFound.pageDoesntExist")}</ThemedText>
      </View>
    </PageContainer>
  );
}
