import { Image, ImageBackground, StyleSheet, View } from "react-native";
import HairLine from "./HairLine";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAssets } from "expo-asset";
import BackButton, { BackButtonProps } from "./BackButton";
import TopMenu from "./TopMenu";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";

export interface HeaderProps {
  title: string;
  backButton?: BackButtonProps;
  bgResource: number;
  contextMenuVisible?: boolean;
}

export default function Header(props: HeaderProps) {
  const [logoAssets] = useAssets([require("../assets/images/icon.png")]);
  const [bgAssets] = useAssets([props.bgResource]);

  const bgColor = useThemeColor({}, "background");

  return (
    <>
      {bgAssets && (
        <ImageBackground
          style={styles.root}
          source={{
            uri: bgAssets[0].uri
          }}
          resizeMethod="auto"
          resizeMode="cover"
          imageStyle={{
            opacity: 0.2
          }}
        >
          <SafeAreaView edges={["top", "left", "right"]} style={styles.content}>
            <View style={styles.logoContainer}>
              {logoAssets && (
                <Image
                  source={{ uri: logoAssets[0].uri! }}
                  width={44}
                  height={44}
                  style={styles.logo}
                />
              )}
              <View style={{ flex: 1 }} />
              {props.contextMenuVisible && <TopMenu />}
            </View>
            {props.backButton && <BackButton {...props.backButton} />}
            <View style={styles.titleSpacer}></View>
            <View style={styles.titleContainer}>
              <ThemedText type="title">{props.title}</ThemedText>
            </View>
          </SafeAreaView>
          <HairLine />
        </ImageBackground>
      )}
      <StatusBar backgroundColor={bgColor} />
    </>
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
