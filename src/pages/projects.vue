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
    </v-container>
  </article>
</template>

<script setup lang="ts">
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import { onMounted } from "vue";

//#region variables
const title: string = "Mes Projets";
//#endregion

//#region hooks
onMounted(() => {
  fetch("https://api.github.com/users/redazzalpha/repos?sort=updated").then(
    (response) => {
      response.json().then((result) => {
        console.log(result);
      });
    },
    () => {
      console.log("error");
    }
  );
});
//#endregion
</script>
