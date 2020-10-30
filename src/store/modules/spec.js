import { reqSpecList, reqSpecCount } from "../../utils/request"
let state = {
    //列表数据
    list: [],
    //总数
    total: 0,
    //一页的个数
    size: 2,
    //页码
    page: 1,
}
let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
    //修改总数
    changeTotal(state, num) {
        state.total = num
    },
    //修改page
    changePage(state,page){
        state.page=page;
    }
}

let actions = {
    //发起获取list的请求
    reqListAction(context) {
        //发请求
        reqSpecList({ page: context.state.page, size: context.state.size }).then(res => {
            if (res.data.code === 200) {
                let list = res.data.list ? res.data.list : [];

                //如果去到了 空数组，并且当前页不是第一页，那么重新请求前一页
                if(list.length==0&&context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqListAction")
                    return;
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
        //发起总数的请求
        reqSpecCount().then(res => {
            if (res.data.code == 200) {
                //修改总数
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },
    //修改页码
    changePageAction(context,page){
        //修改page
        context.commit("changePage",page)
        //重新请求list
        context.dispatch("reqListAction")
    }
}

let getters = {
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