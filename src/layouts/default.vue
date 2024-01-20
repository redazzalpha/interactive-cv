<template>
  <DefaultDrawer v-bind="defaultBindings" />
  <DefaultAppBar v-bind="defaultBindings" />
  <DefaultView v-bind="defaultBindings" />
  <DefaultFooter v-bind="defaultBindings" />
</template>

<script lang="ts" setup>
import DefaultAppBar from "@/layouts/default/AppBar.vue";
import DefaultView from "@/layouts/default/View.vue";
import DefaultFooter from "@/layouts/default/Footer.vue";
import DefaultDrawer from "@/layouts/default/Drawer.vue";

//#region bindings
const defaultBindings = {
  style: "background-color: #121212; color: white",
};
//#endregion
</script>
