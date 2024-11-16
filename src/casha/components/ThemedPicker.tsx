import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker, PickerProps } from "@react-native-picker/picker";

export type ThemedPickerProps = PickerProps & {
  lightColorSelection?: string;
  darkColorSelection?: string;
  lightColorText?: string;
  darkColorText?: string;
};

export default function ThemedPicker({
  lightColorSelection,
  darkColorSelection,
  lightColorText,
  darkColorText,
  mode,
  itemStyle,
  children,
  ...rest
}: ThemedPickerProps) {
  const textColor = useThemeColor(
    { light: lightColorText, dark: darkColorText },
    "text"
  );
  const selectionColor = useThemeColor(
    { light: lightColorSelection, dark: darkColorSelection },
    "tint"
  );
  return (
    <Picker
      mode={mode ? mode : "dropdown"}
      numberOfLines={1}
      selectionColor={selectionColor}
      dropdownIconColor={selectionColor}
      dropdownIconRippleColor={selectionColor}
      itemStyle={[
        {
          color: textColor,
          borderWidth: 1,
          borderColor: selectionColor
        },
        itemStyle
      ]}
      {...rest}
    >
      {children}
    </Picker>
  );
}
