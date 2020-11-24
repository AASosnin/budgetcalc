<template>
  <div id="app">
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
import Expenses from "./components/Expenses";
import InputExpenses from "./components/InputExpenses";
import BudgetFilteres from "./components/BudgetFilteres";

export default {
  name: 'App',
  components: {BudgetFilteres, InputExpenses, Expenses},
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  color: #808080;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.expenses-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
