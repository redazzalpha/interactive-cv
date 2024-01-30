// Utilities
import { defineStore } from 'pinia';
import AvatarImg from "@/assets/wolf.png";
import { ref } from 'vue';

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
    avatar: AvatarImg,
    appbarTitle: ref(""),
    links: [
      { label: "Accueil", href: "/home", icon: "mdi-home", appbartTitle: "Concepteur développeur" },
      { label: "Test", href: "/test", icon: "mdi-folder", appbartTitle: "Test" },
      { label: "Projets", href: "/projects", icon: "mdi-semantic-web", appbartTitle: "Mes Projets" },
      { label: "Qui suis-je ?", href: "/about", icon: "mdi-information-outline", appbartTitle: "Qui suis-je ?" },
    ]
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
