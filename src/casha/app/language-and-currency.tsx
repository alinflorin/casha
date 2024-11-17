import PageContainer from "@/components/PageContainer";
import useTranslate from "@/hooks/useTranslate";

export default function LanguageAndCurrency() {
  const { t } = useTranslate();

  return (
    <PageContainer
      headerOptions={{
        backButton: {
          buttonText: t("ui.settings.settings"),
          href: "/settings"
        },
        bgResource: require("../assets/images/pages/language_and_currency.png"),
        title: t("ui.languageAndCurrency.languageAndCurrency")
      }}
    ></PageContainer>
  );
}
