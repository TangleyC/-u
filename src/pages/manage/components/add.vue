<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域" >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        
        
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加管理员'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqRoleList,reqManageAdd,reqManageDetail,reqManageUpdate} from "../../../utils/request";
export default {
  props: ["info","list"],
  data() {
    return {
      form: {
        roleid:"",
        username:"",
        password:"",
        status: 1
      },
      //角色的列表
      roleList:[]
    };
  },
  mounted(){
    //一进来就请求角色列表
    reqRoleList().then(res=>{
      if(res.data.code===200){
        this.roleList=res.data.list
      }
      
    })
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        roleid:"",
        username:"",
        password:"",
        status: 1
      }
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    
    //添加
    add() {
      //发请求
     reqManageAdd(this.form).then(res=>{
       if(res.data.code===200){
         this.cancel()
         successAlert("添加成功")
         this.empty()
         this.$emit("init")
       }
     })
    },
    //获取一条的数据
    getOne(uid){
        //发起获取一条数据的请求
       reqManageDetail(uid).then(res=>{
           //目前form上是没有id字段,但是有uid
           this.form=res.data.list
          //因为后端返回的密码是加密后的，所以需要将密码置空
          this.form.password=""
       })
    },
    //点击了修改
    update(){
       reqManageUpdate(this.form).then(res=>{
            if(res.data.code===200){
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                //弹成功
                successAlert("修改成功")
                //刷新list 
                this.$emit("init")
            }
        })
    }
  }
};
</script>

<style scoped>
</style>