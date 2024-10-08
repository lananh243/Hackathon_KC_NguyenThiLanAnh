import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin",
      component: () =>
        import(/* webpackChunkName: "admin" */ "@/views/Home.vue"),
      name: "admin",
      children: [
        {
          path: "manager-product",
          component: () =>
            import(
              /* webpackChunkName: "product" */ "@/views/ManagerProduct.vue"
            ),
          name: "product",
        },
        {
          path: "manager-category",
          component: () =>
            import(
              /* webpackChunkName: "category" */ "@/views/ManagerCategory.vue"
            ),
          name: "category",
        },
      ],
    },
  ],
});

export default router;
