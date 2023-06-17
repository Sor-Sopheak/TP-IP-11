import { createRouter, createWebHistory } from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue'
import ProductPageDetail from '../views/ProductPageDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: ProductsPage
    },
    {
      path: '/',
      redirect: '/products'
    }
  ]
})


export default router
