import { routeConfig } from './config'

export default [
  {
    path: routeConfig.home.path,
    name: routeConfig.home.path,
    redirect: routeConfig.welcome.path, // 设置默认路由为 /dashboard
    component: () => import('@/views/home/index.vue'),
    meta: { requiresAuth: true }, // 标记需要登录的路由
    children: [
      {
        path: routeConfig.welcome.path,
        name: routeConfig.welcome.name,
        component: () => import('@/views/home/welcome/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: routeConfig.dashboard.path,
        name: routeConfig.dashboard.name,
        component: () => import('@/views/home/dashboard/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: routeConfig.main.path,
        name: routeConfig.main.name,
        component: () => import('@/views/home/main/index.vue'),
        meta: { requiresAuth: true }
      },

      {
        path: routeConfig.setting.path,
        name: routeConfig.setting.name,
        component: () => import('@/views/home/setting/index.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
];