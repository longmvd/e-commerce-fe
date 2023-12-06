export default [
  {
    name: 'Management',
    path: '/management',
    component: () => import('@/components/layouts/admin/TheAdminContainer.vue'),
    meta: {
      requiresAuth: true,
      requestAdmin: true,
    },
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        name: 'OrderManagement',
        path: 'order',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
    ],
  },
];
