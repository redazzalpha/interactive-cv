<template>
  <v-app-bar
    id="app-bar"
    density="prominent"
    elevation="0"
    class="d-flex justify-center align-center"
  >
    <v-container grid-list-xs fluid class="ma-auto">
      <v-row>
        <v-col
          class="d-flex justify-center align-center"
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
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
    <v-app-bar-nav-icon
      class="align-self-center"
      v-show="$vuetify.display.mobile"
      @click="clickNavIcon"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
import * as dynamics from "dynamics.js";
const store = useAppStore();

//#region animation functions
function updown(): void {
  const appbar: HTMLElement | null = document.getElementById("app-bar");

  dynamics.css(appbar, {
    translateY: -100,
  });

  dynamics.animate(
    appbar,
    {
      translateY: 0,
    },
    {
      type: dynamics.spring,
      frequency: 200,
      friction: 200,
      duration: 500,
    }
  );
}
//#endregion

//#region event handlers
function clickNavIcon(): void {
  store.setDrawer(true);
}
//#endregion

//#region hooks
onMounted(() => {
  updown();
});
//#endregion
</script>
