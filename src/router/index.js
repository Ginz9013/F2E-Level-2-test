import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DrawBoard from "../views/DrawBoard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/DrawBoard",
    name: "DrawBoard",
    component: DrawBoard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
