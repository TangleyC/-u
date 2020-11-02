import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {actions} from'./actions'
import {state,mutations,getters} from'./mutations'
import menu from './module/menu'
import classify from './module/classify'
import spces from './module/spces'
import goods from './module/goods'
import banner from './module/banner'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        classify,
        spces,
        goods,
        banner
    }
})