export default [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/NotFound.vue'),
  },
];
