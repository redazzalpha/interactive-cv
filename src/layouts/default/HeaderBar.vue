<template>
  <AnimatedAppBar
    :title="store.appbarTitle"
    :links="store.links"
    :click-nav-icon="clickNavIcon"
    id="header-bar-app-bar"
  />
</template>

<script lang="ts" setup>
import AnimatedAppBar from "@/components/AnimatedAppBar.vue";
import { useAppStore } from "@/store/app";
const store = useAppStore();

//#region event handlers
function clickNavIcon(): void {
  store.setDrawer(true);
}
//#endregion
</script>
