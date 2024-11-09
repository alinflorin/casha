import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

export default function useAssetsPreload(assetList: any[]) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all(
          assetList.map((a) => Asset.fromModule(a).downloadAsync())
        );
        setLoaded(true);
      } catch (err: any) {
        console.error(err);
        setError(err);
        setLoaded(true);
      }
    })();
  }, [assetList]);

  return [loaded, error];
}
