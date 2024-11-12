import PageContainer from "@/components/PageContainer";
import { ThemedMessageBar } from "@/components/ThemedMessageBar";
import { ThemedText } from "@/components/ThemedText";
import useTranslate from "@/hooks/useTranslate";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  const { t } = useTranslate();
  const [alerts, setAlerts] = useState<string[]>([]);

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../assets/images/pages/home.png"),
        title: t("ui.home.home"),
        contextMenuVisible: true
      }}
    >
      <ScrollView>
        <View style={styles.wrapper}>
          <ThemedText style={styles.subtitle} type="subtitle">
            {t("ui.home.alerts")}
          </ThemedText>
          {!alerts ||
            (alerts.length === 0 && (
              <ThemedMessageBar type="success">
                <ThemedText>{t("ui.home.noAlerts")}</ThemedText>
              </ThemedMessageBar>
            ))}
          {alerts && alerts.length > 0 && (
            <>
              {alerts.map((a, i) => (
                <ThemedMessageBar key={i + ""} type="warn">
                  <ThemedText>{a}</ThemedText>
                </ThemedMessageBar>
              ))}
            </>
          )}

          <View></View>

          <ThemedText style={styles.subtitle} type="subtitle">
            {t("ui.home.myCars")}
          </ThemedText>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 5
  },
  subtitle: {
    textDecorationLine: "underline"
  }
});
