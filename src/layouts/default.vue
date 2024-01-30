<template>
  <DrawerAvatar />
  <DrawerNav />
  <HeaderBar />
  <MainView />
  <FooterBar />
  <ScrollTopButton />
</template>

<script lang="ts" setup>
import DrawerAvatar from "@/layouts/default/DrawerAvatar.vue";
import DrawerNav from "@/layouts/default/DrawerNav.vue";
import HeaderBar from "@/layouts/default/HeaderBar.vue";
import MainView from "@/layouts/default/MainView.vue";
import FooterBar from "@/layouts/default/FooterBar.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import router from "@/router";
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
const store = useAppStore();

//#region variables
const titleRoutes: HeaderBarTitleRoute = {};
let currentPath: string = `/${router.currentRoute.value.name!.toString()}`;
//#endregion

//#region hooks
onMounted(() => {
  // get each link from store
  // store href as key into titleRoutes
  // store appbarTitle as value
  // to retrieve appbartitle value
  // on router after each
  store.links.forEach((e: Link): void => {
    titleRoutes[e.href] = e.appbartTitle;
  });

  // set app bar title on mount default layout
  store.setAppBartTitle(titleRoutes[currentPath]);
});
router.afterEach(() => {
  currentPath = `/${router.currentRoute.value.name!.toString()}`;
  // set app bar title on router after each
  store.setAppBartTitle(titleRoutes[currentPath]);
  scrollTo({ behavior: "instant", top: 0 });
});
//#endregion
</script>
