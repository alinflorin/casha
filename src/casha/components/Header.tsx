import { Image, ImageBackground, StyleSheet, View } from "react-native";
import HairLine from "./HairLine";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAssets } from "expo-asset";
import BackButton, { BackButtonProps } from "./BackButton";
import TopMenu from "./TopMenu";
import { useMemo } from "react";
import useColorMode from "@/hooks/useColorMode";

export interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  backButtonOptions?: BackButtonProps;
  bgResource: number;
  contextMenuVisible?: boolean;
}

export default function Header(props: HeaderProps) {
  const [logoAssets] = useAssets([require("../assets/images/icon.png")]);
  const [bgAssets] = useAssets([props.bgResource]);
  const { colorMode } = useColorMode();

  const headerOverlayBgColor = useMemo(() => {
    return colorMode === "dark"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)";
  }, [colorMode]);

  return (
    <ImageBackground
      style={styles.root}
      source={
        bgAssets
          ? {
              uri: bgAssets[0].uri
            }
          : undefined
      }
      resizeMethod="auto"
      resizeMode="cover"
      imageStyle={{
        opacity: 0.2
      }}
    >
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={[
          {
            backgroundColor: headerOverlayBgColor
          },
          styles.content
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={logoAssets ? { uri: logoAssets[0].uri! } : undefined}
            width={44}
            height={44}
            style={styles.logo}
          />
          <View style={{ flex: 1 }} />
          {props.contextMenuVisible && <TopMenu />}
        </View>
        {props.canGoBack && <BackButton {...props.backButtonOptions} />}
        <View style={styles.titleSpacer}></View>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">{props.title}</ThemedText>
        </View>
      </SafeAreaView>
      <HairLine />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    flex: 1,
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
  titleSpacer: {
    flex: 1
  },
  titleContainer: {
    marginLeft: 10
  }
});
