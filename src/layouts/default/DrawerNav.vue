<template>
  <AppDrawer location="right" :disable-resizer="true" v-model="store.drawer">
    <v-list>
      <!-- avatar  -->
      <AnimatedAvatar
        :image="store.avatar"
        :size="170"
        id="avatar-nav"
        mail="willness@outlook.fr"
      />
      <!-- nav links -->
      <v-list-item v-for="link in store.links" :key="link.label">
        <AppTag
          :icon="link.icon"
          :href="link.href"
          :on-click="router.push"
          class="d-flex justify-left"
          >{{ link.label }}</AppTag
        >
      </v-list-item>
    </v-list>
  </AppDrawer>
</template>

<script setup lang="ts">
import AppDrawer from "@/components/AppDrawer.vue";
import AnimatedAvatar from "@/components/AnimatedAvatar.vue";
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
