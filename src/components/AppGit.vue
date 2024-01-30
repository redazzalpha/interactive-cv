<template>
  <v-hover>
    <template v-slot:default="{ isHovering: hover, props: hoverProp }">
      <v-card
        class="kkk w-100 pa-5"
        variant="outlined"
        :href="props.data?.html_url"
        v-bind="hoverProp"
        color="active"
      >
        <!-- title -->
        <v-card-title :class="`text-${hover ? 'hover' : 'active'}`"
          >{{ props.data?.name }}
        </v-card-title>

        <!-- container -->
        <div class="d-flex flex-column flex-md-row justify-start align-start">
          <!-- creation & update dates -->
          <v-card-text class="d-inline-block text-truncate flex-grow-0 w-100">
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
      </v-card>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { onMounted, computed, ref } from "vue";

//#region refs
const languages = ref<string[]>();
//#endregion

//#region props
interface Props {
  data: GitData | undefined;
}
const props = defineProps<Props>();
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

//#region hooks
onMounted(() => {
  getDataLanguage();
});
//#endregion
</script>

<style lang="scss" scoped></style>
