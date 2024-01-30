<template>
  <AppDrawer location="right" :disable-resizer="true" v-model="store.drawer">
    <v-list>
      <!-- avatar  -->
      <AppAvatar :image="store.avatar" mail="willness@outlook.fr" :size="170" />
      <!-- nav links -->
      <v-list-item v-for="link in store.links" :key="link.label">
        <AppTag
          class="d-flex justify-left"
          :icon="link.icon"
          :href="link.href"
          :on-click="router.push"
          >{{ link.label }}</AppTag
        >
      </v-list-item>
    </v-list>
  </AppDrawer>
</template>

<script setup lang="ts">
import AppDrawer from "@/components/AppDrawer.vue";
import AppAvatar from "@/components/AppAvatar.vue";
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
