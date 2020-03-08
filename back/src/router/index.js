import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import Login from '../pages/login.vue'
import Index from '../pages/index.vue'
import AllInstitutions from '../components/allInstitutions.vue'
import Detail from '../components/detail.vue'
import Course from '../components/course.vue'
import AllTeachers from '../components/allTeachers.vue'
import InOrder from '../components/InOrder.vue'
import allSuggestions from '../components/allSuggestions.vue'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    component: Login,
    meta: {
      roles: ['admin', 'user']
    }
  },
  {
    path: '/index',
    component: Index,
    meta: {
      roles: ['admin']
    },
    redirect: '/index/allInstitutions',
    children: [{
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'allInstitutions',
      component: AllInstitutions,
      meta: {
        roles: ['admin']
      }
    },
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'allTeachers',
      component: AllTeachers,
      meta: {
        roles: ['admin']
      }
    },
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'course',
      component: Course,
      meta: {
        roles: ['admin']
      }
    },
    {
      // 当 /user/:id/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'detail/:id',
      component: Detail,
      meta: {
        roles: ['admin']
      }
    },
    {
      path: 'InOrder',
      component: InOrder,
      meta: {
        roles: ['admin', 'user']
      }
    },
    {
      path: 'allSuggestions',
      component: allSuggestions,
      meta: {
        roles: ['admin', 'user']
      }
    }
    ]
  },
  {
    path: '*',
    component: Login,
    meta: {
      roles: ['admin', 'user']
    },
    redirect: '/'
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.roles.find(item => {
    return item === store.state.role
  })) {
    next()
  } else {
    alert('请先登录！')
    next({
      path: '/'
    })
  }
})

export default router
