import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import HairLine from "./HairLine";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";
import { ThemedText } from "./ThemedText";
import { useCallback, useMemo } from "react";
import { useNavigation, usePathname } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import ContextMenu from "react-native-context-menu-view";

export default function Header() {
  const navigation = useNavigation();
  const pathName = usePathname();
  const { t } = useTranslate();

  const pageTitle = useMemo(() => {
    if (pathName === "/") {
      return t("Home");
    }
    return t(pathName[1].toUpperCase() + pathName.substring(2));
  }, [pathName, t]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const linkColor = useThemeColor({}, "link");
  const accentColor = useThemeColor({}, "tint");

  return (
    <ThemedView style={styles.root}>
      <ThemedSafeAreaView
        edges={["top", "left", "right"]}
        style={styles.content}
      >
        <ThemedView style={styles.logoContainer}>
          <Image
            source={{
              uri: Image.resolveAssetSource(
                require("../assets/images/icon.png")
              ).uri
            }}
            width={44}
            height={44}
            style={styles.logo}
          />
          <ThemedView style={{ flex: 1 }} />
          {pathName === "/" && (
            <ContextMenu
              actions={[{ title: "Title 1" }, { title: "Title 2" }]}
              dropdownMenuMode
              onPress={(e) => {
                console.warn(
                  `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
                );
              }}
            >
              <Ionicons.Button
                name="ellipsis-vertical"
                size={24}
                backgroundColor="transparent"
                color={accentColor}
              />
            </ContextMenu>
          )}
        </ThemedView>
        {pathName !== "/" && (
          <TouchableOpacity onPress={navigateBack}>
            <ThemedView style={styles.navBar}>
              <Ionicons.Button
                style={styles.backButton}
                name="chevron-back"
                size={24}
                onPress={navigateBack}
                backgroundColor="transparent"
                color={linkColor}
              />
              <ThemedText style={styles.backText} type="boldLink">
                {t("Back")}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
        <ThemedView style={styles.titleSpacer}></ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">{pageTitle}</ThemedText>
        </ThemedView>
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
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column"
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    marginLeft: 10
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
  },
  titleSpacer: {
    flex: 1
  },
  titleContainer: {
    padding: 10
  }
});
