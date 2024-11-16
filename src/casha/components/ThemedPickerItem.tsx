import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker, PickerItemProps } from "@react-native-picker/picker";

export type ThemedPickerItemProps = PickerItemProps & {
  lightColorText?: string;
  darkColorText?: string;
};

export default function ThemedPickerItem({
  lightColorText,
  darkColorText,
  ...rest
}: ThemedPickerItemProps) {
  const textColor = useThemeColor(
    { light: lightColorText, dark: darkColorText },
    "text"
  );
  return (
    <Picker.Item fontFamily="OpenSans-Regular" color={textColor} {...rest} />
  );
}
