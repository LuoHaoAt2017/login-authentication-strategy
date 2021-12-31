import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router =new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../pages/home.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../pages/about.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../pages/register.vue"),
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;