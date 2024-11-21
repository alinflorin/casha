import { useEffect } from "react";
import ThemedModal from "../ThemedModal";
import { ThemedText } from "../ThemedText";

export interface BleProps {
  visible: boolean;
  onClose: () => void;
}

export default function Ble({ visible, onClose }: BleProps) {
  useEffect(() => {
    console.log("BLE rendered");
  }, []);
  return (
    <ThemedModal
      transparent
      animationType="slide"
      onClose={onClose}
      visible={visible}
    >
      <ThemedText>
        zdfds fsfdsdf ssd sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sd fsdf sfs
        sdf sd fsdf sdf sdf sdf sdf sdf sdf sdf sfsf sdf
      </ThemedText>
    </ThemedModal>
  );
}
