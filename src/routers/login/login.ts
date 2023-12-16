export default [
  {
    name: 'Login',
    path: 'login',
    component: () => import('@/views/login/LoginForm.vue'),
  },
  {
    name: 'Register',
    path: 'register',
    component: () => import('@/views/login/LoginForm.vue'),
  },
];
