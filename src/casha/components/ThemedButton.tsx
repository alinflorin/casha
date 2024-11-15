import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, ButtonProps } from "react-native";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedButton({
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const accentColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  return <Button color={accentColor} {...rest} />;
}
