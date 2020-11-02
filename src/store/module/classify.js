import { reqCateList } from '../../util/request'

const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
const actions = {
    requestClaList(context) {
        // axios请求
        reqCateList({istree:true}).then((res) => {
            if (res.data.code == 200) {
                // console.log(res);
                let list = res.data.list ? res.data.list : []
                context.commit('changeList', list)
            }

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