import { useCallback } from "react";
import useColorMode from "./useColorMode";
import { Alert } from "react-native";

export default function useDialogs() {
  const { colorMode } = useColorMode();
  const showAlert = useCallback(
    (title: string, message: string, buttonText: string) => {
      Alert.alert(title, message, [{ style: "default", text: buttonText }], {
        userInterfaceStyle: colorMode === "dark" ? "dark" : "light"
      });
    },
    [colorMode]
  );

  const showConfirmation = useCallback(
    (
      title: string,
      message: string,
      positiveButton: string,
      negativeButton: string,
      onPress: () => void
    ) => {
      Alert.alert(
        title,
        message,
        [
          {
            text: negativeButton,
            style: "cancel"
          },
          {
            text: positiveButton,
            onPress: () => {
              onPress();
            }
          }
        ],
        {
          userInterfaceStyle: colorMode === "dark" ? "dark" : "light"
        }
      );
    },
    [colorMode]
  );

  return { showAlert, showConfirmation };
}
