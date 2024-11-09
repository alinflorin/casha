import { ImageSourcePropType } from "react-native";

export interface PageDetails {
  name: string;
  backgroundResource: ImageSourcePropType;
}

export const Pages: { [key: string]: PageDetails } = {
  "/": {
    name: "Home",
    backgroundResource: require("../assets/images/pages/home.png")
  },
  "/about": {
    name: "About",
    backgroundResource: require("../assets/images/pages/about.png")
  },
  "?": {
    backgroundResource: require("../assets/images/pages/unknown.png"),
    name: "Unknown"
  }
};
