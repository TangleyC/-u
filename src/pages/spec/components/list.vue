<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
         <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
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
        @current-change="changePage"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

import { successAlert, errorAlert } from "../../../utils/alert";
import { reqSpecDel } from "../../../utils/request";
import {mapGetters,mapActions} from "vuex"
export default {
  computed:{
    ...mapGetters({
      list:"spec/list",
      total:"spec/total",
      size:"spec/size",
    })
  },
  methods: {
    ...mapActions({
      reqList:"spec/reqListAction",
      reqTotalAction:"spec/reqTotalAction",
      changePageAction:"spec/changePageAction"
    }),
    //修改页码
    changePage(page){
      this.changePageAction(page)
    },
    //点了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id){
      reqSpecDel(id).then(res=>{
        if(res.data.code==200){
          successAlert("删除成功")
          //刷新list
          this.reqList()
          //删除完成以后重新请求总数
          this.reqTotalAction()
        }
      })
    }
  },
  mounted(){
    this.reqList()
    //请求总数
    this.reqTotalAction()
    // console.log(this.$store);
  }
};
</script>

<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>