export default [
  {
    name: 'Order',
    path: 'order',
    component: () => import('@/views/order/OrderForm.vue'),
  },
  {
    name: 'Checkout',
    path: 'order/checkout',
    component: () => import('@/views/order/CheckoutStatus.vue'),
  },
];
