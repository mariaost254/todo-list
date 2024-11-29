import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/TodoListView.vue";

const routes = [
  {
    path: "/",
    name: "todo-list",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
