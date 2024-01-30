<template>
  <article>
    <v-container grid-list-xs fluid class="pa-0">
      <!-- title row -->
      <v-row>
        <v-col>
          <!-- animated title -->
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            id="title-projects"
            tag="h1"
            :text="title"
            class="text-center text-lg-left"
            style="position: fixed"
          />
        </v-col>
      </v-row>

      <!-- projects row -->
      <v-row
        v-for="item in data"
        :key="(item as GitData).name"
        class="justify-center"
      >
        <v-col class="d-flex justify-centers" cols="12" md="7">
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
}
//#endregion

//#region hooks
onMounted(() => {
  getData();
});
//#endregion
</script>
