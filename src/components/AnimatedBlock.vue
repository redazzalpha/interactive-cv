<template>
  <v-sheet :id="props.id" style="transform: scale(0)">
    <slot name="content"></slot>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as dynamics from "dynamics.js";

//#region props
interface Props {
  id: string;
  scrollLimit?: number;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  scrollLimit: 0,
});
//#endregion

//#region variables
let isScrolling: boolean = true;
//#endregion

//#region event handlers
function onScroll(): void {
  if (isScrolling && scrollY >= props.scrollLimit) {
    bounce();
    isScrolling = false;
  }
}
//#endregion

//#region animtion functions
// low level animation
function appear(element: HtmlItem): void {
  const init = { scale: 0 };
  const downappear = { scale: 1 };
  const type = dynamics.gravity;
  const duration = 1500;
  const bounciness = 400;
  const elasticity = 200;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, downappear, {
    type,
    bounciness,
    elasticity,
    duration,
  });
}

// top level animation
function bounce(): void {
  if (!props.disabled) {
    const block: HtmlItem = document.getElementById(props.id);
    const ready: boolean = block != null;
    if (ready) {
      appear(block);
    }
  }
}
//#endregion

//#region hooks
onMounted(() => {
  if (props.scrollLimit == 0) bounce();
  else addEventListener("scroll", onScroll);
});
//#endregion
</script>
