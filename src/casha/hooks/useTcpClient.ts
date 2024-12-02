import { useCallback, useEffect, useRef, useState } from "react";
import TcpSocket from "react-native-tcp-socket";

export default function useTcpClient(
  addressValue: string | undefined,
  portValue: number | undefined
) {
  const [address, setAddress] = useState<string | undefined>(addressValue);
  const [port, setPort] = useState<number | undefined>(portValue);
  const client = useRef<TcpSocket.Socket>();

  useEffect(() => {
    setAddress(addressValue);
    setPort(portValue);
  }, [addressValue, portValue]);

  const connect = useCallback(async () => {
    if (!address || !port) {
      throw new Error("Invalid address/port");
    }
    const c = await new Promise<TcpSocket.Socket>((accept, reject) => {
      const c = TcpSocket.connect(
        {
          port: port,
          host: address
        },
        () => {
          accept(c);
          c.off("error");
          c.off("connect");
        }
      );
      c.on("error", (e) => {
        reject(e);
        c.off("error");
        c.off("connect");
      });
    });
    client.current = c;
  }, [address, port, client]);

  const disconnect = useCallback(() => {
    if (client) {
      client.current?.destroy();
      client.current = undefined;
    }
  }, [client]);

  const write = useCallback(
    async (value: string) => {
      if (!client.current) {
        throw new Error("Not connected - connect before calling write");
      }
      return new Promise<void>((accept, reject) => {
        client.current!.write(value + "\r\n", "ascii", (e) => {
          if (e) {
            reject(e);
            return;
          }
          accept();
        });
      });
    },
    [client]
  );

  const writeAndRead = useCallback(
    async (value: string, timeout = 10000) => {
      if (!client.current) {
        throw new Error("Not connected - connect before calling writeAndRead");
      }
      return new Promise<string | undefined>((accept, reject) => {
        let timeoutHandle: NodeJS.Timeout | undefined;
        client.current!.on("data", (d) => {
          console.log(d.toString());
          accept((d as Buffer).toString());
          client.current!.off("data");
          client.current!.off("error");
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
        });
        client.current!.on("error", (e) => {
          reject(e);
          client.current!.off("data");
          client.current!.off("error");
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
        });

        client.current!.write(value + "\r\n", "ascii", (e) => {
          if (e) {
            reject(e);
            client.current!.off("data");
            client.current!.off("error");
            if (timeoutHandle) {
              clearTimeout(timeoutHandle);
            }
          }
        });

        timeoutHandle = setTimeout(() => {
          reject("Timeout");
          client.current!.off("data");
          client.current!.off("error");
        }, timeout);
      });
    },
    [client]
  );

  return { connect, disconnect, write, writeAndRead };
}
