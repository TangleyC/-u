<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域" >
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        
        
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加管理员'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import { successAlert, errorAlert } from "../../../utils/alert";
import { reqCateAdd,reqCateDetail,reqCateUpdate} from "../../../utils/request";
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

    //element-ui处理文件
    changeFile2(e){
      let file=e.raw;

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
       reqCateDetail(id).then(res=>{
          //  目前form上是没有id字段
           this.form=res.data.list
           //补id
           this.form.id=id

          //给图片赋值
          this.imgUrl=this.$imgPre+this.form.img
          
       })
    },
    //点击了修改
    update(){

      let data=new FormData()
      for(let i in this.form){
        data.append(i,this.form[i])
      }
       reqCateUpdate(data).then(res=>{
            if(res.data.code===200){
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                //弹成功
                successAlert("修改成功")
                //刷新list 
                this.reqList()
            }else{
                errorAlert(res.data.msg)
            }
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
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

// element-ui
  .add >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>