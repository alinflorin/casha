import { PageInfo } from "@/models/PageInfo";

export const Pages: { [key: string]: PageInfo } = {
  "/": {
    nameTranslateKey: "Home",
    name: "home",
    backgroundImageResource: require("../assets/images/pages/home.png")
  },
  "/about": {
    nameTranslateKey: "About",
    name: "about",
    backgroundImageResource: require("../assets/images/pages/about.png")
  },
  "?": {
    nameTranslateKey: "Unknown",
    name: "unknown",
    backgroundImageResource: require("../assets/images/pages/unknown.png")
  }
};
