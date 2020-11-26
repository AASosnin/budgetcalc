<template>
  <div class="start-page">
    <img src="../img/budgetcalc_logo_1.png" alt="logo">
    <h1>It's time to sum&nbsp;up your&nbsp;budget</h1>
    <ElButton class="el-button--danger" @click="$router.push({ name: 'calcPage' })">Click to Start</ElButton>
  </div>
</template>

<script>
  export default {
    name: "StartPage"
  }
</script>

<style scoped>
  img {
    max-height: 40vh;
    max-width: 80vw;
  }
</style>
