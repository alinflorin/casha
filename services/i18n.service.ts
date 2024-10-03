import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "../assets/locales/en-US/translation.json";
import translationRo from "../assets/locales/ro-RO/translation.json";
import dbService from "./db.service";

const resources = {
  "ro-RO": { translation: translationRo },
  "en-US": { translation: translationEn },
};

class I18nService {
  async init() {
    let savedLanguage = (await dbService.getSetting("language"))?.value;

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
  }
}

export const i18nService = new I18nService();
export default i18nService;
