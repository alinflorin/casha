import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import useColorMode from "@/hooks/useColorMode";
import useDb from "@/hooks/useDb";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate, { initI18N } from "@/hooks/useTranslate";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function Reset() {
  const { t } = useTranslate();
  const errorColor = useThemeColor({}, "error");

  const db = useDb();
  const router = useRouter();
  const { update: updateColorMode } = useColorMode();

  const reset = useCallback(() => {
    Alert.alert(t("ui.general.confirmation"), t("ui.general.areYouSure"), [
      {
        text: t("ui.general.cancel"),
        style: "cancel"
      },
      {
        text: t("ui.general.ok"),
        onPress: () => {
          (async () => {
            await db.reset();
            await initI18N();
            updateColorMode("auto");
            router.navigate("/");
          })();
        }
      }
    ]);
  }, [db, router, t, updateColorMode]);

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
    >
      <ThemedText>{t("ui.reset.warningThisWillClearAllData")}</ThemedText>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={reset}
          title={t("ui.reset.reset")}
          color={errorColor}
        />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center"
  }
});
