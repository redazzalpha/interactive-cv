<template>
  <v-sheet>
    <a
      :href="props.asset.image"
      class="d-flex justify-center text-decoration-none text-white mb-5 mx-lg-5"
    >
      <figure style="">
        <img
          :src="props.asset.icon"
          :width="props.asset.width"
          style="position: absolute; object-fit: cover"
        />
        <img
          :src="props.asset.imageSmall"
          :alt="props.asset.alt"
          style="border-radius: 15px 15px 0 0"
        />
        <figcaption class="text-center text-subtitle-1">
          {{ props.asset.caption }}
        </figcaption>
      </figure>
    </a>
  </v-sheet>
</template>

<script setup lang="ts">
//#region exported interface
interface Props {
  asset: Asset;
}
const props = defineProps<Props>();
//#endregion
</script>
