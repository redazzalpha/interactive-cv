// Utilities
import { defineStore } from 'pinia';
import AvatarImg from "@/assets/wolf.png";

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
    avatar: AvatarImg,
    links: [
      { label: "Accueil", href: "/home", icon: "mdi-home" },
      { label: "Test", href: "/test", icon: "mdi-folder" },
      { label: "Projets", href: "/projects", icon: "mdi-semantic-web" },
      { label: "Qui suis-je ?", href: "/about", icon: "mdi-information-outline" },
    ]
  }),
  getters: {

  },
  actions: {
    setDrawer(value: boolean): void {
      this.drawer = value;
    }
  },
  persist: true,
})
