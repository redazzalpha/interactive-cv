// Utilities
import { defineStore } from 'pinia';

import AvatarImg from "@/assets/wolf.png";
import * as Assets from "@/utils/assetImports";
import { ref } from 'vue';

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
    avatar: AvatarImg,
    appbarTitle: ref(""),
    links: [
      { label: "Accueil", href: "/home", icon: "mdi-home", appbartTitle: "Concepteur développeur" },
      { label: "Projets", href: "/projects", icon: "mdi-semantic-web", appbartTitle: "Mes Projets" },
      { label: "Qui suis-je ?", href: "/about", icon: "mdi-information-outline", appbartTitle: "Qui suis-je ?" },
      { label: "Fun art", href: "/art", icon: "mdi-palette", appbartTitle: "Fun art" },
    ],
    githubHomepage: "https://github.com/redazzalpha",
    githubDataUrl: "https://api.github.com/users/redazzalpha/repos?sort=updated",
    assets: [
      {label: "cv", image: Assets.ImageCv, imageSmall: Assets.ImageSmallCv, icon: Assets.IconCv, caption: "Cv de Nessoumou Wilfried", alt: "", width: 100  },
      {label: "webdev", image: Assets.ImageWebDev, imageSmall: Assets.ImageSmallWebDev, icon: Assets.IconWebDev, caption: "Cert. WebDev", alt: "", width: 100  },
      {label: "cda", image: Assets.ImageCDA, imageSmall: Assets.ImageSmallCDA, icon: Assets.IconCDA, caption: "Cert. CDA", alt: "", width: 100  },
      {label: "bep", image: Assets.ImageBEP, imageSmall: Assets.ImageSmallBep, icon: Assets.IconBEP, caption: "Cert. Bep", alt: "", width: 100  },
      {label: "letter", image: Assets.ImageLetter, imageSmall: Assets.ImageSmallLetter, icon: Assets.IconLetter, caption: "Lettre de recommandation", alt: "", width: 100  },
    ],
  }),
  getters: {
  },
  actions: {
    setDrawer(value: boolean): void {
      this.drawer = value;
    },
    setAppBartTitle(value: string): void {
      this.appbarTitle = value;
    }
  },
  persist: true,
})
