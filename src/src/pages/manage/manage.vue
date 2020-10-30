<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table表格 -->
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>

    <!-- form  -->
    <v-add ref="add" :info="info" :list="list" @init="getInit"></v-add>

    <!-- 分页 
      page-size :设置一页有几条数据 ，默认是10 
      total:总数
      current-change :当前页码发生改变的时候触发
    -->
    <el-pagination
        layout="prev, pager, next"
        :page-size="size"
        @current-change="changePage"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";

import {reqManageList,reqManageCount} from "../../utils/request"
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
        title: "添加管理员"
      },
      //列表数据
      list: [],
      //总数
      total:0,
      //一页的数量
      size:2,
      //页码
      page:1
    };
  },
  methods: {
    //点击了添加
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加管理员";
      //调用add的empty
      this.$refs.add.empty()
    },
    //一进来就发请求 8 7 6
    getInit() {
      //获取总数
      reqManageCount().then(res=>{
        if(res.data.code==200){
          this.total=res.data.list[0].total
        }
      })
      this.getList()
    },
    //获取list
    getList(){
       //获取列表 page 4
     reqManageList({page:this.page,size:this.size}).then(res => {
        if(res.data.code==200){
          // this.list = res.data.list;

          //如果取到了的数据是null,那么应该赋值一个空数组
          let list=res.data.list?res.data.list:[]

          //如果list是空数组，这个时候应该看一下，当前页是不是第一页。
          //如果是在第一页，就赋值
          //如果不是第一页，假设是第4页，这时候，应该访问第3页的2条数据
         
          if(list.length===0&&this.page>1){
            this.page--
            this.getList();
            return;
          }
         this.list=list;

        }
      });
    },
    //页码变了
    changePage(page){
      this.page=page;
      //重新获取list
      this.getList()
    },
    //点了编辑
    willUpdate(uid) {
      this.info.isshow = true;
      this.info.title = "编辑管理员";
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(uid)
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