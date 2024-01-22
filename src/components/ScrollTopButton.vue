<template>
  <v-btn
    tag="button"
    class="scroll-top-btn text-white d-flex justify-center text-h3"
    :style="position"
    size="x-large"
    icon="mdi-chevron-up"
    :color="props.color"
    v-scroll="onScroll"
    @click="props.onClick"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { ref } from "vue";

//#region interfaces
interface Position {
  bottom: string;
  right: string;
}
//#endregion

//#region variables
const scrollOffset = 400;
const bottom = 10;
const rightIn = 10;
const rightOut = -300;
const transitionTime = 0.3;
//#endregion

//#region refs
const position = ref<Position>({
  bottom: `${bottom}px`,
  right: `${rightOut}px`,
});
//#endregion

//#region props
interface Props {
  icon?: string;
  background?: string;
  color?: string;
  onClick?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  icon: "mdi-chevron",
  background: "",
  color: "",
  onClick: () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  },
});
//#endregion

//#region event handlers
async function onScroll(): Promise<void> {
  if (window.scrollY >= scrollOffset) position.value.right = `${rightIn}px`;
  else position.value.right = `${rightOut}px`;
}
//#endregion
</script>

<style lang="scss" scoped>
.scroll-top-btn {
  position: fixed;
  background: v-bind("props.background");
  transition: right v-bind("`${transitionTime}s`") linear;
}
</style>
