<template>
  <el-dialog :title="type== 'add'? '添加商品':'修改商品'"
    v-model="state.visible"
    width="400px"
  >
  <el-form :model="state.ruleForm" :rules="state.rules" ref = 'formRef' label-width="100px" class="good-form"> 
    <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="state.ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="id">
        <el-input type="number" min="0" v-model="state.ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
      </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="state.visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </template>
  </el-dialog>
</template>

<script setup>
  import { reactive,ref } from 'vue'
  import axios from '@/utils/axios'
  import { ElMessage } from 'element-plus'

  const prop = defineProps({
    type: String,
    configType:Number,
    reload:Function
  })

  const formRef = ref(null)
  const state = reactive({
    visible:false,
    ruleForm: {
      name:'',
      link:'',
      id:'',
      sort:''
    },
    rules: {
      name:[
        {required:'true',message:'名称不能为空',trigger:['change']}
      ],
      id:[{
        required:'true',message:'编号不能为空',trigger:['chaneg']
      }],
      sort:[{
        required:'true',message:'排序不能为空',trigger:['change']
      }]
    },
    id:''
  })
  //获取详情
  const getDetail = (id) => {
    axios.get(`/indexConfigs/${id}`).then(res=>{
      state.ruleForm = {
        name:res.configName,
        id:res.goodsId,
        link:res.redirectUrl,
        sort:res.configRank
      }
    })
  }
  //开启弹窗

</script>