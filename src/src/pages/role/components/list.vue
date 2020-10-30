<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
     
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqRoleDel } from "../../../utils/request";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    //点了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //点了删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发起请求删除数据
         reqRoleDel(id).then(res=>{
              if(res.data.code===200){
                  successAlert("删除成功")
                  this.$emit("init")
              }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>