<template>
  <article>
    <v-container grid-list-xs fluid class="pa-0">
      <!-- title row -->
      <v-row :style="rowMargin" style="margin: 0">
        <v-col>
          <h1 id="title" class="text-center text-lg-left">
            Concepteur développeur d'applications
          </h1>

          <!-- avatar mobile -->
          <AppAvatar
            :image="store.avatar"
            :size="170"
            mail="willness@outlook.fr"
            v-show="$vuetify.display.mobile"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="titleMargin">
        <v-col>
          <TheCodeLines />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMargin">
        <!-- image spin -->
        <v-col class="d-flex justify-center align-center pa-lg-12">
          <ImageSpin
            :image-spinner="ImgSpinner"
            :image-appear="ImgGiphy"
            :image-glow="ImgGlow"
          />
        </v-col>

        <!-- skills -->
        <v-col v-bind="colBindings">
          <v-img
            id="skills"
            src="@/assets/skills.png"
            max-width="700"
            style="opacity: 0"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import vuetify from "@/plugins/vuetify";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import ImgGlow from "@/assets/glow.png";
import * as dynamics from "dynamics.js";
const store = useAppStore();

//#region variables
let scrolling: boolean = true;
//#endregion

//#region computed
const titleMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 100}px 0px`;
});
const rowMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 300}px 0px`;
});
//#endregion

//#region bindings
const colBindings: Binding = {
  class: "d-flex justify-center align-center",
  cols: "12",
  sm: "7",
};
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= 720) {
    scrolling = false;
    const skills: HtmlItem = document.getElementById("skills");
    foo(skills);
  }
}

//#endregion

//#region animation functions
// low level animations
function bump(
  element: HtmlItem,
  friction: number = 200,
  delay: number = 800,
  complete: () => void = () => {}
): void {
  const init = { scale: 0 };
  const grow = { scale: 1 };
  const type = dynamics.spring;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, grow, {
    type,
    friction,
    delay,
    complete: () => complete(),
  });
}
function foo(element: HtmlItem): void {
  const init = { opacity: 0, translateX: 300 };
  const type = dynamics.spring;
  const duration = 1000;
  const delay = 1500;
  const animation = { opacity: 1, translateX: 0 };

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, animation, { type, duration, delay });
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);

  const title: HtmlItem = document.getElementById("title");
  bump(title);
});
//#endregion
</script>
