import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export type ThemedActivityIndicatorProps = ActivityIndicatorProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedActivityIndicator({
  lightColor,
  darkColor,
  ...rest
}: ThemedActivityIndicatorProps) {
  const tintColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor
    },
    "tint"
  );
  return <ActivityIndicator color={tintColor} {...rest} />;
}
