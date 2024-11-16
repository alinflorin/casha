import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export type ThemedDropdownProps<T> = DropdownProps<T> & {
  lightColorText?: string;
  darkColorText?: string;
  lightColorBorder?: string;
  darkColorBorder?: string;
  lightColorIcon?: string;
  darkColorIcon?: string;
};

export default function ThemedDropdown<T>({
  lightColorText,
  darkColorText,
  lightColorBorder,
  darkColorBorder,
  lightColorIcon,
  darkColorIcon,
  style,
  selectedTextStyle,
  itemContainerStyle,
  itemTextStyle,
  placeholderStyle,
  inputSearchStyle,
  ...rest
}: ThemedDropdownProps<T>) {
  const borderColor = useThemeColor(
    { light: lightColorBorder, dark: darkColorBorder },
    "tint"
  );
  const textColor = useThemeColor(
    { light: lightColorText, dark: darkColorText },
    "text"
  );
  const iconColor = useThemeColor(
    { light: lightColorIcon, dark: darkColorIcon },
    "icon"
  );
  return (
    <Dropdown
      placeholderStyle={[{ color: textColor }, placeholderStyle]}
      fontFamily="OpenSans-Regular"
      iconColor={iconColor}
      selectedTextStyle={[
        {
          color: textColor,
          shadowOffset: undefined,
          shadowColor: undefined,
          shadowOpacity: undefined,
          shadowRadius: undefined,
          elevation: undefined
        },
        selectedTextStyle
      ]}
      itemTextStyle={[
        {
          color: textColor,
          shadowOffset: undefined,
          shadowColor: undefined,
          shadowOpacity: undefined,
          shadowRadius: undefined,
          elevation: undefined
        },
        itemTextStyle
      ]}
      containerStyle={[
        {
          backgroundColor: "transparent",
          borderColor: borderColor,
          shadowOffset: undefined,
          shadowColor: undefined,
          shadowOpacity: undefined,
          shadowRadius: undefined,
          elevation: undefined
        }
      ]}
      itemContainerStyle={[
        {
          backgroundColor: "transparent",
          shadowOffset: undefined,
          shadowColor: undefined,
          shadowOpacity: undefined,
          shadowRadius: undefined,
          elevation: undefined
        },
        itemContainerStyle
      ]}
      inputSearchStyle={[
        {
          color: textColor,
          borderColor: borderColor
        },
        inputSearchStyle,
        styles.inputSearch
      ]}
      activeColor={borderColor}
      searchPlaceholderTextColor={textColor}
      style={[
        {
          borderColor: borderColor
        },
        style,
        styles.dropdown
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    padding: 5
  },
  inputSearch: {
    padding: 5
  }
});
