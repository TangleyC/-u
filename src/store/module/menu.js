import { reqMenuList } from '../../util/request'

const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requestMenuList(context){
            // axios请求
            reqMenuList({istree:true}).then((res)=>{
                console.log(res.data.list)
                context.commit('changeList',res.data.list)
            })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}