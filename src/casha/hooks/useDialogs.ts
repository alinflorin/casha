import { useCallback } from "react";
import useColorMode from "./useColorMode";
import { Alert } from "react-native";
import useTranslate from "./useTranslate";

export default function useDialogs() {
  const { colorMode } = useColorMode();
  const { t } = useTranslate();

  const showAlert = useCallback(
    (
      title: string,
      message: string,
      buttonText: string | undefined = undefined
    ) => {
      Alert.alert(
        title,
        message,
        [{ style: "default", text: buttonText || t("ui.general.ok") }],
        {
          userInterfaceStyle: colorMode === "dark" ? "dark" : "light"
        }
      );
    },
    [colorMode, t]
  );

  const showConfirmation = useCallback(
    (
      onConfirmPressed: () => void,
      title: string | undefined = undefined,
      message: string | undefined = undefined,
      positiveButton: string | undefined = undefined,
      negativeButton: string | undefined = undefined
    ) => {
      Alert.alert(
        title || t("ui.general.confirmation"),
        message || t("ui.general.areYouSure"),
        [
          {
            text: negativeButton || t("ui.general.cancel"),
            style: "cancel"
          },
          {
            text: positiveButton || t("ui.general.ok"),
            onPress: () => {
              if (onConfirmPressed) {
                onConfirmPressed();
              }
            }
          }
        ],
        {
          userInterfaceStyle: colorMode === "dark" ? "dark" : "light"
        }
      );
    },
    [colorMode, t]
  );

  return { showAlert, showConfirmation };
}
