import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      
    },
    {
      path: '/home',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true,
        
      }
    },
    {
      path: '/register',
      name: 'registro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/feed',
      name: 'Feed',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FeedView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bienesraices',
      name: 'Bienes Raices',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProprietyView.vue'),
      meta: {
        requiresAuth: true,
        
      }
    },
    {
      path: '/reset',
      name: 'Reset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ResetView.vue'),
    },
    {
      path: '/bienesraices/create',
      name: 'Create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Propriety/ProprietyCreateFormView.vue'),
      meta: {
        requiresAuth: true,
        
      }
    },
    {
      path: '/contruccion',
      name: 'Contruccion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContructionPageView.vue'),
      meta: {
        requiresAuth: true,
        
      }
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async(to, from, next) =>{
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
       next();
    }else{
      alert("Usted no tiene acceso");
      next("/")
    }
  } else {
    next();
  }
});

export default router
