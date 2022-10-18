import {
  createRouter,
  createWebHistory,
  RouteRecordName,
  RouteRecordRaw,
} from "vue-router";
import Login from "@/views/login/index.vue";
import store from "@/store/index";
// 路由信息
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

// 导出路由
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (router.hasRoute(to.name as RouteRecordName)) {
    next();
  } else {
    await store.commit("menu/menuinit", store.state.login.renderRouters);
    await store.commit("menu/sonRouterInit", store.state.login.sonsRouters);
    next({ ...to, replace: true });
  }
});

const getallname = (data: any, parentPath: string) => {
  let arr: Array<any> = [];
  data.forEach((item: { children: []; path: string }) => {
    if (item.children.length) {
      arr.push(`/${item.path}`);
      arr.push(`${parentPath}/${item.path}`);
      arr.push(...getallname(item.children, `${parentPath}/${item.path}`));
    } else {
      arr.push(`${parentPath}/${item.path}`);
    }
  });
  return Array.from(new Set(arr));
};

export default router;
