<template>
  <v-card-title :id="props.id" :tag="props.tag">{{ props.text }}</v-card-title>
</template>

<script setup lang="ts">
import * as dynamics from "dynamics.js";
import { onMounted } from "vue";

//#region props
interface Props {
  id: string;
  tag: string;
  text: string;
  friction?: number;
  duration?: number;
  delay?: number;
  disabled?: boolean;
  complete?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  friction: 200,
  duration: 1000,
  delay: 800,
  disabled: false,
});
//#endregion

//#region animation functions
function bump(element: HtmlItem, complete: () => void = () => {}): void {
  const init = { scale: 0 };
  const grow = { scale: 1 };

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, grow, {
    type: dynamics.spring,
    friction: props.friction,
    duration: props.duration,
    delay: props.delay,
    complete: () => complete(),
  });
}
//#endregion

//#region hooks
onMounted(() => {
  if (!props.disabled) {
    const element: HtmlItem = document.getElementById(props.id);
    bump(element, props.complete);
  }
});
//#endregion
</script>
