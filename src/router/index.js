import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Leaderboard from '../views/Leaderboard.vue';
import HowToPlay from "../views/HowToPlay.vue";

const routes = [
  {
    path: '/',
    name: "Home",
    component: Main,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
  },
  {
    path: '/howtoplay',
    name: 'How To Play',
    component: HowToPlay,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - ${ process.env.VUE_APP_TITLE }`
  next()
})

export default router
