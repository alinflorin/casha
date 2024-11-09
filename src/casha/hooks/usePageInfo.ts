import { useMemo } from "react";
import useTranslate from "./useTranslate";
import { Image } from "react-native";
import { Pages } from "@/constants/Pages";

export const usePageInfo = (path: string) => {
  const { t } = useTranslate();
  return useMemo(() => {
    let temp = Pages[path];
    if (!temp) {
      temp = Pages["?"];
    }
    return {
      name: t(temp.name),
      backgroundUrl: Image.resolveAssetSource(temp.backgroundResource)!.uri!
    };
  }, [t, path]);
};

export default usePageInfo;
