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
            id="fun-art"
            tag="h1"
            style="position: fixed"
          />
        </v-col>
      </v-row>

      <!-- universe 3D model -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings" class="pa-0">
          <AnimatedGLTF
            :id="id"
            :gltf="model3D"
            :env-image-path="envImagePath"
            :height="900"
            @ready="onGLTFReady"
            @finish-action="onGLTFFinish"
            @error="onGLTFError"
          />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedGLTF, { AnimationsModel } from "../components/AnimatedGLTF.vue";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
} from "@/utils/objectBindings";
import {} from "vue";

//#region variables
const title: string = "Fun art";
const id = "fun-art-universe";
const model3D = "/3D/models/universe/universe.glb";
const envImagePath = "3D/images/environment/light.png";

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
