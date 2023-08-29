import { createRouter, createWebHistory } from 'vue-router'
import Home from './home'

export default createRouter({
  history: createWebHistory(),
  routes: [
    ...Home
  ],
})
