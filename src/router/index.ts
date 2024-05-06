/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // base
  {
    name: "root",
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      // home
      {
        name: "home",
        path: "/home",
        component: () => import("@/pages/home.vue"),
      },

      // test
      {
        name: "art",
        path: "/art",
        component: () => import("@/pages/art.vue"),
      },

      // projects
      {
        name: "projects",
        path: "/projects",
        component: () => import("@/pages/projects.vue"),
      },

      //  about
      {
        name: "about",
        path: "/about",
        component: () => import("@/pages/about.vue"),
      },
    ],
  },

  // redirects
  {
    path: "",
    redirect: {name: "home"}
  },

  // error
  {
    name: "notFound",
    path: "/:pathmatch(.*)*",
    component: () => import("@/pages/notfound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
