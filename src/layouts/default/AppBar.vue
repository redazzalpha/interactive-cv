<template>
  <v-app-bar density="prominent" elevation="0">
    <v-container grid-list-xs>
      <v-row>
        <v-col
          class="d-flex justify-center"
          v-for="link in links"
          :key="link.label"
        >
          <AppTag
            :size-chevron="40"
            :size-slash="30"
            v-show="!$vuetify.display.mobile"
          >
            {{ link.label }}
          </AppTag>
        </v-col>
      </v-row>
    </v-container>
    <v-app-bar-nav-icon
      v-show="$vuetify.display.mobile"
      @click="clickNavIcon"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/app";

//#region variables
const store = useAppStore();
//#endregion

//#region event handlers
function clickNavIcon() {
  store.setDrawer(true);
}
//#endregion

//#region arrays
const links: Links[] = [
  { label: "Home", href: "/" },
  { label: "Test", href: "/papi" },
  { label: "Test1", href: "" },
  { label: "Test2", href: "" },
  { label: "Test3", href: "" },
];
//#endregion
</script>
