<template>
  <v-navigation-drawer
    :location="props.location"
    :disable-resize-watcher="props.disableResizer"
    :model-value="props.modelDrawer"
  >
    <slot></slot>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
//#region props
interface Props {
  location?: Locations;
  disableResizer?: boolean;
  modelDrawer?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  location: "left",
  disableResizer: false,
  modelDrawer: false,
});
//#endregion
</script>
