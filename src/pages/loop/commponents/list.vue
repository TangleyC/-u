<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图名称"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="$imgPre + scope.row.img"
            alt=""
            v-if="scope.row.img !== 'null'"
          />
       
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @confirm="del2(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqBannerDel } from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "banner/requestClaList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
   

    //点了删除
    // del(id) {
    //   this.$confirm("你确定要删除吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       //发起请求删除数据
    //       reqCateDel(id).then((res) => {
    //         if (res.data.code === 200) {
    //           alertSuccess("删除成功");
    //           this.reqList();
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  
    del2(id) {
      //发起请求删除数据
      reqBannerDel(id).then((res) => {
        if (res.data.code === 200) {
          alertSuccess("删除成功");
          this.reqList();
        }
      });
    },
  },
  mounted() {
    this.reqList();
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