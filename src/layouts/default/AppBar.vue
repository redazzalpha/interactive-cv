<template>
  <v-app-bar density="prominent" elevation="0">
    <v-container grid-list-xs fluid class="pa-0 ma-0">
      <v-row class="pt-8">
        <v-col
          class="d-flex justify-center align-center pa-0 ma-0"
          v-for="link in store.links"
          :key="link.label"
        >
          <AppTag
            v-show="!$vuetify.display.mobile"
            :size-chevron="40"
            :size-slash="30"
            :href="link.href"
            :icon="link.icon"
            :on-click="router.push"
          >
            {{ link.label }}
          </AppTag>
        </v-col>
      </v-row>
    </v-container>
    <v-app-bar-nav-icon
      v-show="$vuetify.display.mobile"
      @click="clickNavIcon"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAppStore } from "@/store/app";
const store = useAppStore();

//#region event handlers
function clickNavIcon(): void {
  store.setDrawer(true);
}
//#endregion
</script>
