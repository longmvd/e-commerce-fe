export default [
  {
    name: 'ProductDetails',
    path: 'product/:productId',
    component: () => import('@/views/product/ProductDetails.vue'),
  },
];
