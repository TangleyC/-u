<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" show-passWord>
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import {
  reqManageAdd,
  reqRoleList,
  reqManageUpdate,
  reqManageDetail,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
       //角色的列表
      roleList:[]
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
  
    empty() {
      this.form = {
        roleid:"",
        username:"",
        password:"",
        status: 1
      };
    },
    add() {
      // console.log(this.form);
      reqManageAdd(this.form).then((res) => {
        // console.log(111);
        // console.log(res);
        if (res.data.code == 200) {
          this.cancel();
          alertSuccess(res.data.msg);
          //重置form
          this.empty();
          //刷新list数据
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
    //获取一条的数据
    getOne(uid) {
      //发起获取一条数据的请求
      reqManageDetail(uid).then((res) => {
        //目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.password=''
        // this.form.uid = uid;
      });
    },
    update() {
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
          //刷新list
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
  },
  mounted() {
     //一进来就请求角色列表
    reqRoleList().then(res=>{
      if(res.data.code===200){
        this.roleList=res.data.list
      }
      
    })
  },
};
</script>
<style scoped>
</style>