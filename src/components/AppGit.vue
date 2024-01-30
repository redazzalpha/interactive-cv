<template>
  <v-card>
    <a :href="props.data?.html_url" class="text-decoration-none text-active">
      <v-card-title>{{ props.data?.name }} </v-card-title>
    </a>
    <v-card-text>
      Crée le {{ creationDate }} | Dernière mise à jour le {{ lastUpdateDate }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { onMounted, computed } from "vue";

//#region props
interface Props {
  data: GitData | undefined;
}
const props = defineProps<Props>();
//#endregion

//#region computed
const creationDate = computed<string>(() => {
  console.log(props.data);
  const objectDate = DateTime.fromISO(props.data?.created_at);
  return `${objectDate.day} ${objectDate.monthLong} ${objectDate.year}`;
});
const lastUpdateDate = computed<string>(() => {
  const objectDate = DateTime.fromISO(props.data?.updated_at);
  return `${objectDate.day} ${objectDate.monthLong} ${objectDate.year}`;
});
//#endregion
//#region hooks
onMounted(() => {});
//#endregion
</script>
