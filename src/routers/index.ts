import { useUserStore } from '@/store';
import { isEmpty } from 'lodash';
import { createRouter, createWebHistory } from 'vue-router';
import Cart from './cart/cart';
import NotFound from './error/404';
import Home from './home';
import Login from './login/login';
import Order from './order/order';
import ProductDetails from './product/product-details';

export const routers = createRouter({
  history: createWebHistory(),
  routes: [
    ...Home,
    ...ProductDetails,
    ...Order,
    ...Login,
    ...Cart,
    ...NotFound,
  ],
});

routers.beforeEach(async (to, from, next) => {
  const { user } = useUserStore();
  // next-line: check if route ("to" object) needs authenticated
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    isEmpty(user.FullName)
  ) {
    next('/login');
  } else if (!isEmpty(user.FullName)) {
    if (
      to.matched.some((record) => record.meta.requiresAdmin) &&
      !user.Roles?.includes('ADMIN')
    ) {
      next({ name: 'Forbidden' });
    } else {
      switch (to.name) {
        // case 'AdminPage':
        //   break;

        default:
          next();
          break;
      }
    }
  } else next();
});
