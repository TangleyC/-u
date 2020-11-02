<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="line">
            <div class="ipt-box">
              <el-input v-model="item.val" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增规格属性</el-button
            >
            <el-button type="danger" @click="delArr(index)" v-else
              >删除</el-button
            >
          </div>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加规格'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSpecAdd,
  reqSpecUpdate,
  reqSpecDetail,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],

  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      // 规格属性值
      attrArr: [{ val: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "spces/list",
    }),
  },
  methods: {
    ...mapActions({
      //获取分类list
      reqList: "spces/reqlistAction",
        reqTotal: "spces/reqTotalAction",
    }),
    cancel() {
      this.info.isshow = false;
    },
    //新增规格属性
    addArr() {
      this.attrArr.push({ val: "" });
    },
    // 删除规格属性
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    changeFile(e) {
      let file = e.target.files[0];
      // console.log(file);
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);

      //给form的img赋值文件
      this.form.imgUrl = file;
    },
    // changePid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }

    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrArr = [{ val: "" }];
    },
    add() {
      //[{val:"1"},{val:"2"}]  --->["1","2"]
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      console.log(this.form);
      reqSpecAdd(this.form).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.empty();
          this.cancel();
          alertSuccess(res.data.msg);
          //刷新list
          this.reqList();
          //总数
          this.reqTotal()
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqSpecDetail(id).then((res) => {
        // console.log(res);
        //目前form上有id字段
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map((item) => {
          return { val: item };
        });
      });
    },
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      reqSpecUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
          //刷新list
          this.reqList();
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.ipt-box {
  flex: 1;
}
.line {
  display: flex;
}
</style>