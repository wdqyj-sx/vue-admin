<template>
  <el-card class="index-container">
    <el-table :load="state.loading" :data="state.tableData" tooltip-effect="dark" style="width:100%">
      <el-table-column prop="configName" label="商品名称">
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank">{{scope.row.redirectUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="configRank" label="排序值" width="120">

      </el-table-column>
      <el-table-column prop="goodsId" label="商品编号" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a style="cursor:pointer;margin-right:10px" @click="handleEdit(scope.row.configId)">修改</a>
          <el-popconfirm title="确定删除吗？" confirmButtonText="确定" cancelButtonText="取消"
            @confirm="handleDeleteOne(scope.row.configId)">
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
      :current-page="state.currentPage" @current-change="changePage" />
  </el-card>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
const router = useRouter()
const route = useRoute()
//监听路由变化
const unwatch = router.beforeEach((to) => {
  if(['hot','new','recommend'].includes(to.name)){
    //通过to.name匹配不同路径下，configType参数也随之变化
    state.configType = configTypeMap[to.name]
    state.currentPage = 1
    getIndexConfig()
  }
})
//初始化
onMounted(()=>{
  state.configType = configTypeMap[route.name]
  getIndexConfig()
})

//首页热销商品列表
const getIndexConfig = ()=>{
  state.loading = true;
  axios.get('/indexConfigs',{
    params:{
      pageNumber: state.currentPage,
      pageSize:state.pageSize,
      configType:state.configType
    }
  }).then(res=>{
    state.tableData = res.list
    state.total = res.totalCount
    state.currentPage = res.currPage
    state.loading = false
  })
}
onUnmounted(() => {
  unwatch()
})

const state = reactive({
  loading:false,
  tableData:[],
  total:0,
  currentPage:1,
  pageSize:10,
  type:'add',
  configType:3
})
//首页配置类选项
const configTypeMap = {
  hot: 3,
  new: 4,
  recommend:5
}

</script>