import PageContainer from "@/components/PageContainer";
import { ThemedLink } from "@/components/ThemedLink";
import useTranslate from "@/hooks/useTranslate";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function Settings() {
  const { t } = useTranslate();
  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/settings.png"),
        title: t("ui.settings.settings"),
        backButton: {
          href: "/",
          buttonText: t("ui.home.home")
        }
      }}
    >
      <ScrollView style={styles.scrollView}>
        <Pressable style={styles.pressable}>
          <View style={styles.wrapper}>
            <ThemedLink
              style={styles.link}
              type="subtitle"
              href="./language-and-currency"
            >
              {t("ui.settings.languageAndCurrency")}
            </ThemedLink>
            <ThemedLink style={styles.link} type="subtitle" href="./theme">
              {t("ui.settings.theme")}
            </ThemedLink>
            <ThemedLink
              style={styles.link}
              type="subtitle"
              href="./account-and-sync"
            >
              {t("ui.settings.accountAndSync")}
            </ThemedLink>
            <ThemedLink
              style={styles.link}
              type="subtitle"
              href="./notifications"
            >
              {t("ui.settings.notifications")}
            </ThemedLink>
            <ThemedLink style={styles.link} type="subtitle" href="./reset">
              {t("ui.settings.reset")}
            </ThemedLink>
          </View>
        </Pressable>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  wrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 10,
    padding: 10
  },
  link: {
    padding: 20
  }
});
