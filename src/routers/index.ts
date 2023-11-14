import { createRouter, createWebHistory } from 'vue-router';
import Home from './home';
import Order from './order/order';
import ProductDetails from './product/product-details';

export default createRouter({
  history: createWebHistory(),
  routes: [...Home, ...ProductDetails, ...Order],
});
