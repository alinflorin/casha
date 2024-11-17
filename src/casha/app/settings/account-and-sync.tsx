import PageContainer from "@/components/PageContainer";
import useTranslate from "@/hooks/useTranslate";

export default function AccountAndSync() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/account_and_sync.png"),
        title: t("ui.accountAndSync.accountAndSync"),
        backButton: {
          buttonText: t("ui.settings.settings"),
          href: "/settings"
        }
      }}
    ></PageContainer>
  );
}
