import { Pages } from "@/constants/Pages";
import { useAssets } from "expo-asset";
import { useMemo } from "react";

export default function usePageInfo(route: string) {
  const [assets] = useAssets(
    Object.keys(Pages)
      .map((x) => Pages[x])
      .filter((x) => x.backgroundImageResource)
      .map((x) => x.backgroundImageResource)
  );
  const pageInfo = useMemo(() => {
    let temp = Pages[route];
    if (!temp) {
      temp = Pages["?"];
    }
    return temp;
  }, [route]);

  return {
    pageInfo: pageInfo,
    bgAssetUri: assets
      ? assets[Object.keys(Pages).indexOf(route)].localUri!
      : undefined
  };
}
