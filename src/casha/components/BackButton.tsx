import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Href, useRouter } from "expo-router";
import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ThemedIonButton from "./ThemedIonButton";

export interface BackButtonProps {
  buttonText?: string;
  href?: Href<string | object>;
}

export default function BackButton(props: BackButtonProps) {
  const { t } = useTranslate();
  const router = useRouter();

  const linkColor = useThemeColor({}, "link");

  const navigateBack = useCallback(() => {
    if (props.href) {
      router.navigate(props.href!);
    } else {
      router.back();
    }
  }, [router, props.href]);

  return (
    <View style={styles.navBar}>
      <ThemedIonButton
        style={styles.backButton}
        name="chevron-back"
        size={24}
        onPress={navigateBack}
        backgroundColor="transparent"
        color={linkColor}
      >
        {t(props.buttonText ?? "ui.header.back")}
      </ThemedIonButton>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 0,
    margin: 0
  },
  backText: {
    padding: 0,
    margin: 0,
    fontWeight: "bold"
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
