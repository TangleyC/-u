<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择活动区域" @change="changePid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="120px" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router/index";
import axios from "axios";
import qs from "qs";
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqMenuAdd,reqMenuDetail,reqMenuUpdate} from "../../../utils/request";
export default {
  props: ["info","list"],
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      //图标集合
      icons: [
        "el-icon-s-tools",
        "el-icon-message-solid",
        "el-icon-s-check",
        "el-icon-s-data"
      ],
      //地址集合
      indexRoutes: indexRoutes
    };
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    //上级菜单发生修改
    changePid() {
      //如果是顶级菜单，那么类型应该是目录；否则，应该是菜单。
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //添加
    add() {
      //发请求
      reqMenuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          //成功
          //弹框消息
          this.cancel();
          //弹个成功
          successAlert("添加成功");
          //重置form
          this.empty();
          //刷新list数据
          this.$emit("init")
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    //获取一条的数据
    getOne(id){
        //发起获取一条数据的请求
       reqMenuDetail(id).then(res=>{
           //目前form上是没有id字段
           this.form=res.data.list
           //补id
           this.form.id=id
       })
    },
    //点击了修改
    update(){
       reqMenuUpdate(this.form).then(res=>{
            if(res.data.code===200){
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                //弹成功
                successAlert("修改成功")
                //刷新list 
                this.$emit("init")
            }else{
                errorAlert(res.data.msg)
            }
        })
    }
  }
};
</script>

<style scoped>
</style>