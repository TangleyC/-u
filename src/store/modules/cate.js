import { reqCateList } from "../../utils/request"
const state = {
    //分类list
    list: []
}
const mutations = {
    //直接修改state
    changeList(state, arr) {
        state.list = arr;
    }
}
//逻辑
const actions = {
    //context 仓库 store
    reqListAction(context) {
        //发起获取list的请求
        reqCateList().then(res => {
            if (res.data.code == 200) {
                //提交到mutations进行修改list 
                let list = res.data.list ? res.data.list : []
                context.commit("changeList", list)
            }
        })
    }
}
const getters = {
    //导出给组件
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    //命名空间：如果设置了命名空间，就可以通过 模块名/变量名 访问变量，访问action 也可以通过 模块名/action名 访问
    namespaced: true
}