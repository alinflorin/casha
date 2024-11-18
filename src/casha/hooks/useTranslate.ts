import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "../assets/locales/en/translation.json";
import translationRo from "../assets/locales/ro/translation.json";

export const supportedLanguages = {
  ro: { translation: translationRo, name: "Română" },
  en: { translation: translationEn, name: "English" }
};

export const initI18N = async (
  savedLanguage: string | undefined = undefined
) => {
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode!;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: supportedLanguages,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
};

export const useTranslate = () => {
  const [t, i18n, isReady] = useTranslation();

  return { t, i18n, isReady };
};

export default useTranslate;
