import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import UnKnowRouter from './modules/unknow';
import TestRouter from './modules/test';
import HomeRouter from './modules/home';
import LoginRouter from './modules/login';
import { userStore } from '@/stores/user';
import { routeConfig } from './modules/config';


export const publicRoutes: Array<RouteRecordRaw> = [
  ...UnKnowRouter,
  ...TestRouter,
  ...HomeRouter,
  ...LoginRouter,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

// 全局前置守卫
router.beforeEach((to, _, next) => {
  const userBean = userStore();

  // 根据登录状态判断是否允许访问需要登录的路由
  const isLogin = (userBean.token != "");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLogin) {
    // 需要登录但未登录，重定向到登录页面
    next(routeConfig.login.path);
  } else {
    //   允许访问
    next();
  }
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export function push(path: string) {
  router.push({ path: path });
}

// 添加默认导出
export default router;

