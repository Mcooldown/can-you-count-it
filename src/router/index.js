import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Leaderboard from '../views/Leaderboard.vue';
import HowToPlay from "../views/HowToPlay.vue";

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: '/howtoplay',
    name: 'howtoplay',
    component: HowToPlay,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
