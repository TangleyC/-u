<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            @change="changePid"
            placeholder="请选择活动区域"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option
              v-for="item in icons"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
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
  reqMenuAdd,
  reqMenuList,
  reqMenuUpdata,
  reqMenuListOne,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
      form: {
       first_cateid:"",
        second_cateid:"",
        goodsname:"",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],//发起请求之前需要JSON.stringify()
        isnew:1,
        ishot:1,
        status:1
      },
       //二级分类的list
      secondCateList:[],

      //规格属性的list
      attrList:[],

      //上传图片的临时地址
      imgUrl:"",
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    empty() {
      this.form = {
       first_cateid:"",
        second_cateid:"",
        goodsname:"",
        price:"",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],//发起请求之前需要JSON.stringify()
        isnew:1,
        ishot:1,
        status:1
      };
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.cancel();
          alertSuccess(res.data.msg);
          //重置form
          this.empty();
          //刷新list数据
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqMenuListOne(id).then((res) => {
        //目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },
    update() {
      reqMenuUpdata(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
          //刷新list
          this.$emit("init");
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
  },
  mounted() {
    
  },
};
</script>
<style scoped>
</style>