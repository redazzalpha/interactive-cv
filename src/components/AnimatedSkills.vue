<template>
  <v-img
    :id="props.id"
    :src="props.image"
    max-width="700"
    class="animated-skills-img"
  ></v-img>
</template>

<script setup lang="ts">
import * as dynamics from "dynamics.js";
import { onMounted } from "vue";

//#region props
interface Props {
  id: string;
  disabled?: boolean;
  image: string;
  animateScrollLimit?: number;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  animateScrollLimit: 0,
});
//#endregion

//#region variables
let scrolling: boolean = true;
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= props.animateScrollLimit) {
    sideways();
    scrolling = false;
  }
}
//#endregion

//#region animation functions
// low level animation
function move(element: HtmlItem): void {
  const init = { opacity: 0, translateX: 300 };
  const type = dynamics.spring;
  const duration = 1000;
  const delay = 1500;
  const animation = { opacity: 1, translateX: 0, rotateX: 360 };

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, animation, { type, duration, delay });
}

// top level animamtion
function sideways(): void {
  if (!props.disabled) {
    const skills: HtmlItem = document.getElementById(props.id);
    if (skills != null) move(skills);
  }
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);
});
//#endregion
</script>

<style lang="scss" scoped>
.animated-skills-img {
  opacity: 0;
}
</style>
