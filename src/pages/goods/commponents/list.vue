<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="" label="商品价格">
        <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
            
        </template>
      </el-table-column>
      <el-table-column prop="catename" label="市场价格">
        <template slot-scope="scope">
            <span>{{scope.row.market_price}}</span>  
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="$imgPre + scope.row.img"
            alt=""
            v-if="scope.row.img !== 'null'"
          />
         
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >是</el-button
          >
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >是</el-button
          >
          <el-button type="info" v-else>否</el-button>
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
      <el-table-column label="操作"   width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
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
        @current-change="changePage"
        :total="total">
    </el-pagination>
  </div>
  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      // reqList: "goods/requestClaList",
      reqlistAction: "goods/reqlistAction",
     //商品总数
      reqTotalAction:"goods/reqTotalAction",
      changePageAction:'goods/changePageAction'
      
    }),
    edit(id) {
      this.$emit("edit", id);
    },
     //修改页码
    changePage(page){
      this.changePageAction(page)
    },

    del2(id) {
      //发起请求删除数据
      reqGoodsDel(id).then((res) => {
        if (res.data.code === 200) {
          alertSuccess("删除成功");
          this.reqlistAction();
        }
      });
    },
  },
  mounted() {
    this.reqlistAction();
    this.reqTotalAction()
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