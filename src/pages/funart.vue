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
import { onBeforeUnmount } from "vue";
import AnimatedGLTF, { AnimationsModel } from "../components/AnimatedGLTF.vue";

//#region variables
const title: string = "Fun art";
const id = "fun-art-3D";
const model3D = "/3D/models/universe/universe.glb";
const envImagePath = "3D/images/environnement/light.png";

let frameId = 0;
let universeAnimations: AnimationsModel;
let mixer: THREE.AnimationMixer;
//#endregion

//#region animation functions
function universeEntrance(): void {
  universeAnimations.animations["entrance"].play();
}
function animate(): void {
  frameId = requestAnimationFrame(animate);
  universeAnimations.update();
  console.log(`animated here mixer time: ${mixer.time}`);
}
//#endregion

//#region event handlers
function onGLTFReady(animations: AnimationsModel): void {
  universeAnimations = animations;
  mixer = universeAnimations.animations["entrance"].getMixer();
  universeEntrance();
  frameId = requestAnimationFrame(animate);
}
function onGLTFFinish(action: string): void {
  cancelAnimationFrame(frameId);
  // example on gltf finish actions
  if (action == "entrance") {
    // code here
  }
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
