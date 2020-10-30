<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table表格 -->
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>

    <!-- form  -->
    <v-add ref="add" :info="info" @init="getInit"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import axios from "axios";
import {reqRoleList} from "../../utils/request"
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      //传递给add 的数据，由于子组件add 要直接修改isshow，所以不能传递简单类型，需要传递一个引用类型
      //这样才可以实现 子组件直接修改，也起作用
      info: {
        //add 组件的弹框出现的状态
        isshow: false,
        title: "添加角色"
      },
      //列表数据
      list: []
    };
  },
  methods: {
    //点击了添加
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加角色";
      //调用add的empty
      this.$refs.add.empty()
    },
    //一进来就发请求
    getInit() {
     reqRoleList().then(res => {
        if(res.data.code==200){
          this.list = res.data.list;
        }
        
      });
    },
    //点了编辑
    willUpdate(id) {
      this.info.isshow = true;
      this.info.title = "编辑角色";
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    //一进来 获取list数据
    this.getInit();
  }
};
</script>

<style scoped>
</style>