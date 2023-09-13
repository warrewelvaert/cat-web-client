import { createRouter, createWebHistory } from 'vue-router'
import FrontView from '../views/FrontView.vue'
import DetailPage from '../views/DetailPageView.vue';
import LoginPage from '../views/LoginPageView.vue';
import RegisterPage from '../views/RegisterPageView.vue';
import AddBreed from '../views/AddBreedView.vue';
import UpdateBreed from '../views/UpdateBreedView.vue';
import DeleteBreed from '../views/DeleteBreedView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontPage',
      component: FrontView
    },
    {
      path: '/detail/:id',
      name: 'cat-details',
      component: DetailPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/addbreed',
      name: 'add-breed',
      component: AddBreed,
    },
    {
      path: '/updatebreed',
      name: 'update-breed',
      component: UpdateBreed,
    },
    {
      path: '/deletebreed',
      name: 'delete-breed',
      component: DeleteBreed,
    }
  ]
})

export default router
