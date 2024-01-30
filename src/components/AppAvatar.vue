<template>
  <v-list>
    <!-- avatar item -->
    <v-list-item v-bind="listItemBindings">
      <a href="mailto:willness@outlook.fr">
        <v-avatar
          :id="props.id"
          :size="props.size"
          :image="props.image"
        ></v-avatar>
      </a>
    </v-list-item>

    <!-- mail item -->
    <v-list-item v-bind="listItemBindings">
      <a :href="`mailto:${props.mail}`" class="text-decoration-underline">{{
        props.mail
      }}</a>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as dynamics from "dynamics.js";

//#region props
interface Props {
  id: string;
  image: string;
  size?: number;
  mail?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 170,
});
//#endregion

//#region bindings
const listItemBindings: Binding = {
  class: "d-flex justify-center",
};
//#endregion

//#region animation functions
function breath(element: HtmlItem): void {
  const init = { scale: 1 };
  const shrink = { scale: 0.98 };
  const type: unknown = dynamics.linear;
  const duration: number = 1000;

  // intialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, shrink, {
    type,
    duration,
    complete: () => {
      dynamics.animate(element, init, {
        type,
        duration,
        complete: () => breath(element),
      });
    },
  });
}

//#endregion

//#region hooks
onMounted(() => {
  const avatar = document.getElementById(props.id);
  breath(avatar);
});
//#endregion
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
