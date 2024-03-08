<template>
  <article style="min-height: 1000px">
    <AnimatedGLTF id="test-model" gltf="/3D/gold/gold.glb" />
    <!-- Animated moon -->
    <AnimatedGLTF
      :id="id"
      :gltf="model3D"
      @ready="onGLTFReady"
      @finish-action="onGLTFFinish"
      @error="onGLTFError"
      class="projects-moon"
    />

    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col>
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            v-bind="animatedTitleBindings"
            :text="title"
            id="title-projects"
            tag="h1"
            style="position: fixed"
          />
        </v-col>
      </v-row>

      <!-- projects row -->
      <template v-if="!isError">
        <v-row
          v-for="(item, index) in data"
          :key="(item as GitData).name"
          v-bind="rowBindings"
        >
          <v-col v-bind="colBindings">
            <AnimatedGit
              :id-wrapper="`projects-git-wrapper-${index}`"
              :id="`projects-git-${index}`"
              :data="item"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row style="height: 50vh">
          <v-col class="d-flex flex-column justify-center align-center">
            <p>Sorry an error has happend on github server.</p>
            <p>
              Try to visit github homepage
              <v-btn
                :href="store.githubHomepage"
                variant="plain"
                color="blue"
                icon="mdi-github"
                size="large"
                :ripple="false"
                style="font-size: 30px"
              ></v-btn>
            </p>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedGit from "@/components/AnimatedGit.vue";
import AnimatedGLTF, { AnimationsModel } from "../components/AnimatedGLTF.vue";
import { useAppStore } from "../store/app";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
} from "@/utils/objectBindings";
const store = useAppStore();

//#region refs
const data = ref<GitData[] | undefined>();
const isError = ref<boolean>(false);
//#endregion

//#region variables
const title: string = "Quelques projets";
const id = "projects-moon-3D";
const model3D = "/3D/moon/moon.glb";

let frameId = 0;
let moonAnimations: AnimationsModel;
//#endregion

//#region functions
async function getData(): Promise<void> {
  const response: Response = await fetch(store.githubDataUrl);
  data.value = await response.json();
  if (!response.ok) isError.value = true;
}
//#endregion

//#region animation functions
function animate(): void {
  frameId = requestAnimationFrame(animate);
  moonAnimations.update();
}
//#endregion

//#region event handlers
function onGLTFReady(animations: AnimationsModel): void {
  moonAnimations = animations;
  const animationSpin = moonAnimations.animations["spin"];
  animationSpin.clampWhenFinished = false;
  animationSpin.repetitions = Infinity;

  moonAnimations.animations["spin"].play();
  frameId = requestAnimationFrame(animate);
}
function onGLTFFinish(): void {
  cancelAnimationFrame(frameId);
}
function onGLTFError(): void {}
//#endregion

//#region hooks
onMounted(() => {
  setTimeout(() => {
    document.getElementById(id)!.style.opacity = "1";
  }, 1500);
  getData().catch(() => (isError.value = true));
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});

//#endregion
</script>

<style lang="scss" scoped>
.projects-moon {
  position: fixed;
  opacity: 0;
  transition: opacity 1s ease-in;
}
</style>
