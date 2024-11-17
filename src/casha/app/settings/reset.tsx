import PageContainer from "@/components/PageContainer";
import useTranslate from "@/hooks/useTranslate";

export default function Reset() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/reset.png"),
        title: t("ui.reset.reset"),
        backButton: {
          buttonText: t("ui.settings.settings"),
          href: "/settings"
        }
      }}
    ></PageContainer>
  );
}
