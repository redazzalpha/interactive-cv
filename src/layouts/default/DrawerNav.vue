<template>
  <AppDrawer
    location="right"
    :disable-resizer="true"
    v-model="store.drawer"
  ></AppDrawer>
</template>

<script setup lang="ts">
import vuetify from "@/plugins/vuetify";
import { useAppStore } from "@/store/app";
const store = useAppStore();

//#region event handler
function onResize(): void {
  if (!vuetify.display.mobile.value) store.setDrawer(false);
}
document.body.onresize = onResize;
//#endregion
</script>
