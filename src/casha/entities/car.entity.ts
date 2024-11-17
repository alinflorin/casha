export interface CarEntity {
  id?: number;
  vin: string;
  display_name: string;
  make: string;
  model: string;
  year: number;
  km?: number;
  obd_adapter_data?: string;
  uses_imperial: boolean;
}
