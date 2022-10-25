<template #header>
  <el-card class="swiper-container">
    <div class="header">
        <el-button type="primary" size="small" icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText="确定"
          cancelButtonText="取消"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    <el-table
      ref="multipleTable"
      :load="state.loading"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
    <el-table-column type="selection" width="55">

    </el-table-column>
    <el-table-column label="轮播图" width="200" >
      <template #default="scope">
        <img style="width: 150px;height:150px" :src="scope.row.carouselUrl" alt="轮播图" />
      </template>
    </el-table-column>
    <el-table-column label="跳转链接">
      <template #default="scope">
        <a target="_blank" :href="scope.row.redirectUrl">{{scope.row.redirectUrl}}</a>
      </template>
    </el-table-column>
    <el-table-column prop="carouselRank" label="排序值" width="120">

    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="200">

    </el-table-column>
    </el-table>
    <el-pagination 
      background
      layout="prev,pager,next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
  <DialogAddSwiper ref="addSwiper" :reload="getCarousels" :type="state.type" />
</template>
<script setup>
  import { onMounted,reactive,ref } from 'vue'
  import axios from '@/utils/axios'
  import { ElMessage } from 'element-plus'
  import DialogAddSwiper from '@/components/DialogAddSwiper.vue'

  const addSwiper = ref(null)
  const state = reactive({
    loading:false,//控制动画加载
    tableDara:[], //数据列表
    currentPage:1, //当前页数
    pageSize:10 ,//每页请求数
    type:'add',
    total:0
  })
  onMounted(()=>{
    getCarousels()
  })

  //选中之后的change方法，一旦选项有变化，就会触发该方法
  const handleSelectionChange = (val) => {
    state.multipleTable = val
  }
  //批量删除
  const handleDelete=()=>{
    if(!state.multipleTable.length){
      ElMessage.error('请选择项')
      return 
    }
    axios.delete('/carousels',{
      data: {
        ids:state.multipleTable.map(i=>i.carouselId)
      }
    }).then(()=>{
      ElMessage.success('删除成功')
      getCarousels()
    })
  }
  const getCarousels = ()=>{
     state.loading = true
     axios.get('/carousels',{
      params:{
        pageNumber: state.currentPage,
        pageSize:state.pageSize
      }
     }).then(res=>{
      state.tableData = res.list
      state.total = res.totalCount
      state.currentPage = res.currPage
      state.loading = false
     })
    }
  //添加轮播项
  const handleAdd = ()=>{
    state.type='add'
    addSwiper.value.open()
  }
  const changePage=(val)=>{
    state.currentPage = val
    getCarousels()
  }
  //修改轮播图
  const handleEdit = (id)=>{
    state.type = 'edit'
    addSwiper.value.open(id)
  }
</script>