import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedTextInput({
  lightColor,
  darkColor,
  style,
  ...rest
}: ThemedTextInputProps) {
  const accentColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const textColor = useThemeColor({}, "text");
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
    padding: 5
  }
});
