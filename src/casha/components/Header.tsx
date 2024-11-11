import { Image, ImageBackground, StyleSheet, View } from "react-native";
import HairLine from "./HairLine";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAssets } from "expo-asset";
import BackButton, { BackButtonProps } from "./BackButton";
import TopMenu from "./TopMenu";

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

  return (
    <ImageBackground
      style={styles.root}
      source={{
        uri: bgAssets ? bgAssets[0].localUri! : undefined
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
  titleSpacer: {
    flex: 1
  },
  titleContainer: {
    marginLeft: 10
  }
});
