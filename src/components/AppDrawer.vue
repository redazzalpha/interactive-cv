<template>
  <v-navigation-drawer
    :location="props.location"
    :disable-resize-watcher="props.disableResizer"
    :model-value="props.modelDrawer"
  >
    <!-- title slot -->
    <slot name="title"></slot>

    <!-- default slot -->
    <slot></slot>

    <!-- text slot -->
    <slot name="text"></slot>

    <!-- links slot -->
    <slot name="links"></slot>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import vuetify from "@/plugins/vuetify";

//#region export interfaces
export type Locations =
  | "left"
  | "end"
  | "start"
  | "top"
  | "bottom"
  | "right"
  | undefined;
//#endregion

//#region props
interface Props {
  location?: Locations;
  disableResizer?: boolean;
  modelDrawer?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  location: "left",
  disableResizer: false,
  modelDrawer: !vuetify.display.mobile.value,
});
//#endregion
</script>
