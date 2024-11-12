import { StyleSheet, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { PropsWithChildren, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

export type ThemedMessageBarProps = PropsWithChildren<
  ViewProps & {
    type: keyof typeof Colors.light & keyof typeof Colors.dark;
    visible?: boolean;
    closeButtonEnabled?: boolean;
    onClosed?: () => void;
  }
>;

export function ThemedMessageBar({
  visible,
  closeButtonEnabled,
  onClosed,
  style,
  type,
  children,
  ...otherProps
}: ThemedMessageBarProps) {
  const backgroundColor = useThemeColor({}, type);
  const textColor = useThemeColor({}, "text");

  const onCloseClick = useCallback(() => {
    if (onClosed) {
      onClosed();
    }
  }, [onClosed]);

  return (
    <>
      {(visible === undefined || visible === true) && (
        <View style={[{ backgroundColor }, style, styles.root]} {...otherProps}>
          <View style={styles.content}>{children}</View>
          {closeButtonEnabled && (
            <View style={styles.close}>
              <Ionicons.Button
                style={styles.closeButton}
                onPress={onCloseClick}
                name="close"
                size={16}
                underlayColor={"transparent"}
                color={textColor}
                backgroundColor="transparent"
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  close: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  closeButton: {
    margin: 0,
    padding: 0
  }
});
