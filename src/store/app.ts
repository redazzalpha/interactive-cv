// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
    links: [
      { label: "Home", href: "/", icon: "mdi-home" },
      { label: "Test", href: "/test", icon: "mdi-folder" },
      { label: "Test2", href: "/test2", icon: "mdi-border-all" },
      { label: "Test3", href: "/test3", icon: "mdi-content-cut" },
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
