<template>
  <article>
    <v-card>
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

        <!-- animated 3d scene -->
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
              @ready="onGLTFReady"
              @finish-action="onGLTFFinish"
              @error="onGLTFError"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
import { AnimationsModel } from "../components/AnimatedGLTF.vue";
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
const model3D = "/3D/computer/computer_screens.glb";

let frameId = 0;
let laptopAnimations: AnimationsModel;
let mixer: THREE.AnimationMixer;
let isOpen = true;
let isClose = false;
//#endregioin

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
