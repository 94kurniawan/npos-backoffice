import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
import SalesSummary from '../views/reports/SalesSummary.vue'
import RecapCashier from '../views/reports/RecapCashier.vue'
import StockHistory from '@/views/reports/StockHistory.vue'
import TransactionsHistory from '@/views/reports/TransactionsHistory.vue'
import ValidationKey from '../views/ValidationKey.vue'
import StoreItems from '@/views/store_items/StoreItems.vue'
import EditItem from '@/views/store_items/EditItem.vue'
import AddItem from '@/views/store_items/AddItem.vue'
import Recipe from '@/views/store_items/Recipe.vue'
import Category from '@/views/store_items/Category.vue'
import EditRecipe from '@/views/store_items/EditRecipe.vue'
import RawMaterials from '@/views/raw_materials/RawMaterials.vue'
import StockAdjustment from '@/views/raw_materials/StockAdjustment.vue'
import CreateAdjustment from '@/views/raw_materials/CreateAdjustment.vue'
// Print
import PrintSalesSummary from '@/views/reports/print/PrintSalesSummary.vue'
import PrintRawMaterials from '@/views/raw_materials/print/PrintRawMaterials.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/sales-summary',
    name: 'SalesSummary',
    component: SalesSummary
  },
  {
    path: '/recap-cashier',
    name: 'RecapCashier',
    component: RecapCashier
  },
  {
    path: '/stock-history',
    name: 'StockHistory',
    component: StockHistory
  },
  {
    path: '/transactions-history',
    name: 'TransactionsHistory',
    component: TransactionsHistory
  },
  {
    path: '/validation-key',
    name: 'ValidationKey',
    component: ValidationKey
  },
  {
    path: '/store-items',
    name: 'StoreItems',
    component: StoreItems
  },
  {
    path: '/edit-item',
    name: 'EditItem',
    component: EditItem
  },
  {
    path: '/add-item',
    name: 'AddItem',
    component: AddItem
  },
  {
    path: '/recipe',
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/edit-recipe',
    name: 'EditRecipe',
    component: EditRecipe
  },
  {
    path: '/raw-materials',
    name: 'RawMaterials',
    component: RawMaterials
  },
  {
    path: '/stock-adjustment',
    name: 'StockAdjustment',
    component: StockAdjustment
  },
  {
    path: '/create-adjustment',
    name: 'CreateAdjustment',
    component: CreateAdjustment
  },
  // Print
  {
    path: '/print-sales-summary',
    name: 'PrintSalesSummary',
    component: PrintSalesSummary
  },
  {
    path: '/print-raw-materials',
    name: 'PrintRawMaterials',
    component: PrintRawMaterials
  },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
