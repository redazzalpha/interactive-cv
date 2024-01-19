/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // base
  {
    name: "root",
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("@/pages/home.vue"),
      }
    ],
  },

  // redirects
  {
    path: "/home",
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

export default router
