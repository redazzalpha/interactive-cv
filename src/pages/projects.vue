<template>
  <!-- TODO write error message from github when server is unavailable  and try to redirect to github-->
  <article>
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
    </v-container>
  </article>
</template>

<script setup lang="ts">
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedGit from "@/components/AnimatedGit.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
} from "@/utils/objectBindings";

//#region refs
const data = ref<GitData[] | undefined>();
//#endregion

//#region variables
const title: string = "Mes Projets";
const dataUrl: string =
  "https://api.github.com/users/redazzalpha/repos?sort=updated";
//#endregion

//#region functions
async function getData(): Promise<void> {
  const response: Response = await fetch(dataUrl);
  data.value = await response.json();
}
//#endregion

//#region hooks
onMounted(() => {
  getData();
});
//#endregion
</script>
