<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            ref="tree"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加角色'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { indexRouters } from "../../../router/index";
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
     
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
       menulist: [],
    };
  },
  methods: {
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    //清空树
    emptyTree() {
      //清空树
      this.$refs.tree.setCheckedKeys([]);
    },
    //弹框动画执行完成
    opened() {
      //添加打开，要置空树，编辑打开，什么都不做
      if (this.info.title === "添加角色") {
        this.emptyTree();
      }
    },
    cancel() {
      this.info.isshow = false;
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          alertSuccess(res.data.msg);
          this.empty();
          //清空树
          this.emptyTree();
          //刷新list数据
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          //由于form和tree之间没有关联。所以这个时候要将form.menus取出来，给tree赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    //点击了修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //清空树
          this.emptyTree();
          //弹成功
          alertSuccess("修改成功");
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    //一进来就请求菜单的列表数据
    reqMenuList().then((res) => {
      this.menuList = res.data.list;
      // console.log(111);
    });
  },
};
</script>
<style scoped>
</style>