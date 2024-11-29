import { OdbAdapterData } from "./obd-adapter-data";

export interface ScanDialogData {
  vin: string;
  km: number;
  obd_adapter_data: OdbAdapterData;
}
