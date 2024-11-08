import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import HairLine from "./HairLine";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";
import { ThemedText } from "./ThemedText";
import { useCallback } from "react";
import { useNavigation, usePathname } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";

export default function Header() {
  const navigation = useNavigation();
  const pathName = usePathname();

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const linkColor = useThemeColor({}, "link");

  const { t } = useTranslate();

  return (
    <ThemedView style={styles.root}>
      <ThemedSafeAreaView
        edges={["top", "left", "right"]}
        style={styles.content}
      >
        {pathName !== "/" && (
          <TouchableOpacity onPress={navigateBack}>
            <ThemedView style={styles.navBar}>
              <Ionicons.Button
                style={styles.backButton}
                name="chevron-back"
                size={24}
                backgroundColor="transparent"
                color={linkColor}
              />
              <ThemedText style={[styles.backText, { color: linkColor }]}>
                {t("Home")}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      </ThemedSafeAreaView>
      <HairLine />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: "transparent"
  },
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
