import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DrawBoard from "../views/DrawBoard.vue";
import FabricView from "../views/FabricView.vue";
import FabricJs from "../views/FabricJs.vue";
import TestPage from "../views/TestPage.vue";

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
  {
    path: "/FabricView",
    name: "FabricView",
    component: FabricView,
  },
  {
    path: "/FabricJs",
    name: "FabricJs",
    component: FabricJs,
  },
  {
    path: "/TestPage",
    name: "TestPage",
    component: TestPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
