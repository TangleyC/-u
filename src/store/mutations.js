//根级别下的state
export const state={
    //用户信息
    // sessionStorage.getItem() 取不到值是null
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}

export const mutations={
    //修改userInfo 
    changeUserInfo(state,info){
        state.userInfo=info;
        //同步到本地存储
        if(info.username){
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            sessionStorage.removeItem("userInfo")
        }
       
    }
}

export const getters={
    userInfo(state){
        return state.userInfo;
    }
}