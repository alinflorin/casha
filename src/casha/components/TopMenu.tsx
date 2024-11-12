import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import ContextMenu, { ContextMenuAction } from "react-native-context-menu-view";

export default function TopMenu() {
  const accentColor = useThemeColor({}, "tint");
  const { t } = useTranslate();
  const router = useRouter();

  const menuActions = useMemo(() => {
    return [
      { title: t("ui.header.menu.settings"), route: "/settings" },
      { title: t("ui.header.menu.about"), route: "/about" }
    ] as (ContextMenuAction & { route: Href<string | object> })[];
  }, [t]);

  const onMenuItemPressed = useCallback(
    (index: number) => {
      router.navigate(menuActions[index].route);
    },
    [router, menuActions]
  );

  return (
    <ContextMenu
      actions={menuActions}
      dropdownMenuMode
      onPress={(e) => onMenuItemPressed(e.nativeEvent.index)}
    >
      <Ionicons.Button
        name="ellipsis-vertical"
        size={24}
        underlayColor={"transparent"}
        backgroundColor="transparent"
        color={accentColor}
      />
    </ContextMenu>
  );
}
