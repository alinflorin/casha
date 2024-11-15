import PageContainer from "@/components/PageContainer";
import useTranslate from "@/hooks/useTranslate";

export default function Settings() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/settings.png"),
        title: t("ui.settings.settings"),
        backButton: {
          href: "/",
          buttonText: t("ui.home.home")
        }
      }}
    ></PageContainer>
  );
}
