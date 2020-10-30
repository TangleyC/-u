<template>
  <el-button type="danger" @click="willDel">删除</el-button>
</template>

<script>
export default {
    methods:{
        willDel(){
            this.$confirm("你确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
               //通知父组件 点了确定了
               this.$emit("confirm")
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
                });
        }
    }
}
</script>

<style>

</style>