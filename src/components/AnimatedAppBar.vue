<template>
  <v-app-bar
    id="app-bar"
    density="prominent"
    elevation="0"
    class="d-flex justify-center align-center"
  >
    <!-- title -->
    <v-card-title
      class="text-center my-auto"
      v-show="$vuetify.display.mobile"
      >{{ props.title }}</v-card-title
    >

    <!-- links -->
    <v-container grid-list-xs fluid class="ma-auto">
      <v-row>
        <v-col
          class="d-flex justify-left align-center pa-0"
          v-for="link in links"
          :key="link.label"
        >
          <AppTag
            v-show="!$vuetify.display.mobile"
            :size-chevron="40"
            :size-slash="30"
            :href="link.href"
            :icon="link.icon"
            :on-click="router.push"
            class="flex-shrink-0"
          >
            {{ link.label }}
          </AppTag>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>

    <!-- nav icon -->
    <v-app-bar-nav-icon
      class="align-self-center"
      v-show="$vuetify.display.mobile"
      @click="clickNavIcon"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import AppTag from "@/components/AppTag.vue";
import router from "@/router";
import { onMounted } from "vue";
import * as dynamics from "dynamics.js";

//#region props
interface Props {
  title?: string;
  links?: Link[] | undefined;
  clickNavIcon: () => void | undefined;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  links: undefined,
  onclick: undefined,
});
//#endregion

//#region animation functions
function updown(element: HtmlItem): void {
  const init = { translateY: -100 };
  const translation = { translateY: 0 };
  const type = dynamics.spring;
  const frequency = 200;
  const friction = 200;
  const duration = 500;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, translation, {
    type,
    frequency,
    friction,
    duration,
  });
}
//#endregion

//#region hooks
onMounted(() => {
  const appbar: HtmlItem = document.getElementById("app-bar");
  updown(appbar);
});
//#endregion
</script>
