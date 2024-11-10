import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

export interface BackButtonProps {
  buttonTextTranslateKey?: string;
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
    <TouchableOpacity onPress={navigateBack}>
      <View style={styles.navBar}>
        <Ionicons.Button
          style={styles.backButton}
          name="chevron-back"
          size={24}
          onPress={navigateBack}
          backgroundColor="transparent"
          color={linkColor}
        />
        <ThemedText style={styles.backText} type="boldLink">
          {t(props.buttonTextTranslateKey ?? "Back")}
        </ThemedText>
      </View>
    </TouchableOpacity>
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
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
});
