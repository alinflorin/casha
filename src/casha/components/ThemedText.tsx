import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "boldLink";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const linkColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "link"
  );
  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link, color: linkColor } : undefined,
        type === "boldLink"
          ? { ...styles.boldLink, color: linkColor }
          : undefined,
        style
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "OpenSans_400Regular"
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "OpenSans_600SemiBold"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "OpenSans_700Bold"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold"
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular"
  },
  boldLink: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold"
  }
});
