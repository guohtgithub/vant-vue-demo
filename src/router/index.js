import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../view/home')
const Notify = () => import('../view/home/notify')
const Login = () => import('@view/login')
const Detail = () => import('@view/detail')
const moreFile = () => import('@view/moreFile')
const vantFile = () => import('@view/vantFile')
const routerLinks = () => import('@view/routerLinks')
const vantTest = () => import('@view/vantTest')
const keyBoard = () => import('@view/vant/psdKeyboard')
const testVue = () => import('@view/vant/testVue')
const Uploader = () => import('@view/vant/uploader')

const router = new VueRouter({
  // mode:'hash',
  routes:[
    {
      path:'/',
      name:'routerLinks',
      component:routerLinks
    },{
      path:'/routerLinks',
      redirect:'/'
    },{
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/notify',
      name:'Notify',
      component:Notify
    },{
      path:'/login',
      name:'Login',
      component:Login
    },{
      path:'/detail',
      name:'Detail',
      component:Detail
    },{
      path:'/moreFile',
      name:'moreFile',
      component:moreFile
    },{
      path:'/vantFile',
      name:'vantFile',
      component:vantFile
    },{
      path:'/vantTest',
      name:'vantTest',
      component:vantTest,
      children:[
        {
          path:'',
          redirect:'keyBoard'
        },
        {
          path:'keyBoard',
          name:"keyBoard",
          component:keyBoard
        },{
          path:'testVue',
          name:"testVue",
          component:testVue
        },{
          path:'uploader',
          name:'Uploader',
          component:Uploader
        }
      ]
    }
  ]
})

export default router