<template>
  <div class="calc-page">
    <div class="buttons-line">
      <ElButton class="el-button--info el-button--info-right" @click="$router.push({ name: 'startPage'})">Exit</ElButton>
    </div>
    <h1>Your budget calculator</h1>
    <div class="expenses-row">
      <div class="expenses-col">
        <InputExpenses></InputExpenses>
      </div>
      <div class="expenses-col">
        <BudgetFilteres />
      </div>
    </div>
    <div class="expenses-row">
      <Expenses></Expenses>
    </div>
  </div>
</template>

<script>
  import Expenses from "../components/Expenses";
  import InputExpenses from "../components/InputExpenses";
  import BudgetFilteres from "../components/BudgetFilteres";

  export default {
    name: "CalcPage",
    components: {BudgetFilteres, InputExpenses, Expenses},
  }

</script>

<style>
  .calc-page{

  }
  .expenses-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
 .buttons-line {
   margin: 0 auto;
   display: flex;
   width: 60%;
   justify-content: end;
 }
</style>
