import { ObdPids } from "@/constants/OdbPids";

function decodeServiceIdentifier(responseHex: string) {
  const responseMode = parseInt(responseHex, 16);
  const requestMode = responseMode - 0x40; // Subtract 0x40 to get the original mode
  const hexMode = requestMode.toString(16).toUpperCase();
  // Pad only if it's a single digit
  return hexMode.length === 1 ? "0" + hexMode : hexMode;
}

export default function useObdDecoder() {
  const decodeVinFromBleReply = (reply: string) => {
    if (!reply) {
      throw new Error("VIN reply is undefined");
    }
    if (reply.indexOf("\r") > -1) {
      reply = reply.substring(0, reply.indexOf("\r"));
    } else {
      if (reply.indexOf("\n") > -1) {
        reply = reply.substring(0, reply.indexOf("\n"));
      }
    }
    const processedReply = reply
      .replaceAll(" ", "")
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .toUpperCase();

    if (processedReply.length <= 6) {
      throw new Error("Invalid VIN reply length");
    }

    const header = processedReply.substring(0, 6);
    const serviceIdentifier = header.substring(0, 2);
    const pidValue = header.substring(2, 4);
    const serviceIdentifierDecoded = decodeServiceIdentifier(serviceIdentifier);
    if (serviceIdentifierDecoded + pidValue !== ObdPids.ReadVin) {
      throw new Error("The response is not for VIN PID");
    }
    const bytes = processedReply.match(/.{1,2}/g);
    const vin = bytes!
      .slice(3)
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("");
    return vin;
  };

  return { decodeVinFromBleReply };
}
