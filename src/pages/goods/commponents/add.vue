<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            v-model="form.first_cateid"
            @change="changeOne"
            placeholder="请选择活动区域"
          >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>

            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="120px">
          <!-- multiple 表单中下拉菜单、input的type是file ,想要多选，设置 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in attrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

       
        <el-form-item label="商品描述" label-width="120px">
        
          <div v-if="info.isshow" id="editor"></div>
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
import E from "wangEditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqGoodsAdd,
  reqGoodsUpdate,
  reqGoodsDetail,
  reqCateList,
} from "../../../util/request";
import { alertSuccess, alertwaring } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      list: "classify/list",
      specslist: "spces/list",
      // goodslist: "goods/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
      //规格属性的list
      attrList: [],
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      //请求分类的list
      getClassifyList: "classify/requestClaList",
      //获取的规格的列表
      getSpecList: "spces/reqlistAction",
      //获取商品分类列表
      getGoodsList: "goods/reqlistAction",
      //商品总数
      reqTotalAction: "goods/reqTotalAction",
    }),
    cancel() {
      this.info.isshow = false;
    },
    //弹框打开完成，开始创建富文本编辑器
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //一级分类发生修改
    changeOne() {
      //二级分类的id应该置空
      this.form.second_cateid = "";
      this.getSecondList()
    },
    //根据一级的id来获取二级分类展示列表数据
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
        console.log(this.secondCateList);
      });
    },
    //商品规格发生改变
    changeSpec(){
    //当规格变了，属性要置空
    this.form.specsattr=[];
    this.getAttrsList()
    },
    //根据选中的商品规格，计算一下展示属性列表
    getAttrsList() {
      //取出this.specList 里面 的id是 form.specsid 的那条数据
      // console.log(this.specslist);
      let obj = this.specslist.find((item) => item.id === this.form.specsid);
      //要那条数据上的attrs
      // console.log(obj.attrs);
      this.attrList = obj.attrs;
    },
    changeFile(e) {
      let file = e.target.files[0];
      if(file.size>2*1024*1024){
        alertwaring("文件不能超过2M");
        return;
      }
      let arr=[".jpg",".png",".gif",".jpeg"];
      if(!arr.includes(file.name.slice(file.name.lastIndexOf(".")))){
        alertwaring("请上传正确的图片")
        return
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      //二级分类的list
      this.secondCateList = [];
      //规格属性的list
      this.attrList = [];
    },
     //验证
    checked(){
      return new Promise((resolve,reject)=>{
        //验证数据是否均不为空
        if(this.form.first_cateid===""){
          alertwaring("一级分类不能为空")
          return;
        }
        if(this.form.second_cateid===""){
          alertwaring("二级分类不能为空")
          return;
        }
        if(this.form.goodsname===""){
          alertwaring("商品名称不能为空")
          return;
        }
        if(this.form.price===""){
          alertwaring("价格不能为空")
          return;
        }
        if(this.form.market_price===""){
          alertwaring("市场不能为空")
          return;
        }
        if(!this.form.img){
          alertwaring("请选择图片")
          return;
        }
        if(this.form.specsid===""){
          alertwaring("规格不能为空")
          return;
        }
        if(this.form.specsattr.length===0){
          alertwaring("请选择商品属性")
          return;
        }

        if(this.form.description===""){
          alertwaring("描述不能为空")
          return;
        }
        resolve()
      })

      
    },
     add() {
      //获取一下富文本编辑器的内容给form.description 
      this.form.description=this.editor.txt.html()

        this.checked().then(()=>{
        let obj={
        ...this.form
        }
        obj.specsattr=JSON.stringify(obj.specsattr)
        
        let data=new FormData()
        for(let i in obj){
          data.append(i,obj[i])
        }
        //ajax
        reqGoodsAdd(data).then(res=>{
            if(res.data.code==200){
              this.empty()
              this.cancel()
              alertSuccess(res.data.msg)
              //刷list 
              this.getGoodsList()
              //请总数
              this.reqTotalAction()
            }
        })
        })
     
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqGoodsDetail(id).then((res) => {
        //目前form上是没有id字段
        //form上没有id
        this.form = res.data.list;
        // 1.补id
        this.form.id = id;

        // 2.根据一级分类的id 获取二级分类展示的列表
        this.getSecondList();

        // 3.图片
        this.imgUrl = this.$imgPre + this.form.img;

        //4. 根据规格，获取属性值的列表
        this.getAttrsList();

        // 5.form.specsattr 需要JSON.parse()
        this.form.specsattr = JSON.parse(this.form.specsattr);
        //6.将form.description 赋值给富文本编辑器
        if (this.editor) {
          this.editor.txt.html(this.form.description);
        }
      });
    },
    update() {
      //获取一下富文本编辑器的内容给form.description
      this.form.description = this.editor.txt.html();

      this.checked().then(()=>{
        let obj = {
          ...this.form,
        };
        obj.specsattr = JSON.stringify(obj.specsattr);

        let data = new FormData();
        for (let i in obj) {
          data.append(i, obj[i]);
        }
        reqGoodsUpdate(data).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.empty();
            alertSuccess(res.data.msg);
            this.getGoodsList();
          }
        })
        });
      
    },
  },
  mounted() {
    // 一进来就发起分类请求
    this.getClassifyList();
    //规格请求
    this.getSpecList(true);
  },
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