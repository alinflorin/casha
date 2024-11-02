import { StyleSheet, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export type HairLineProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function HairLine({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: HairLineProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <ThemedView
      style={[{ backgroundColor }, styles.hairline, style]}
      {...otherProps}
    ></ThemedView>
  );
}

const styles = StyleSheet.create({
  hairline: {
    height: 1
  }
});
