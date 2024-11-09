import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HairLine from "./HairLine";
import { ThemedText } from "./ThemedText";
import { useCallback } from "react";
import { useNavigation, usePathname } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import ContextMenu from "react-native-context-menu-view";
import { SafeAreaView } from "react-native-safe-area-context";
import usePageInfo from "@/hooks/usePageInfo";
import { useAssets } from "expo-asset";

export default function Header() {
  const navigation = useNavigation();
  const pathName = usePathname();
  const { t } = useTranslate();

  const { pageInfo, bgAssetUri } = usePageInfo(pathName);
  const [logoAssets] = useAssets([require("../assets/images/icon.png")]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const linkColor = useThemeColor({}, "link");
  const accentColor = useThemeColor({}, "tint");

  return (
    <>
      <ImageBackground
        style={styles.root}
        source={{
          uri: bgAssetUri
        }}
        resizeMethod="auto"
        resizeMode="cover"
        blurRadius={0}
        imageStyle={{
          opacity: 0.2
        }}
      >
        <SafeAreaView edges={["top", "left", "right"]} style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: logoAssets ? logoAssets[0].localUri! : undefined
              }}
              width={44}
              height={44}
              style={styles.logo}
            />
            <View style={{ flex: 1 }} />
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
          </View>
          {pathName !== "/" && (
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
                  {t("Back")}
                </ThemedText>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.titleSpacer}></View>
          <View style={styles.titleContainer}>
            <ThemedText type="subtitle">
              {t(pageInfo.nameTranslateKey)}
            </ThemedText>
          </View>
        </SafeAreaView>
        <HairLine />
      </ImageBackground>
    </>
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
    marginLeft: 10
  }
});
