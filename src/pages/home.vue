<template>
  <article>
    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col>
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

      <!-- 3D model computer -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings">
          <Animated3DModel
            :id="id"
            :model3d="model3D"
            :is-animate="isAnimate"
            ref="modelExposed"
            class="model"
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
            :animate-scroll-limit="scrollLimit + 480"
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
            :animate-scroll-limit="scrollLimit + 480"
            id="home-skills"
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
import { ref, computed } from "vue";
import { useAppStore } from "@/store/app";
import vuetify from "@/plugins/vuetify";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import ImgGlow from "@/assets/glow.png";
import ImgSkills from "@/assets/skills.png";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
} from "@/utils/objectBindings";
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
      return 700;
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
//#endregion

addEventListener("scroll", () => console.log(scrollY));

//#region refs
const isAnimate = ref<boolean>(true);
//#endregion

//#region variables
const id = "computer-3D";
const model3D = "/3D/laptop.glb";
const title: string = "Concepteur développeur d'applications";
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
