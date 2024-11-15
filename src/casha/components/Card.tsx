import { PropsWithChildren, useCallback, useMemo } from "react";
import { ThemedView, ThemedViewProps } from "./ThemedView";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContextMenu, { ContextMenuAction } from "react-native-context-menu-view";

export type CardProps = PropsWithChildren<
  ThemedViewProps & {
    title?: string;
    icon?: string;
    iconColor?: string;
    onPress?: () => void;
    contextMenu?: {
      title: string;
      disabled?: boolean;
      destructive?: boolean;
      action?: () => void;
    }[];
  }
>;

export default function Card({
  title,
  icon,
  iconColor,
  style,
  onPress,
  children,
  contextMenu,
  ...restOfProps
}: CardProps) {
  const accentColor = useThemeColor({}, "tint");
  const shadowColor = useThemeColor({}, "shadow");

  const contextMenuItems = useMemo(() => {
    if (!contextMenu) {
      return undefined;
    }
    return contextMenu.map((x) => {
      return {
        title: x.title,
        disabled: x.disabled,
        destructive: x.destructive
      } as ContextMenuAction;
    });
  }, [contextMenu]);

  const onMenuItemPressed = useCallback(
    (index: number) => {
      if (contextMenu![index].action) {
        contextMenu![index].action();
      }
    },
    [contextMenu]
  );

  return (
    <ThemedView
      style={[
        {
          shadowColor: shadowColor,
          borderColor: accentColor
        },
        style,
        styles.wrapper
      ]}
      {...restOfProps}
    >
      <View style={styles.header}>
        {title && <ThemedText type="defaultSemiBold">{title}</ThemedText>}
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color={iconColor || accentColor}
          />
        )}
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        {contextMenuItems && (
          <ContextMenu
            actions={contextMenuItems!}
            dropdownMenuMode
            onPress={(e) => onMenuItemPressed(e.nativeEvent.index)}
          >
            <Ionicons.Button
              name="ellipsis-vertical"
              size={20}
              underlayColor={"transparent"}
              backgroundColor="transparent"
              style={styles.contextMenuIcon}
              color={accentColor}
            />
          </ContextMenu>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    elevation: 2,
    borderWidth: 1
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  contextMenuIcon: {
    padding: 0,
    margin: 0,
    paddingBottom: 5
  }
});
