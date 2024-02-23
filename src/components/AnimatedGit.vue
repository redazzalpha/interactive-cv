<template>
  <v-hover>
    <template v-slot:default="{ isHovering: hover, props: hoverProp }">
      <div :id="props.idWrapper" class="w-100">
        <v-card
          :id="props.id"
          class="app-git w-100 pa-5"
          variant="outlined"
          :href="props.data?.html_url"
          v-bind="hoverProp"
          color="active"
        >
          <!-- title -->
          <v-card-title :class="`text-${hover ? 'hover' : 'active'}`"
            >{{ props.data?.name }}
          </v-card-title>
          <v-card-subtitle>{{ props.data?.description }}</v-card-subtitle>

          <!-- container -->
          <div class="d-flex flex-column flex-md-row justify-start align-start">
            <!-- creation & update dates -->
            <v-card-text
              class="d-inline-block text-truncate flex-grow-0 w-100 text-body"
            >
              Crée le {{ creationDate }} -:- Dernière mise à jour le
              {{ lastUpdateDate }}
            </v-card-text>

            <!-- languages  -->
            <span
              v-if="props.data?.language"
              class="py-1 px-5"
              style="border: solid grey 1px; border-radius: 5px"
            >
              {{ props.data?.language }}
            </span>
          </div>

          <v-card-actions
            v-if="props.data?.homepage"
            class="d-flex justify-center justify-md-start"
          >
            <v-btn
              class="px-5"
              rounded
              variant="tonal"
              flat
              style="text-transform: unset"
              :href="props.data?.homepage"
              >homepage</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { onMounted, computed, ref } from "vue";
import * as dynamics from "dynamics.js";

//#region refs
const languages = ref<string[]>();
//#endregion

//#region props
interface Props {
  id: string;
  idWrapper: string;
  disabled?: boolean;
  data: GitData | undefined;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
//#endregion

//#region variables
const index: number = parseInt(props.id.substring(props.id.length - 1));
//#endregion

//#region computed
const creationDate = computed<string>(() => {
  const objectDate = DateTime.fromISO(props.data?.created_at);
  return `${objectDate.day} ${objectDate.monthLong} ${objectDate.year}`;
});
const lastUpdateDate = computed<string>(() => {
  const objectDate = DateTime.fromISO(props.data?.updated_at);
  return `${objectDate.day} ${objectDate.monthLong} ${objectDate.year}`;
});

//#endregion

//#region functions
async function getDataLanguage(): Promise<void> {
  const response: Response = await fetch(`${props.data?.languages_url}`);
  languages.value = Object.keys(await response.json());
}
//#endregion

//#region animtion functions
// low level animation
function slide(element: HtmlItem): void {
  const init = { translateY: -500 };
  const downappear = { translateY: 0 };
  const type = dynamics.spring;
  const friction = 1000;
  const duration = 4000;
  const delay = index * 100;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, downappear, { type, friction, duration, delay });
}
function appear(element: HtmlItem): void {
  // const index: number = parseInt(props.id.substring(props.id.length - 1));
  const init = { opacity: 0, scale: 0 };
  const downappear = { opacity: 1, scale: 1 };
  const type = dynamics.spring;
  const friction = 1000;
  const duration = 2000;
  const delay = index * 100;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, downappear, { type, friction, duration, delay });
}

// top level animation
function pop(): void {
  if (!props.disabled) {
    const wrapper: HtmlItem = document.getElementById(props.idWrapper);
    const appGit: HtmlItem = document.getElementById(props.id);
    const ready: boolean = appGit != null && wrapper != null;
    if (ready) {
      slide(wrapper);
      appear(appGit);
    }
  }
}
//#endregion

//#region hooks
onMounted(() => {
  getDataLanguage().then(() => pop());
});
//#endregion
</script>

<style lang="scss" scoped>
/* .app-git {
  opacity: 0;
} */
</style>
