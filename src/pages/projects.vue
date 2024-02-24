<template>
  <article style="min-height: 1000px">
    <div class="div" ref="div">
      <Animated3DModel
        :id="id"
        :model3d="model3D"
        :animation-index="animationIndex"
        :is-animate="isAnimate"
        :show-action="false"
        ref="modelExposed"
        class="model"
        style="position: fixed"
      />
    </div>

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
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedGit from "@/components/AnimatedGit.vue";
import Animated3DModel from "@/components/Animated3DModel.vue";
import { ref } from "vue";
import { onMounted } from "vue";
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
const animationIndex = ref<number>(1);
const isAnimate = ref<boolean>(true);
const div = ref(null);
//#endregion

//#region variables
const title: string = "Quelques projets";
const id = "moon-3D";
const model3D = "/3D/moon.glb";

//#endregion

//#region functions
async function getData(): Promise<void> {
  const response: Response = await fetch(store.githubDataUrl);
  data.value = await response.json();
  if (!response.ok) isError.value = true;
}
//#endregion

//#region hooks
onMounted(() => {
  setTimeout(() => {
    if (div.value) (div.value as HTMLElement).style.opacity = "1";
  }, 1500);
  getData().catch(() => (isError.value = true));
});
//#endregion
</script>

<style lang="scss" scoped>
.div {
  opacity: 0;
  transition: opacity 1s ease-in;
}
</style>
