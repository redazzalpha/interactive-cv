<template>
  <article>
    <v-container grid-list-xs fluid class="pa-0">
      <!-- title row -->
      <v-row :style="rowMargin" style="margin: 0">
        <v-col>
          <!-- animated title -->
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            id="title-home"
            tag="h1"
            :text="title"
            class="text-center text-lg-left"
          />

          <!-- avatar mobile -->
          <AnimatedAvatar
            id="avatar-mobile"
            :image="store.avatar"
            :size="170"
            mail="willness@outlook.fr"
            v-show="$vuetify.display.mobile"
          />
        </v-col>
      </v-row>

      <!-- 3D model computer -->
      <v-row>
        <v-col :style="`height: ${modelHeight}px;`">
          <Animated3DModel
            ref="modelExposed"
            :id="id"
            class="model"
            :model3d="model3D"
            :is-animate="isAnimate"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="titleMargin">
        <v-col>
          <AnimatedTheCodeLines
            class="codelines"
            id-sheet="home-codelines-sheet"
            class-code="home-code-element"
            :scroll-limit="modelHeight - 200"
          />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMargin">
        <!-- image spin -->
        <v-col class="d-flex justify-center align-center pa-lg-12">
          <AnimatedImageSpin
            id-sheet="home-image-spin-sheet"
            id-spinner="home-image-spin-spinner"
            id-image="home-image-spin-image"
            id-container="home-image-spin-container"
            id-glow="home-image-spin-glow"
            :image-spinner="ImgSpinner"
            :image-appear="ImgGiphy"
            :image-glow="ImgGlow"
            :animate-scroll-limite="scrollLimit"
          />
        </v-col>

        <!-- skills -->
        <v-col v-bind="colBindings">
          <AnimatedSkills
            id="home-skills"
            :image="ImgSkills"
            :animate-scroll-limit="scrollLimit"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedTheCodeLines from "@/components/AnimatedTheCodeLines.vue";
import AnimatedImageSpin from "@/components/AnimatedImageSpin.vue";
import AnimatedSkills from "@/components/AnimatedSkills.vue";
import AnimatedAvatar from "@/components/AnimatedAvatar.vue";
import Animated3DModel from "@/components/Animated3DModel.vue";
import type { Model3DExposed } from "@/components/Animated3DModel.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAppStore } from "@/store/app";
import vuetify from "@/plugins/vuetify";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import ImgGlow from "@/assets/glow.png";
import ImgSkills from "@/assets/skills.png";
import { Object3D, Object3DEventMap } from "three";
import * as dynamics from "dynamics.js";
import {} from "vue";
const store = useAppStore();

//#region computed
const titleMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 100}px 0px`;
});
const rowMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 300}px 0px`;
});
//#endregion

//#region refs
const modelExposed = ref<null | Model3DExposed>(null);
const isAnimate = ref<boolean>(true);
//#endregion

//#region variables
const id = "computer-3D";
const model3D = "/3D/laptop.glb";
const title: string = "Concepteur développeur d'applications";
const modelHeight = 600;
const offset = 600;
const scrollOffset = modelHeight - modelHeight / 2 - 200;
const scrollLimit = modelHeight + offset;
const timeout = 1500;
let scrollingDown = false;
let scrollingUp = false;
let frameId = 0;
let scrollBase = 0;
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
  if (scrollingDown && scrollDirection() == "down" && scrollY >= scrollOffset) {
    spin(() => {
      scrollingDown = false;
      scrollingUp = true;
    });
  }
  if (scrollingUp && scrollDirection() == "up" && scrollY < scrollOffset) {
    spin(() => {
      scrollingUp = false;
      scrollingDown = true;
    });
  }
}
//#endregion

//#region functions
function scrollDirection(): ScrollDir {
  let current = scrollBase;
  let dir: ScrollDir;

  if (scrollY > current) {
    dir = "down";
  } else dir = "up";
  scrollBase = scrollY;
  return dir;
}
//#endregion

//#region animate functions
// low level animation
// dynamics.js animations
function place(element: HtmlItem): void {
  const init = { top: -600, left: 1000, opacity: 0 };
  const move = { top: -150, left: 0, opacity: 1 };
  const type = dynamics.linear;
  const duration = 1000;
  const delay = 0;
  const friction = 1000;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, move, { type, friction, delay, duration });
}

// treejs animations
function spin(callback?: () => void | undefined): void {
  if (callback) callback();
  cancelAnimationFrame(frameId);
  modelExposed.value?.animate();
  setTimeout(() => {
    modelExposed.value?.stopAnimate();
  }, timeout);
}
function standFront(): void {
  if (modelExposed.value!.model3D.scene.rotation.y < 6.386)
    modelExposed.value!.model3D.scene.rotation.y += 0.1;
  else {
    cancelAnimationFrame(frameId);
    modelExposed.value?.animate();
    setTimeout(() => {
      modelExposed.value?.stopAnimate();
      scrollingDown = true;
    }, 1500);
  }
}
function circling(): void {
  frameId = requestAnimationFrame(circling);
  standFront();
  render();
}
function render(): void {
  modelExposed.value?.renderer.render(
    modelExposed.value?.scene as Object3D<Object3DEventMap>,
    modelExposed.value?.camera as THREE.Camera
  );
}

// top level animation
function moonwalk(): void {
  const model: HtmlItem = document.getElementById(id);
  cancelAnimationFrame(frameId);
  circling();
  place(model);
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);

  setTimeout(() => {
    moonwalk();
  }, 1000);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
//#endregion
</script>

<style lang="scss" scoped>
.model {
  position: relative;
  left: 0px;
  opacity: 0;
  left: 1000px;
  opacity: 0;
}
.codelines {
  transform: scale(0);
}
</style>
