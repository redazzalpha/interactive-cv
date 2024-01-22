// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
    links: [
      { label: "Home", href: "/" },
      { label: "Test", href: "/test" },
      { label: "Test2", href: "/test2" },
      { label: "Test3", href: "/test3" },
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
