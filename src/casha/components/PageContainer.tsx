import { PropsWithChildren, useCallback } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
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

  const hideKeyboard = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Pressable style={styles.pressable} onPress={hideKeyboard}>
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
        </Pressable>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1
  },
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
