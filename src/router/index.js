import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import BalitaView from '../views/BalitaView.vue'
import DetailBalitaView from '../views/DetailBalitaView.vue'
import IbuHamilView from '../views/IbuHamilView.vue'
import DetailIbuHamilView from '../views/DetailIbuHamilView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },

  {
    path: '/balita',
    name: 'Balita',
    component: BalitaView
  },

  {
    path: '/balita/:id',
    name: 'DetailBalita',
    component: DetailBalitaView
  },

  {
    path: '/ibu-hamil',
    name: 'IbuHamil',
    component: IbuHamilView
  },

  {
    path: '/ibu-hamil/:id',
    name: 'DetailIbuHamil',
    component: DetailIbuHamilView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router