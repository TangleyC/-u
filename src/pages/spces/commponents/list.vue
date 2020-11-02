<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 
      page-size :设置一页有几条数据 ，默认是10 
      total:总数
      current-change :当前页码发生改变的时候触发
    -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecDel } from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  // props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "spces/list",
      total: "spces/total",
      size: "spces/size",
    }),
  },

  methods: {
    ...mapActions({
      reqList: "spces/reqlistAction",
      reqTotal: "spces/reqTotalAction",
      changePageAction: "spces/changePageAction",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    //修改页码
    changePage(page) {
      this.changePageAction(page)
    },
    //点了删除
    del2(id) {
      //发起请求删除数据
      reqSpecDel(id).then((res) => {
        if (res.data.code === 200) {
          alertSuccess("删除成功");
          this.reqList();
          this.reqTotal()
        }
      });
    },
  },
  mounted() {
    this.reqList();
    this.reqTotal();
    // console.log(this.$store);
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>