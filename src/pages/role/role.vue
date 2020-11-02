<template>
  <div>
    <el-button @click="WillAdd">添加</el-button>
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>
    <v-add ref="add" :info="info" @init="getInit" ></v-add>
  </div>
</template>
<script>
import vList from "./commpent/list";
import vAdd from "./commpent/add";
import { reqRoleList } from "../../util/request";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加数据",
      },
       //列表数据
      list: []
     
    };
  },
  methods: {
    WillAdd() {
      this.info.isshow = true;
      this.info.title = "添加角色";
    },
    willUpdate(id) {
      this.info.isshow = true, 
      this.info.title = "编辑角色";
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(id);
    },
    getInit() {
      reqRoleList().then((res) => {
         if(res.data.code==200){
          this.list = res.data.list;
        }
        // console.log(res.data.list);
      });
    },
  },
  mounted() {
    //一进来 获取list数据
    this.getInit();
  },
};
</script>
<style scoped>
</style>