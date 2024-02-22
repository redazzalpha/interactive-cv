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
//#endregion

//#region variables
const title: string = "Mes Projets";
//#endregion

//#region functions
async function getData(): Promise<void> {
  const response: Response = await fetch(store.githubDataUrl);
  data.value = await response.json();
}
//#endregion

//#region hooks
onMounted(() => {
  getData().catch((error) => {
    isError.value = true;
    console.log(`this is error here: ${error}`);
  });
});
//#endregion
</script>
