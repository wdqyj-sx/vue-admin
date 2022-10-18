<script setup >
  import {reactive,ref} from 'vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import { localGet ,patchMap} from '@/utils'
  import { useRouter } from 'vue-router';
  //不需要菜单的路径数组
  const noMenu = ['/login']
  const router = useRouter()
  const state = reactive({
    showMenu:true
  })
  //监听路由变化
  router.beforeEach((to,from,next) => {
    if(to.path == '/login'){
      next()
    }else {
      if(!localGet('token')){
        next({path:'/login'})
      }else {
        next()
      }
    }

    state.showMenu = !noMenu.includes(to.path)
    document.title = patchMap[to.name]
  })
</script>

<template>
  <div class="layout">
    <el-container class="container" v-if="state.showMenu">
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>vue3 admin</span>
          </div>
        </div>
        <!--一条为了美观的线条-->
        <div class="line" />
        <el-menu
          background-color="#222832"
          text-color="#fff"
          :router="true"
        >
          <!--一级栏目-->
          <el-sub-menu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <!--二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/"><el-icon><DataLine /></el-icon>系统介绍</el-menu-item>
              <el-menu-item index="/add"><el-icon><DataLine /></el-icon>添加商品</el-menu-item>
            </el-menu-item-group>
          
          </el-sub-menu>
          
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view />
        </div>
        <Footer/>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view></router-view>
    </el-container>
  </div>

</template>

<style>
  .layout {
    min-height: 100vh;
    background-color: #ffffff;
  }
  .container {
    height: 100vh;
  }
  .aside {
    width:200px !important;
    background-color: #222832;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .head >div {
    display: flex;
    align-items: center;
  }
  .head img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .head span {
    font-size: 20px;
    color: #ffff;
  }
  .line {
    border-top: 1px solid hsla(0,0%,100%,0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.content {
  display: flex;
  flex-direction: column !important;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

