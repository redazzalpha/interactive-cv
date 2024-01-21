<template>
  <v-app-bar density="prominent" elevation="0">
    <v-container grid-list-xs style="border: solid red 3px">
      <v-row>
        <v-col
          class="d-flex justify-center"
          v-for="link in links"
          :key="link.label"
        >
          <AppTag :size-chevron="40" :size-slash="30" :visible="true">
            {{ link.label }}
          </AppTag>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
const links: Links[] = [
  { label: "Home", href: "/" },
  { label: "Test", href: "/papi" },
  { label: "Test1", href: "" },
  { label: "Test2", href: "" },
  { label: "Test3", href: "" },
];
</script>
