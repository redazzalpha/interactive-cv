<template>
  <article>
    <v-container grid-list-xs fluid class="pa-0">
      <v-row>
        <v-col>
          <!-- animated title -->
          <AnimatedTitle
            id="title-projects"
            tag="h1"
            :text="title"
            class="text-center text-lg-left"
          />
        </v-col>
      </v-row>
      <v-row v-for="item in data" :key="(item as GitData).name">
        <v-col>
          <AppGit :data="item" />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AppGit from "@/components/AppGit.vue";
import { ref } from "vue";
import { onMounted } from "vue";

//#region variables
const title: string = "Mes Projets";
const dataUrl: string =
  "https://api.github.com/users/redazzalpha/repos?sort=updated";
//#endregion

//#region refs
const data = ref<GitData[] | undefined>();
//#endregion

//#region functions
async function getData(): Promise<void> {
  const response: Response = await fetch(dataUrl);
  data.value = await response.json();
  console.log();
}
//#endregion

//#region hooks
onMounted(() => {
  getData();
});
//#endregion
</script>
