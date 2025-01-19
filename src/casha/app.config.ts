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
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.huna2.casha",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#F9FAFB",
        dark: {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#1A202C"
        }
      }
    },
    android: {
      package: "com.huna2.casha",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#F9FAFB",
        dark: {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#1A202C"
        }
      }
    },
    platforms: ["android", "ios"],
    plugins: [
      "expo-router",
      "expo-localization",
      "expo-asset",
      [
        "react-native-ble-plx",
        {
          isBackgroundEnabled: true
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      databaseName: "casha"
    }
  } as ExpoConfig;
};
