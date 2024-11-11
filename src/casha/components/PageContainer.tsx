import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Header, { HeaderProps } from "@/components/Header";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import useColorMode from "@/hooks/useColorMode";

export interface PageContainerProps {
  headerOptions: HeaderProps;
}

export default function PageContainer(
  props: PropsWithChildren<PageContainerProps>
) {
  const { colorMode } = useColorMode();

  return (
    <ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <Header {...props.headerOptions} />
          </View>
          <View style={styles.slot}>
            <SafeAreaView
              edges={["bottom", "left", "right"]}
              style={styles.contentSafeArea}
            >
              {props.children}
            </SafeAreaView>
          </View>
        </ThemedView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentSafeArea: {
    flex: 1
  },
  header: {
    flex: 1
  },
  slot: {
    flex: 4,
    padding: 10
  }
});
