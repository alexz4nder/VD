import AboutUsView from '@/views/AboutUsView.vue'
import CatalogView from '@/views/CatalogView.vue'
import FamilyGamesView from '@/views/FamilyGamesView.vue'
import FunnyGamesView from '@/views/FunnyGamesView.vue'
import GaleryView from '@/views/GaleryView.vue'
import GameView from '@/views/GameView.vue'
import HomePageView from '@/views/HomePageView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import StrategyGamesView from '@/views/StrategyGamesView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePageView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUsView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
    },
    {
      path: '/catalog/strategies',
      name: 'strategies',
      component: StrategyGamesView,
    },
    {
      path: '/catalog/family',
      name: 'familyGames',
      component: FamilyGamesView,
    },
    {
      path: '/catalog/funny',
      name: 'funnyGames',
      component: FunnyGamesView,
    },
    {
      path: '/galery',
      name: 'galery',
      component: GaleryView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registration',
      name: '/registration',
      component: RegisterView,
    },
    {
      path: '/user/:user',
      name: 'user',
      component: UserProfileView,
    },
    {
      path: '/catalog/game/:gameId',
      name: 'game',
      component: GameView,
    },
  ],
})

export default router
