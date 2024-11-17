import PageContainer from "@/components/PageContainer";
import useTranslate from "@/hooks/useTranslate";

export default function Notifications() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/notifications.png"),
        title: t("ui.notifications.notifications"),
        backButton: {
          buttonText: t("ui.settings.settings"),
          href: "/settings"
        }
      }}
    ></PageContainer>
  );
}
