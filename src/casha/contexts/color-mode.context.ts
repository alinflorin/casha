import { ColorMode } from "@/constants/ColorMode";
import React from "react";

export const ColorModeContext = React.createContext<{
  colorMode: ColorMode;
  update: (other: ColorMode) => void;
}>({
  colorMode: "auto",
  update: (_) => {}
});
export default ColorModeContext;
