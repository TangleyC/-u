import { reqSpecList, reqSpecCount } from '../../util/request'

const state = {
    //列表数据
    list: [],
    //总数
    total: 0,
    //一页的个数
    size: 2,
    //页码
    page: 1,
}
const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
    // 修改总数
    changeTotal(state, num) {
        state.total = num
    },
    //修改page
    changePage(state, page) {
        state.page = page;
    }
}
const actions = {
    reqlistAction(context,bool) {
        //发请求
        let p=bool?{}:{ page: context.state.page, size: context.state.size }
        reqSpecList(p).then(res => {
            if (res.data.code === 200) {
                let list = res.data.list ? res.data.list : [];
               
                //如果取到了空数组，并且当前页不是第一页，那么重新请求一下
               if(list.length==0&&context.state.page>1){
                   context.commit('changePage',context.state.page-1)
                   context.dispatch('reqlistAction')
                   return
                
               }
                //由于取回来的数据attrs是字符串 需要转换一下
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                context.commit("changeList", list)
            }
        })
    },

    //获取总数
    reqTotalAction(context) {
        reqSpecCount().then(res => {
            if (res.data.code == 200) {
                context.commit('changeTotal', res.data.list[0].total)
            }
        })
    },
    //修改页码
    changePageAction(context, page) {
        //修改page
        context.commit("changePage", page)
        //重新请求list
        context.dispatch("reqlistAction")
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}