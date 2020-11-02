<template>
  <div>
    <el-button @click="WillAdd">添加</el-button>
    <v-list :list="list" @init="getInit" @edit="willUpdate($event)"></v-list>
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
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./commpentents/list";
import vAdd from "./commpentents/add";
import { reqManageList, reqManageCount } from "../../util/request";
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
      list: [],
      //总数
      total: 0,
      //一页的数量
      size: 2,
      //页码
      page: 1,
    };
  },
  methods: {
    WillAdd() {
      this.info.isshow = true;
      this.info.title = "添加菜单";
    },
    willUpdate(uid) {
      (this.info.isshow = true), (this.info.title = "编辑菜单");
      //根据id，add发起获取一条数据的请求
      //父组件要调用子组件的方法或者属性
      this.$refs.add.getOne(uid);
    },
    getInit() {
      reqManageCount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
      this.getList();
    },
    getList() {
      reqManageList({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          //  this.list = res.data.list;
          let list = res.data.list ? res.data.list : [];

          //如果list是空数组，这个时候应该看一下，当前页是不是第一页。
          //如果不是第一页，假设是第4页，这时候，应该访问第3页的2条数据
          if (list.length === 0 && this.page > 1) {
            this.page--;
            this.getList();
            return;
          }

          this.list = list;
        }
      });
    },
    //页码变了
    changePage(page) {
      this.page = page;
      this.getList();
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