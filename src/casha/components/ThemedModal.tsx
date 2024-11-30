import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import {
  Button,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  View
} from "react-native";

export type ThemedModalProps = ModalProps & {
  backgroundColorLight?: string;
  backgroundColorDark?: string;
  shadowColorLight?: string;
  shadowColorDark?: string;
  borderColorLight?: string;
  borderColorDark?: string;
  onClose?: (result?: any) => void;
  disableCloseOnBackdropPress?: boolean;
  closeDisabled?: boolean;
};

export default function ThemedModal({
  backgroundColorLight,
  backgroundColorDark,
  shadowColorDark,
  shadowColorLight,
  borderColorDark,
  borderColorLight,
  children,
  disableCloseOnBackdropPress,
  style,
  onClose,
  closeDisabled,
  ...rest
}: ThemedModalProps) {
  const bgColor = useThemeColor(
    { light: backgroundColorLight, dark: backgroundColorDark },
    "background"
  );
  const shadowColor = useThemeColor(
    { light: shadowColorLight, dark: shadowColorDark },
    "shadow"
  );
  const borderColor = useThemeColor(
    { light: borderColorLight, dark: borderColorDark },
    "tint"
  );
  const { t } = useTranslate();

  return (
    <Modal {...rest}>
      <Pressable
        onPress={
          disableCloseOnBackdropPress || closeDisabled
            ? undefined
            : () => {
                if (onClose) {
                  onClose();
                }
              }
        }
        style={styles.centeredView}
      >
        <Pressable
          onPress={
            disableCloseOnBackdropPress || closeDisabled
              ? undefined
              : (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }
          }
          style={[
            {
              shadowColor: shadowColor,
              backgroundColor: bgColor,
              borderColor: borderColor
            },
            style,
            styles.modalView
          ]}
        >
          <View style={styles.flexView}>{children}</View>
          <Button
            disabled={closeDisabled}
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}
            title={t("ui.general.close")}
          ></Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1
  },
  flexView: {
    flex: 1
  }
});
