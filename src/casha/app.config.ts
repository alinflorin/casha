import { ExpoConfig, ConfigContext } from "expo/config";
import { withEntitlementsPlist } from "expo/config-plugins";

export default ({ config }: ConfigContext): ExpoConfig => {
  withEntitlementsPlist(config as ExpoConfig, (config) => {
    delete config.modResults["aps-environment"];
    return config;
  });

  return {
    ...config,
    name: "casha",
    slug: "casha",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "casha",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.huna2.casha"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.huna2.casha"
    },
    platforms: ["android", "ios"],
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true
    },
    extra: {
      databaseName: "casha_db"
    }
  };
};