import { useThemeColor } from "@/hooks/useThemeColor";
import useTranslate from "@/hooks/useTranslate";
import { Button, Modal, ModalProps, StyleSheet, View } from "react-native";

export type ThemedModalProps = ModalProps & {
  backgroundColorLight?: string;
  backgroundColorDark?: string;
  shadowColorLight?: string;
  shadowColorDark?: string;
  borderColorLight?: string;
  borderColorDark?: string;
  onClose?: (result?: any) => void;
};

export default function ThemedModal({
  backgroundColorLight,
  backgroundColorDark,
  shadowColorDark,
  shadowColorLight,
  borderColorDark,
  borderColorLight,
  children,
  onClose,
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
      <View style={styles.centeredView}>
        <View
          style={[
            {
              shadowColor: shadowColor,
              backgroundColor: bgColor,
              borderColor: borderColor
            },
            styles.modalView
          ]}
        >
          {children}
          <Button
            onPress={() => {
              if (onClose) {
                onClose();
              }
            }}
            title={t("ui.general.close")}
          ></Button>
        </View>
      </View>
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
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
