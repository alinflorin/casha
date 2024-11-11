import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { IconButtonProps } from "@expo/vector-icons/build/createIconSet";
import { useMemo } from "react";

export type ThemedIonButtonProps = IconButtonProps<any> & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedIonButton({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedIonButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const newStyle = useMemo(() => {
    return { ...style, color: color, fontFamily: "OpenSans-Regular" };
  }, [color, style]);

  return <Ionicons.Button style={newStyle} {...rest} />;
}
