<template>
  <v-sheet v-bind="sheetBindings">
    <!-- container -->
    <div id="container">
      <!-- image appear -->
      <v-img
        id="image"
        :src="props.imageAppear"
        style="border-radius: 15px; opacity: 0"
      ></v-img>

      <!-- image spinner -->
      <v-img
        id="spinner"
        :src="props.imageSpinner"
        v-bind="imgBindings"
        style="opacity: 1"
      ></v-img>

      <!-- image glow -->
      <v-img
        id="glow"
        :src="props.imageGlow"
        v-bind="imgBindings"
        style="opacity: 0"
      ></v-img>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

//#region props
interface Props {
  imageSpinner: string;
  imageAppear: string;
  imageGlow: string;
}
const props = defineProps<Props>();
//#endregion

//#region bindings
const sheetBindings: Binding = {
  id: "sheet_image-spin",
  style:
    "width: 100%;\
    background-color: transparent;\
    position: relative;",
};
const imgBindings: Ref<Binding> = ref({
  style:
    "width: 100%;\
    border-radius: 15px;\
    position: absolute;\
    top: 0;\
    left: 0; ",
});
//#endregion
</script>
