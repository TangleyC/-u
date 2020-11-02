import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



const home = () => import('../pages/home/home')

const role = () => import('../pages/role/role')
const manger = () => import('../pages/manger/manger')
const menu = () => import('../pages/menu/menu')
const spces = () => import('../pages/spces/spces')
const loop = () => import('../pages/loop/loop')
const seckill = () => import('../pages/seckill/seckill')
const classify = () => import('../pages/classify/classify')
const goods = () => import('../pages/goods/goods')
const member = () => import('../pages/member/member')


export const indexRouters = [
  {
    path: 'role',
    component: role,
    name: '角色列表'
  },
  {
    path: 'manger',
    component: manger,
    name: '管理员列表'
  },
  {
    path: 'menu',
    component: menu,
    name: '菜单列表'
  },
  {
    path: 'spces',
    component: spces,
    name: '商品规格'
  },
  {
    path: 'loop',
    component: loop,
    name: '轮播图'
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀活动'
  },
  {
    path: 'classify',
    component: classify,
    name: '商品分类'
  },
  {
    path: 'goods',
    component: goods,
    name: '商品列表'
  },
  {
    path: 'member',
    component: member,
    name: '会员管理'
  },
]



export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login')
    },
    {
      path: '/',
      component: () => import('../pages/index/index'),
      children: [
        {
          path: "",
          component:()=>import("../pages/home/home")
        },
        // ...indexRouters
      ].concat(indexRouters)
    }
  ]
})
