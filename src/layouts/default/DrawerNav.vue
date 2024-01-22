<template>
  <AppDrawer location="right" :disable-resizer="true" v-model="store.drawer">
    <v-list>
      <v-list-item v-for="link in store.links" :key="link.label">
        <AppTag
          class="d-flex justify-center align-center"
          :href="link.href"
          :on-click="router.push"
          >{{ link.label }}</AppTag
        >
      </v-list-item>
    </v-list>
  </AppDrawer>
</template>

<script setup lang="ts">
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import { useAppStore } from "@/store/app";
const store = useAppStore();

//#region event handler
function onResize(): void {
  if (!vuetify.display.mobile.value) store.setDrawer(false);
}
document.body.onresize = onResize;
//#endregion
</script>
