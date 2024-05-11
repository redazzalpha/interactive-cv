<template>
  <article>
    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col>
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            id="title-about"
            tag="h1"
            :text="title"
            v-bind="animatedTitleBindings"
            style="position: fixed"
          />
        </v-col>
      </v-row>

      <!-- computer 3D model -->
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
            :height="900"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts" setup>
import {
  animatedTitleBindings,
  colBindings,
  containerBindings,
  rowBindings,
} from "@/utils/objectBindings";
import { ref, computed, onBeforeUnmount } from "vue";
import AnimatedGLTF, { AnimationsModel } from "../components/AnimatedGLTF.vue";
import vuetify from "@/plugins/vuetify";

// #region computed
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
// #endregion

//#region refs
const showActions = ref<boolean>(false);
//#endregion

//#region variables
const title: string = "Fun art";
const id = "fun-art-computer-3D";
const model3D = "/3D/models/universe/universe.glb";
const envImagePath = "3D/images/environnement/light.png";

let frameId = 0;
let computerAnimations: AnimationsModel;
let mixer: THREE.AnimationMixer;
let isOpen = true;
let isClose = false;
//#endregion

//#region animation functions
function computerEntrance(): void {
  computerAnimations.animations["entrance"].play();
}
function laptopOpen(): void {
  if (!isRunning() && isClose) {
    animate();
    setTimeout(() => {
      computerAnimations.stopAll();
      computerAnimations.animations["open"].play();
      isOpen = true;
      isClose = false;
    }, 1);
  }
}
function laptopClose(): void {
  if (!isRunning() && isOpen) {
    animate();
    setTimeout(() => {
      computerAnimations.stopAll();
      computerAnimations.animations["close"].play();
      isOpen = false;
      isClose = true;
    }, 1);
  }
}
function animate(): void {
  frameId = requestAnimationFrame(animate);
  computerAnimations.update();
  console.log(`animated here mixer time: ${mixer.time}`);
}
function isRunning(): boolean {
  for (const [key] of Object.entries(computerAnimations.animations))
    if (computerAnimations.animations[key].isRunning()) return true;
  return false;
}
//#endregion

//#region event handlers
function onGLTFReady(animations: AnimationsModel): void {
  computerAnimations = animations;
  mixer = computerAnimations.animations["entrance"].getMixer();
  computerEntrance();
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
