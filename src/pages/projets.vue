<template>
  <article>
    <v-container grid-list-xs class="pa-0">
      <v-row>
        <v-col>
          <h1>Page Projets in construction</h1>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

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
</script>
