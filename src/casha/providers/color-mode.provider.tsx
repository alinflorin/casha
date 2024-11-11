import { PropsWithChildren, useState } from "react";
import ColorModeContext from "@/contexts/color-mode.context";
import ColorMode from "@/constants/ColorMode";

export interface ColorModeProviderProps {
  initialValue: ColorMode;
}

export const ColorModeProvider = ({
  initialValue,
  children
}: PropsWithChildren<ColorModeProviderProps>) => {
  const [colorMode, setColorMode] = useState<ColorMode>(initialValue);

  return (
    <ColorModeContext.Provider value={{ colorMode, update: setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
