<template>
  <AnimatedAppBar
    id="header-bar-app-bar"
    :title="store.appbarTitle"
    :click-nav-icon="clickNavIcon"
    :links="store.links"
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
