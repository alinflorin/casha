export interface OdbAdapterData {
  ble?: OdbBleAdapterData;
  wifi?: ObdWifiAdapterData;
}

export interface ObdWifiAdapterData {
  ip: string;
  port: number;
}

export interface OdbBleAdapterData {
  deviceName: string;
  deviceAddress: string;
  serviceUuid: string;
  writeCharacteristicUuid: string;
  readCharacteristicUuid: string;
}
