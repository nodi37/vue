import { createWebHistory, createRouter } from "vue-router";
import EditView from "@/views/EditView/EditView.vue";
import AddView from "@/views/AddView/AddView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ListView from "@/views/ListView/ListView.vue";

const routes = [
  { name: "list-view", path: "/", component: ListView },
  { name: "add-view", path: "/add", component: AddView },
  { name: "edit-view", path: "/edit/:id", component: EditView },

  // Fallback
  { name: "not-found-view", path: "/404", component: NotFoundView },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
