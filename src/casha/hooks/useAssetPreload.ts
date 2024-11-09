import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

export default function useAssetPreload(assets: any[]) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      try {
        await Promise.all(
          assets.map((a) => Asset.fromModule(a).downloadAsync())
        );
        setLoaded(true);
      } catch (err: any) {
        setLoaded(true);
        setError(err);
        console.error(err);
      }
    })();
  }, [assets, error]);

  return [loaded];
}
