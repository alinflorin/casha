import { useCallback, useState } from "react";
import TcpSocket from "react-native-tcp-socket";

export default function useTcpClient() {
  const [client, setClient] = useState<TcpSocket.Socket | undefined>();

  const connect = useCallback(
    async (address: string, port: number) => {
      return new Promise<void>((accept, reject) => {
        const c = TcpSocket.createConnection(
          {
            port: port,
            host: address
          },
          () => {}
        );
        setClient(c);

        c.on("connect", () => {
          accept();
          c.off("connect");
          c.off("error");
        });

        c.on("error", (e) => {
          reject(e);
          c.off("error");
          c.off("connect");
        });
      });
    },
    [setClient]
  );

  const writeAndRead = useCallback(
    async (value: string) => {
      if (!client) {
        throw new Error("Client is not connected/initialized");
      }
      return new Promise<string | undefined>((accept, reject) => {
        if (!client.write(value, "utf-8")) {
          reject("Write failed");
          return;
        }
        client.on("data", (d) => {
          accept(d as string);
          client.off("error");
          client.off("data");
        });
        client.on("error", (e) => {
          reject(e);
          client.off("error");
          client.off("data");
        });
      });
    },
    [client]
  );

  return { connect, writeAndRead };
}
