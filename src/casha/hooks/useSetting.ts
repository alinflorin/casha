import { useEffect, useState } from "react";
import useDb from "./useDb";

export default function useSetting(key: string) {
  const db = useDb();
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const v = await db.getSetting(key);
      setValue(v);
    })();
  }, [db, key]);
  return value || null;
}
