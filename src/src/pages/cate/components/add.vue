<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
         <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择活动区域" >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 第一种：原生js -->
        <el-form-item label="图片" label-width="120px" v-if="form.pid!=0">
          <div class="my-upload">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="">
            <!-- 由于很难置空input上的文件，所以直接将input 卸载 -->
            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile">
          </div>
        </el-form-item>

        <!-- 第二种方式：element-ui  -->
       
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加分类'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqCateAdd,reqMenuDetail,reqMenuUpdate} from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename:"",
        img:null,
        status:1
      },
      //图片地址
      imgUrl:""
     
    };
  },
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  methods: {

    ...mapActions({
      //获取分类list
      "reqList":"cate/reqListAction"
    }),
    //选择了文件
    changeFile(e){
     
      let file=e.target.files[0]
      

      //判断文件大小 1M=1024Kb 1KB=1024B
      if(file.size>2*1024*1024){
        errorAlert("文件大小不能超过2M")
        return;
      }


      //判断文件格式
      let imgArr=[".jpg",".jpeg",".png",".gif"];
      let name=file.name;//'0.0.0.1.jpg'
      let extname=name.slice(name.lastIndexOf("."))
      if(!imgArr.includes(extname)){
        errorAlert("请上传正确的图片格式");
        return
      }

       //将文件file转为一个地址
       this.imgUrl=URL.createObjectURL(file)

       //给form的img赋值文件
       this.form.img=file;
    },

    //重置form
    empty() {
      this.form = {
        pid: "",
        catename:"",
        img:null,
        status:1
      }
      this.imgUrl="";
    },
    //点击了取消按钮
    cancel() {
      this.info.isshow = false;
    },
    
    //添加
    add() {

      let data=new FormData()
      /*
       data.append("catename",this.form.catename)
       data.append("img",this.form.img)
       data.append("pid",this.form.pid)
       data.append("status",this.form.status)
      */
      for(let i in this.form){
        data.append(i,this.form[i])
      }
       //发请求
       reqCateAdd(data).then(res=>{
         if(res.data.code==200){
           successAlert("添加成功")
           this.cancel()
           this.empty();
           //刷新list
           this.reqList()
         }
       })
     
    },
    //获取一条的数据
    getOne(id){
        //发起获取一条数据的请求
       reqMenuDetail(id).then(res=>{
           //目前form上是没有id字段
           this.form=res.data.list
           //补id
           this.form.id=id
       })
    },
    //点击了修改
    update(){
       reqMenuUpdate(this.form).then(res=>{
            if(res.data.code===200){
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                //弹成功
                successAlert("修改成功")
                //刷新list 
                this.$emit("init")
            }else{
                errorAlert(res.data.msg)
            }
        })
    }
  }
};
</script>

<style scoped>
.my-upload{
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  
  position: relative;
}
.my-upload h3{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.my-upload .ipt{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.my-upload img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>