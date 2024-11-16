import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export type ThemedPickerProps = PickerProps & {
  lightColorBorder?: string;
  darkColorBorder?: string;
  lightColorText?: string;
  darkColorText?: string;
};

export default function ThemedPicker({
  lightColorBorder,
  darkColorBorder,
  lightColorText,
  darkColorText,
  style,
  children,
  ...rest
}: ThemedPickerProps) {
  const borderColor = useThemeColor(
    { light: lightColorBorder, dark: darkColorBorder },
    "tint"
  );
  const textColor = useThemeColor(
    { light: lightColorText, dark: darkColorText },
    "text"
  );
  return (
    <Picker
      style={[
        {
          borderColor: borderColor,
          color: textColor
        },
        style,
        styles.dropdown
      ]}
      {...rest}
    >
      {children}
    </Picker>
  );
}

const styles = StyleSheet.create({
  dropdown: {}
});
