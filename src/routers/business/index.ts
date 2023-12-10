import Cart from '../cart/cart';
import Forbidden from '../error/403';
import NotFound from '../error/404';
import Home from '../home';
import Login from '../login/login';
import Order from '../order/order';
import ProductDetails from '../product/product-details';
export default [
  {
    name: 'Business',
    path: '/',
    component: () => import('@/components/layouts/TheContainer.vue'),
    children: [
      ...Home,
      ...Cart,
      ...Forbidden,
      ...NotFound,
      ...Login,
      ...Order,
      ...ProductDetails,
    ],
  },
];
