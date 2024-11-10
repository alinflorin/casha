import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Header, { HeaderProps } from "@/components/Header";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

export interface PageContainerProps {
  headerOptions: HeaderProps;
}

export default function PageContainer(
  props: PropsWithChildren<PageContainerProps>
) {
  return (
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
