<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- :props="{children: 'child',label: 'label'}"
            children:用哪个字段来判断有没有下个子节点 
            label :用哪个字段来展示文字


            data:需要时树形结构的数据
            node-key 选中的时候 getCheckedKeys() 获取的哪个字段拼成的数组
          -->
          <el-tree
          :data="menuList"
          ref="tree"
          show-checkbox
          node-key="id"
          :props="{children: 'children',label: 'title'}">
        </el-tree>
        </el-form-item>
       
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqMenuList,reqRoleAdd,reqRoleDetail,reqRoleUpdate} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
       rolename:"",
       menus:'',
        status: 1
      },
      //树形控件的数据
      menuList:[],
    };
  },
  mounted(){
    //一进来就请求菜单的列表数据
    reqMenuList().then(res=>{
      this.menuList=res.data.list
    })
  },
  methods: {
    //重置form
    empty() {
      this.form =  {
       rolename:"",
       menus:'',
      status: 1
      }
      
    },
    //清空树
    emptyTree(){
      //清空树
       this.$refs.tree.setCheckedKeys([])
    },
    //弹框动画执行完成
    opened(){
      //添加打开，要置空树，编辑打开，什么都不做
      if(this.info.title==="添加角色"){
        this.emptyTree()
      }
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    
    //添加
    add() {
     if(this.form.rolename===""){
       errorAlert("用户名称不能为空哦！")
       return
     }
     if(this.$refs.tree.getCheckedKeys().length===0){
        errorAlert("角色必须分配权限")
       return
     }
      //目前tree上的数据，与form无关。
      // 我们需要将tree上的数据取出来，给form.menus，然后再将form传递给后端，实现添加 

      // this.$refs.tree.getCheckedNodes() 获取选中节点的所有数据
      // this.$refs.tree.getCheckedKeys() 选中节点的key值
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())

      //发起添加请求
      reqRoleAdd(this.form).then(res=>{
          if (res.data.code == 200) {
          //成功
          //弹框消息
          this.cancel();
          //弹个成功
          successAlert("添加成功");
          //重置form
          this.empty();
          //清空树
          this.emptyTree()
          //刷新list数据
          this.$emit("init")
        } 
       })
     
    },
    //获取一条的数据
    getOne(id){
        //发起获取一条数据的请求
       reqRoleDetail(id).then(res=>{
         if(res.data.code==200){
           //注意：form上是没有id
           this.form=res.data.list;
           //补id
           this.form.id=id;
           
           //由于form和tree之间没有关联。所以这个时候要将form.menus取出来，给tree赋值
           this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
         }
        })
      
    },
    //点击了修改
    update(){
      
      //将tree上的数据取出给form，然后再发请求
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())

       reqRoleUpdate(this.form).then(res=>{
            if(res.data.code===200){
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                 //清空树
                this.emptyTree()
                //弹成功
                successAlert("修改成功")
                //刷新list 
                this.$emit("init")
            }
        })
    }
  }
};
</script>

<style scoped>
</style>