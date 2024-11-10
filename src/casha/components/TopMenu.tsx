import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContextMenu from "react-native-context-menu-view";

export default function TopMenu() {
  const accentColor = useThemeColor({}, "tint");
  return (
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
  );
}
