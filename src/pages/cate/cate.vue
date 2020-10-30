<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table表格 -->
    <v-list :list="list" @edit="willUpdate($event)" @init="getInit"></v-list>

    <!-- form  -->
    <v-add ref="add" :info="info" :list="list" @init="getInit"></v-add>

    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"> 
  </el-pagination>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>