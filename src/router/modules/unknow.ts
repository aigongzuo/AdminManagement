export default [
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/unknow/index.vue'),
      meta: { title: '未知页面' }
    }
  ];