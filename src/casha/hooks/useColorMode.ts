import ColorMode from "@/constants/ColorMode";
import ColorModeContext from "@/contexts/color-mode.context";
import { useContext } from "react";
import { useColorScheme } from "react-native";

export const useColorMode = (): {
  colorMode: "light" | "dark";
  update: (cm: ColorMode) => void;
} => {
  const { colorMode, update } = useContext(ColorModeContext);
  const systemColorScheme = useColorScheme();
  let finalColorMode: "light" | "dark" = "light";
  if (colorMode === "auto") {
    if (systemColorScheme && systemColorScheme === "dark") {
      finalColorMode = "dark";
    }
  } else {
    if (colorMode === "dark") {
      finalColorMode = "dark";
    }
  }
  return {
    colorMode: finalColorMode,
    update: update
  };
};
export default useColorMode;
