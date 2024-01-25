<template>
  <v-sheet v-bind="sheetBindings">
    <div id="container">
      <v-img
        id="image"
        :src="props.imageAppear"
        v-bind="imgBindings"
        style="position: relative; opacity: 0"
      ></v-img>
      <v-img
        id="spinner"
        :src="props.imageSpinner"
        v-bind="imgBindings"
        style="position: absolute; opacity: 1"
      ></v-img>
      <AppGlow
        id="glow"
        :width="300"
        :height="300"
        color="#a399ba"
        :unset-width="false"
        style="position: absolute; top: 18%; left: 23%; opacity: 0"
      />
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

//#region props
interface Props {
  imageSpinner: string;
  imageAppear: string;
}
const props = defineProps<Props>();
//#endregion

//#region bindings
const sheetBindings: Binding = {
  id: "sheet_image-spin",
  style:
    "width: 100%; max-width: 550px;\
    background-color: transparent;\
    position: relative;",
};
const imgBindings: Ref<Binding> = ref({
  style:
    "width: 100%;\
    max-width: 550px; \
    top: 0;\
    border-radius: 15px;",
});
//#endregion
</script>
