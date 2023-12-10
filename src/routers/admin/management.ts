export default [
  {
    name: 'Management',
    path: '/management',
    component: () => import('@/components/layouts/admin/TheAdminContainer.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: () => import('@/views/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'OrderManagement',
        path: 'order',
        component: () => import('@/views/admin/order/OrderManagement.vue'),
      },
      {
        name: 'ProductManagement',
        path: 'product',
        component: () => import('@/views/admin/product/ProductManagement.vue'),
      },
      {
        name: 'ProductDetailManagement',
        path: 'product/:id',
        component: () =>
          import('@/views/admin/product/ProductDetailsManagement.vue'),
      },
    ],
  },
];
