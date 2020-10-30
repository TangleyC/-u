// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//3.路由
import router from './router'

Vue.config.productionTip = false

//1.reset.css 
import "./assets/css/reset.css"

// 2.element-ui 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 4.路由组件 pages 

// 5数据请求

//6.状态层
import store from "./store"

//7.全局组件
import "./components"

//8.过滤器
import "./filters"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
