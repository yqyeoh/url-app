import Vue from "vue";
import Router from "vue-router";
// import Home from "@/pages/Home.vue";
// import Redirect from "@/pages/Redirect.vue";

Vue.use(Router);

const loadPage = (page) => () => import(`@/pages/${page}.vue`);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      // component: Home,
      component: loadPage("Home"),
    },
    {
      path: "/*",
      // component: Redirect,
      component: loadPage("Redirect"),
    },
  ],
});
