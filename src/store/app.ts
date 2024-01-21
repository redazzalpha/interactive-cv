// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: (): State => ({
    drawer: false,
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
