<template>
  <article style="min-height: 1000px">
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

      <p class="pa-5 pt-12">
        Sur cette page vous trouverez quelques projets,<br />
        conçus et développés seul à titre d'exempes.
      </p>

      <!-- projects row -->
      <template v-if="!isError">
        <v-row
          tag="article"
          v-for="(item, index) in data"
          :key="(item as GitData).name"
          v-bind="rowBindings"
        >
          <v-col v-bind="colBindings">
            <AnimatedGit
              :id-wrapper="`projects-git-wrapper-${index}`"
              :id="`projects-git-${index}`"
              :data="item"
              title-tag="h2"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row style="height: 50vh">
          <v-col class="d-flex flex-column justify-center align-center">
            <p>Une erreur s'est produite sur le serveur de github.</p>
            <p>Veuillez réessayer plus tard.</p>
            <p>
              Cliquez
              <v-btn
                :href="store.githubHomepage"
                variant="plain"
                color="blue"
                icon="mdi-github"
                size="large"
                :ripple="false"
                style="font-size: 30px"
              ></v-btn>
              pour accéder à mon github.
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
import type { AnimationsModel } from "../components/AnimatedGLTF.vue";
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
