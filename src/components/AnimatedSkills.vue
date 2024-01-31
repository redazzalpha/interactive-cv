<template>
  <v-img
    id="skills"
    :src="props.image"
    max-width="700"
    style="opacity: 0"
  ></v-img>
</template>

<script setup lang="ts">
import * as dynamics from "dynamics.js";
import { onMounted } from "vue";

//#region variables
let scrolling: boolean = true;
//#endregion

//#region props
interface Props {
  image: string;
}
const props = defineProps<Props>();
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= 720) {
    scrolling = false;
    const skills: HtmlItem = document.getElementById("skills");
    sideways(skills);
  }
}
//#endregion

//#region animation functions
function sideways(element: HtmlItem): void {
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
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);
});
//#endregion
</script>
