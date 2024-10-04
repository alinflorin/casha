import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "../assets/locales/en-US/translation.json";
import translationRo from "../assets/locales/ro-RO/translation.json";

const resources = {
  "ro-RO": { translation: translationRo },
  "en-US": { translation: translationEn },
};

export const initI18N = async (savedLanguage: string | undefined) => {
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageTag;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const useTranslate = () => {
  const { t } = useTranslation();

  return { t };
};

export default useTranslate;
