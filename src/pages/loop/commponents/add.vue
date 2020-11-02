<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="myUpload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
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
        <el-button type="primary" @click="add" v-if="info.title == '添加分类'"
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
  reqBannerAdd,
  reqMenuList,
  reqBannerUpdate,
  reqBannerDetail,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      //获取分类list
      reqList: "banner/requestClaList",
    }),
    cancel() {
      this.info.isshow = false;
    },

    changeFile(e) {
    
      let file = e.target.files[0];
      // console.log(file);
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);

      //给form的img赋值文件
      this.form.img = file;
    },
    // changePid() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }

    empty() {
      this.form = {
         title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    add() {
      console.log(this.form);
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqBannerAdd(data).then((res) => {
        if (res.data.code == 200) {
          alertSuccess(res.data.msg);
          this.cancel();
          this.empty();
          //刷新list
           this.reqList();
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqBannerDetail(id).then((res) => {
        //目前form上是没有id字段
        this.form = res.data.list;
        // console.log(res);
        //补id
        this.form.id = id;
        //给图片赋值
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    update() {
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      // console.log(this.form);
      reqBannerUpdate(data).then((res) => {
        if (res.data.code === 200) {
          //弹框消失
          this.cancel();
          //form重置
          this.empty();
          //弹成功
          alertSuccess(res.data.msg);
           //刷新list 
                this.reqList()
        } else {
          alertwaring(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.myUpload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;
}
.myUpload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.myUpload .ipt {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.myUpload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>