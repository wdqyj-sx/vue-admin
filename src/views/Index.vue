<template>
  <h1>哈喽</h1>
  <el-button type="primary">主要按钮</el-button>
</template>

<script>
  const ENV = import.meta.env
  export default {
    name:'Index',
    setup(){
      console.log(ENV)
    }
  }
</script>