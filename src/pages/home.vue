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
          <AppAvatar
            id="avatar-mobile"
            :image="store.avatar"
            :size="170"
            mail="willness@outlook.fr"
            v-show="$vuetify.display.mobile"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="titleMargin">
        <v-col>
          <AnimatedTheCodeLines />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMargin">
        <!-- image spin -->
        <v-col class="d-flex justify-center align-center pa-lg-12">
          <AnimatedImageSpin
            :image-spinner="ImgSpinner"
            :image-appear="ImgGiphy"
            :image-glow="ImgGlow"
          />
        </v-col>

        <!-- skills -->
        <v-col v-bind="colBindings">
          <AnimatedSkills :image="ImgSkills" />
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
import AppAvatar from "@/components/AppAvatar.vue";
import { computed } from "vue";
import { useAppStore } from "@/store/app";
import vuetify from "@/plugins/vuetify";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import ImgGlow from "@/assets/glow.png";
import ImgSkills from "@/assets/skills.png";
const store = useAppStore();

//#region variables
const title: string = "Concepteur développeur d'applications";
//#endregion

//#region computed
const titleMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 100}px 0px`;
});
const rowMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 300}px 0px`;
});
//#endregion

//#region bindings
const colBindings: Binding = {
  class: "d-flex justify-center align-center",
  cols: "12",
  sm: "7",
};
//#endregion
</script>
