import { routeConfig } from './config';

export default [
  {
    path: routeConfig.login.path,
    name: routeConfig.login.path,
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录页' }
  }
];
