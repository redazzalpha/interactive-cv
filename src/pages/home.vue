<template>
  <article>
    <v-container grid-list-xs class="pa-0">
      <!-- title row -->
      <v-row :style="rowMargin" style="margin: 0">
        <v-col>
          <h1 id="title" class="text-center text-lg-left">
            Concepteur développeur d'applications
          </h1>

          <!-- avatar mobile -->
          <AppAvatar
            :image="AvatarImg"
            :size="170"
            mail="willness@outlook.fr"
            v-show="$vuetify.display.mobile"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="titleMargin">
        <v-col>
          <TheCodeLines />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMargin">
        <v-col v-bind="colBindings">
          <ImageSpin />

          <!-- <v-img
            src="@/assets/giphy.gif"
            max-width="550"
            class="rounded-lg"
          ></v-img> -->
        </v-col>
        <v-col v-bind="colBindings">
          <p class="text-h6 text-sm-h5 text-xl-h4">
            C/C++, C#, JAVA, Javascript, TypeScript, HTML5, CSS3, Scss, Kotlin,
            SQL, NoSQL<br />
            Bootstrap, JQuery, VueJs, Vuetify, Flutter, Spring Boot, ADO.net,
            WPF.NET, Xaml, Web ASP.NET MVC, Java JPA-Hibernate, Xamarin,
            ReactJs, React native, NodeJs, git, Script Bash, Modélisation 3D,
            ...<br />
          </p>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import vuetify from "@/plugins/vuetify";
import AvatarImg from "@/assets/wolf.jpg";
import * as dynamics from "dynamics.js";

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
  lg: "6",
};
//#endregion

//#region animation functions
function bounce(element: HtmlItem): void {
  const init = { scale: 0 };
  const grow = { scale: 1 };
  const type = dynamics.spring;
  const delay = 800;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, grow, {
    type,
    delay,
  });
}
//#endregion

//#region hooks
onMounted(() => {
  const title: HtmlItem = document.getElementById("title");
  bounce(title);
});
//#endregion
</script>
