import { createRouter, createWebHistory } from "vue-router";
import Item from "@/components/Item";

const routes = [
  {
    path: "/item/:id/:idUser/:token",
    name: "Item",
    component: Item,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
