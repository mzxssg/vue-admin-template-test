<template>
  <div class="app-container">
    医院设置添加
    <el-form
       label-width="120px">         
      <el-form-item
         label="医院名称">            
        <el-input
           v-model="hospitalSet.hosname"/>
         </el-form-item>        
      <el-form-item
         label="医院编号">            
        <el-input
           v-model="hospitalSet.hoscode"/>         
      </el-form-item>         
      <el-form-item
         label="api基础路径">            
        <el-input
           v-model="hospitalSet.apiUrl"/>         
      </el-form-item>         
      <el-form-item
         label="联系人姓名">            
        <el-input
           v-model="hospitalSet.contactsName"/>         
      </el-form-item>         
      <el-form-item
         label="联系人手机">            
        <el-input
           v-model="hospitalSet.contactsPhone"/>         
      </el-form-item>        
      <el-form-item>            
        <el-button
           type="primary"  @click="saveOrUpdate">保存
        </el-button>         
      </el-form-item>      
    </el-form>
  </div>
</template>
<script>
  import hospset from '@/api/hospset'

  export default {
    data(){
      return{
        hospitalSet:{}
      }
    },
    created(){//页面渲染之前执行
      //获取路由id值
      //调用接口得到医院设置信息
      if(this.$route.params && this.$route.params.id){
          const id = this.$route.params.id;
          this.getHospSet(id)
      }else {
        this.hospitalSet = {}
      }
    },
    // watch:{
    //   '$route'( to , from ) {
    //     this.hospitalSet = {}
    //   }
    // },
    methods:{
      //根据id查询
      getHospSet(id){
        hospset.getHospSetById(id)
          .then(response=>{
            this.hospitalSet = response.data
          })
      },
      //添加
      save(){
        this.$confirm( '此操作将添加医院设置信息, 是否继续', '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          hospset.saveHospSet(this.hospitalSet)
            .then(respones => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              //跳转列表页面,使用路由跳转方式实现
              this.$router.push({path:'/hospSet/list'})

            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: '添加失败!'
              })
            })
        })
      },
      //修改
      update(){
        this.$confirm( '此操作将修改医院设置信息, 是否继续', '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          hospset.updateHospSet(this.hospitalSet)
            .then(respones => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              //跳转列表页面,使用路由跳转方式实现
              this.$router.push({path:'/hospSet/list'})

            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: '修改失败!'
              })
            })
        })
      },
      saveOrUpdate(){
        //判断添加还是修改
        if(!this.hospitalSet.id){//没有id，做添加
          this.save()
        }else {//有id，做修改
          this.update()
        }
      }
    }
  }
</script>
