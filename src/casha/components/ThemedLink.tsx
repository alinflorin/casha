import { StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Link, LinkProps } from "expo-router";

export type ThemedLinkProps<T extends string | object> = LinkProps<T> & {
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

export function ThemedLink<T extends string | object>({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedLinkProps<T>) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const linkColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "link"
  );
  return (
    <Link
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
    fontFamily: "OpenSans-Regular"
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "OpenSans-SemiBold"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 34,
    fontFamily: "OpenSans-Bold"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans-Bold"
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "OpenSans-Regular"
  },
  boldLink: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: "OpenSans-Bold"
  }
});
