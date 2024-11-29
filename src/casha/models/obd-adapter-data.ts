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
  writeCharacteristic: OdbBleCharacteristicData;
  readCharacteristic: OdbBleCharacteristicData;
}

export interface OdbBleCharacteristicData {
  uuid: string;
  isReadable: boolean;
  isNotifiable: boolean;
  isIndicatable: boolean;
  isWritableWithResponse: boolean;
  isWritableWithoutResponse: boolean;
}
