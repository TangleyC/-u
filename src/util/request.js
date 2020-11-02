import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
import { alertwaring } from './alert'
//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求的地址是：" + res.config.url)
    console.log(res);
    //失败了，统一弹失败的弹框
    if (res.data.code !== 200) {
        alertwaring(res.data.msg)
    }
    return res;
})

//开发环境中使用 localhost:8080
let baseUrl = "/api"
Vue.prototype.$imgPre = "http://localhost:3000"

//生产环境 打包 
// let baseUrl = ""
// Vue.prototype.$imgPre=""
//菜单添加

export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(form)
    })
}
//菜单列表
// {istree:true}
export const reqMenuList = () => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    })
}
//获取一条数据
// {istree:true}
export const reqMenuListOne = (id) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//菜单删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}
//菜单修改
export const reqMenuUpdata = (form) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(form)
    })
}
//角色的添加
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}

//角色的详情 1条
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//角色的修改
export const reqRoleUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//角色的删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 管理员列表  params={page:1,size:10}
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}
// 管理员添加
export const reqManageAdd = (form) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(form)
    })
}
//管理员详情 1条
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}
//管理员修改
export const reqManageUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(form)
    })
}

//管理员删除
export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

//管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}

//会员列表
export const reqMenberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}
//会员详情 1条
export const reqMenberDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//会员修改
export const reqMenberUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//分类添加
export const reqCateAdd = (data) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

//分类list
export const reqCateList = (params) => {
    return axios({
        url:baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}

//分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//分类详情
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//分类修改
export const reqCateUpdate = (data) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}

//规格----------------------------------------------------
//规格添加
export const reqSpecAdd = (form) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//规格列表 params={page:1,size:10}
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}

//规格详情 1条
export const reqSpecDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: uid
        }
    })
}

//规格修改
export const reqSpecUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//规格删除
export const reqSpecDel = (uid) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: uid
        })
    })
}

//规格总数
export const reqSpecCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//商品管理添加
export const reqGoodsAdd = (form) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}

//商品管理列表 params={page:1,size:10}
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品管理详情 1条
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//商品管理修改
export const reqGoodsUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: form
    })
}

//商品管理删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//商品管理总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

//轮播图
//轮播图添加
export const reqBannerAdd = (data) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}

//轮播图list
export const reqBannerList = () => {
    return axios({
        url:baseUrl + "/api/bannerlist",
        method: "get",
       
    })
}

//轮播图删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//轮播图详情
export const reqBannerDetail = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//轮播图修改
export const reqBannerUpdate = (data) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}


//登录
export const reqLogin = (form) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(form)
    })
}