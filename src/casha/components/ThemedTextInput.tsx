import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColorBorder?: string;
  darkColorBorder?: string;
  lightColorText?: string;
  darkColorText?: string;
};

export default function ThemedTextInput({
  lightColorBorder,
  darkColorBorder,
  lightColorText,
  darkColorText,
  style,
  ...rest
}: ThemedTextInputProps) {
  const accentColor = useThemeColor(
    { light: lightColorBorder, dark: darkColorBorder },
    "tint"
  );
  const textColor = useThemeColor(
    {
      light: lightColorText,
      dark: darkColorText
    },
    "text"
  );
  return (
    <TextInput
      style={[
        {
          color: textColor,
          borderColor: accentColor
        },
        style,
        styles.input
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 5,
    fontFamily: "OpenSans-Regular"
  }
});
