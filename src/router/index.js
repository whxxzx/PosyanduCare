import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

import BayiView from '../views/BayiView.vue'
import DetailBayiView from '../views/DetailBayiView.vue'

import BalitaView from '../views/BalitaView.vue'
import DetailBalitaView from '../views/DetailBalitaView.vue'

import PraSekolahView from '../views/PraSekolahView.vue'
import DetailPraSekolahView from '../views/DetailPraSekolahView.vue'

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


  // =====================================================
  // BAYI
  // =====================================================

  {
    path: '/bayi',
    name: 'Bayi',
    component: BayiView
  },

  {
    path: '/bayi/:id',
    name: 'DetailBayi',
    component: DetailBayiView
  },


  // =====================================================
  // BALITA
  // =====================================================

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


  // =====================================================
  // PRA SEKOLAH
  // =====================================================

  {
    path: '/pra-sekolah',
    name: 'PraSekolah',
    component: PraSekolahView
  },

  {
    path: '/pra-sekolah/:id',
    name: 'DetailPraSekolah',
    component: DetailPraSekolahView
  },


  // =====================================================
  // IBU HAMIL
  // =====================================================

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

