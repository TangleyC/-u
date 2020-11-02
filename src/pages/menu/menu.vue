<template>
  <div>
    <el-button @click="WillAdd">添加</el-button>
    <v-list :list='list' @init='getInit' @edit="willUpdate($event)"></v-list>
    <v-add ref="add" :info='info' :list="list" @init='getInit'></v-add>
  </div>
</template>
<script>
import vList from "./commponents/list";
import vAdd from "./commponents/add";
import {reqMenuList} from "../../util/request"
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
      list:[]
    };
  },
  methods: {
    WillAdd() {
      this.info.isshow = true;
      this.info.title = "添加菜单";
    },
    willUpdate(id){
      this.info.isshow=true,
      this.info.title='编辑菜单'
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
       this.$refs.add.getOne(id)
    },
    getInit(){
      reqMenuList().then(res=>{
        this.list=res.data.list
        // console.log(res.data.list);
      })
    }
  },
  mounted() {
     //一进来 获取list数据
    this.getInit();
  },
};
</script>
<style scoped>
</style>