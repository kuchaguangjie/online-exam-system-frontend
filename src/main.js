/*
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-03-04 10:34:47
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-04-25 15:06:09
 * @FilePath: \vue-admin-template\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' 

import '@/styles/index.scss' // global css

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 定义白名单
const whiteList = ['/login', '/register'];

router.beforeEach((to, from, next) => {
    // 获取token，这里以从localStorage获取为例
    const token = getToken('Authorization');

    // 检查当前访问的路由是否在白名单内
    if (whiteList.includes(to.path)) {
        // 如果在白名单内，不需要token，直接允许访问
        next();
    } else {
        // 如果不在白名单内，则需要检查token
        if (!token) {
            // 如果没有token，则跳转到登录页面，并携带前往的完整路径以便登录后重定向
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            // 如果有token，则允许访问
            next();
        }
    }
});

import App from './App'
import store from './store'
import router from './router'



import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import { getToken } from './utils/auth'
axios.defaults.withCredentials=true

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
