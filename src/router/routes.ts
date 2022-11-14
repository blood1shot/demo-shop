import { RouteRecordRaw } from "vue-router";
import routesName from "@/utils/constants/routesName";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: routesName.home,
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/item/:id",
    name: routesName.itemDetails,
    component: () => import("../views/ItemDetailsPage.vue"),
  },
];

export default routes;
