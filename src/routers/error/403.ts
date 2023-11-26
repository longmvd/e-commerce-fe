export default [
  {
    name: 'Forbidden',
    path: '/forbidden',
    component: () => import('@/views/error/NotFound.vue'),
  },
];
