<template>
  <div class="login">
      <div class="con">
          <h3>登录</h3>
          <el-input placeholder="请输入用户名"></el-input>
          <el-input placeholder="请输入密码"></el-input>
          <div class="btn-parent">
              <el-button type="primary" @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        login(){
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553544,#423A52,#303C5F);
    position: relative;
}
.con{
    width: 400px;
    padding: 20px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 30px;
}
h3{
    text-align: center;
    line-height: 60px;
}
.el-input{
    margin-bottom: 20px;
}
.btn-parent{
    text-align: center;
}
</style>