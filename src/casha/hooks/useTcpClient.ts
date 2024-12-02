import { useCallback } from "react";
import TcpSocket from "react-native-tcp-socket";

export default function useTcpClient() {
  const connect = useCallback(async (address: string, port: number) => {
    return new Promise<TcpSocket.Socket>((accept, reject) => {
      try {
        const c = TcpSocket.createConnection(
          {
            port: port,
            host: address
          },
          () => {
            accept(c);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }, []);

  const write = useCallback(async (client: TcpSocket.Socket, value: string) => {
    return new Promise<void>((accept, reject) => {
      client.write(value, "utf-8", (e) => {
        if (e) {
          reject(e);
          return;
        }
        accept();
      });
    });
  }, []);

  const writeAndRead = useCallback(
    async (client: TcpSocket.Socket, value: string, timeout = 10000) => {
      return new Promise<string | undefined>((accept, reject) => {
        let timeoutHandle = setTimeout(() => {
          reject("Client timed out");
          client.off("error");
          client.off("data");
        }, timeout);

        client.on("data", (d) => {
          accept(d?.toString());
          client.off("error");
          client.off("data");
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
        });
        client.on("error", (e) => {
          reject(e);
          client.off("error");
          client.off("data");
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
        });

        client.write(value, "utf-8", (e) => {
          if (e) {
            reject(e);
            client.off("error");
            client.off("data");
            if (timeoutHandle) {
              clearTimeout(timeoutHandle);
            }
          }
        });
      });
    },
    []
  );

  const kill = useCallback((client: TcpSocket.Socket) => {
    client.destroy();
  }, []);

  return { connect, writeAndRead, kill, write };
}
