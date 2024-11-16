import { useThemeColor } from "@/hooks/useThemeColor";
import { Switch, SwitchProps } from "react-native";

export type ThemedSwitchProps = SwitchProps & {
  darkColorTrackTrue?: string;
  lightColorTrackTrue?: string;
  darkColorTrackFalse?: string;
  lightColorTrackFalse?: string;
  darkColorThumb?: string;
  lightColorThumb?: string;
};

export default function ThemedSwitch({
  darkColorThumb,
  lightColorThumb,
  darkColorTrackTrue,
  lightColorTrackTrue,
  darkColorTrackFalse,
  lightColorTrackFalse,
  ...rest
}: ThemedSwitchProps) {
  const thumbColor = useThemeColor(
    { light: lightColorThumb, dark: darkColorThumb },
    "tint"
  );
  const trackColorTrue = useThemeColor(
    { light: lightColorTrackTrue, dark: darkColorTrackTrue },
    "text"
  );
  const trackColorFalse = useThemeColor(
    { light: lightColorTrackFalse, dark: darkColorTrackFalse },
    "shadow"
  );
  return (
    <Switch
      thumbColor={thumbColor}
      trackColor={{ false: trackColorFalse, true: trackColorTrue }}
      {...rest}
    />
  );
}
