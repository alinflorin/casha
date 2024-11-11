import { Colors } from "@/constants/Colors";
import useColorMode from "./useColorMode";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { colorMode } = useColorMode() ?? { colorMode: "light" };
  const colorFromProps = props[colorMode];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorMode][colorName];
  }
}
