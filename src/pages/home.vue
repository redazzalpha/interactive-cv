<template>
  <article>
    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col class="pa-0">
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            v-bind="animatedTitleBindings"
            :text="title"
            id="title-home"
            tag="h1"
          />

          <!-- avatar mobile -->
          <AnimatedAvatar
            v-show="$vuetify.display.mobile"
            :image="store.avatar"
            :size="170"
            id="avatar-mobile"
            mail="willness@outlook.fr"
          />
        </v-col>
      </v-row>

      <!-- laptop 3D model -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings" class="pa-0">
          <v-card-actions v-show="showActions" :style="computedActionStyle">
            <v-btn
              variant="outlined"
              class="text-lowercase px-8"
              rounded="xl"
              @click="laptopClose"
              >close</v-btn
            >
            <v-btn
              variant="outlined"
              class="text-lowercase px-8"
              rounded="xl"
              @click="laptopOpen"
              >open</v-btn
            >
          </v-card-actions>

          <AnimatedGLTF
            :id="id"
            :gltf="model3D"
            :env-image-path="envImagePath"
            @ready="onGLTFReady"
            @finish-action="onGLTFFinish"
            @error="onGLTFError"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="codelinesMarginStyle">
        <v-col>
          <AnimatedTheCodeLines
            :animate-scroll-limit="scrollLimit"
            id-sheet="home-codelines-sheet"
            class="codelines"
            class-code="home-code-element"
          />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMarginStyle">
        <!-- image spin -->
        <v-col class="d-flex justify-center align-center pa-lg-12">
          <AnimatedImageSpin
            :image-spinner="ImgSpinner"
            :image-appear="ImgGiphy"
            :image-glow="ImgGlow"
            :animate-scroll-limit="scrollLimit + 780"
            id-sheet="home-image-spin-sheet"
            id-spinner="home-image-spin-spinner"
            id-image="home-image-spin-image"
            id-container="home-image-spin-container"
            id-glow="home-image-spin-glow"
          />
        </v-col>

        <!-- skills -->
        <v-col v-bind="colBindings" class="align-center" cols="12" sm="7">
          <AnimatedSkills
            :image="ImgSkills"
            :animate-scroll-limit="scrollLimit + 780"
            id="home-skills"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedTheCodeLines from "@/components/AnimatedTheCodeLines.vue";
import AnimatedImageSpin from "@/components/AnimatedImageSpin.vue";
import AnimatedSkills from "@/components/AnimatedSkills.vue";
import AnimatedAvatar from "@/components/AnimatedAvatar.vue";
import { useAppStore } from "@/store/app";
import vuetify from "@/plugins/vuetify";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import ImgGlow from "@/assets/glow.png";
import ImgSkills from "@/assets/skills.png";
import AnimatedGLTF, { AnimationsModel } from "../components/AnimatedGLTF.vue";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
} from "@/utils/objectBindings";
import {} from "vue";
const store = useAppStore();

//#region computed
const codelinesMarginStyle = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 100}px 0px`;
});
const rowMarginStyle = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 300}px 0px`;
});
const scrollLimit = computed<number>(() => {
  switch (vuetify.display.name.value) {
    case "xs":
      return 300;
    case "sm":
      return 720;
    case "md":
      return 720;
    case "lg":
      return 600;
    case "xl":
      return 480;
    case "xxl":
      return 600;
    default:
      return 500;
  }
});
const computedActionStyle = computed<string>(() => {
  let leftValue: number = 0;

  switch (vuetify.display.name.value) {
    case "xs":
      leftValue = 0;
      break;
    case "sm":
      leftValue = 0;
      break;
    case "md":
      leftValue = 0;
      break;
    case "lg":
      leftValue = 350;
      break;
    case "xl":
      leftValue = 350;
      break;
    case "xxl":
      leftValue = 0;
      break;
    default:
      leftValue = 0;
      break;
  }

  return `position: absolute; left: ${leftValue}px`;
});
//#endregion

//#region refs
const showActions = ref<boolean>(false);
//#endregion

//#region variables
const title: string = "Concepteur développeur d'applications";
const id = "home-laptop-3D";
const model3D = "/3D/models/laptop/laptop.glb";
const envImagePath = "3D/images/environnement/home.png";

let frameId = 0;
let laptopAnimations: AnimationsModel;
let mixer: THREE.AnimationMixer;
let isOpen = true;
let isClose = false;
//#endregion

//#region animation functions
function laptopEntrance(): void {
  laptopAnimations.animations["entrance"].play();
}
function laptopOpen(): void {
  if (!isRunning() && isClose) {
    animate();
    setTimeout(() => {
      laptopAnimations.stopAll();
      laptopAnimations.animations["open"].play();
      isOpen = true;
      isClose = false;
    }, 1);
  }
}
function laptopClose(): void {
  if (!isRunning() && isOpen) {
    animate();
    setTimeout(() => {
      laptopAnimations.stopAll();
      laptopAnimations.animations["close"].play();
      isOpen = false;
      isClose = true;
    }, 1);
  }
}
function animate(): void {
  frameId = requestAnimationFrame(animate);
  laptopAnimations.update();
  console.log(`animated here mixer time: ${mixer.time}`);
}
function isRunning(): boolean {
  for (const [key] of Object.entries(laptopAnimations.animations))
    if (laptopAnimations.animations[key].isRunning()) return true;
  return false;
}
//#endregion

//#region event handlers
function onGLTFReady(animations: AnimationsModel): void {
  laptopAnimations = animations;
  mixer = laptopAnimations.animations["entrance"].getMixer();
  laptopEntrance();
  frameId = requestAnimationFrame(animate);
}
function onGLTFFinish(action: string): void {
  cancelAnimationFrame(frameId);
  if (action == "entrance") showActions.value = true;
  // mixer.setTime(0);
}
function onGLTFError(): void {}
//#endregion

//#region hooks
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
//#endregion
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap");
.codelines {
  font-family: "Kode Mono", monospace;
  font-weight: 400;
  transform: scale(0);
}
</style>
