<template>
  <div id="app">
    <div class="expenses-row">
      <div class="expenses-col">
        <InputExpenses></InputExpenses>
      </div>
      <div class="expenses-col">
        <BudgetTotal />
        <Expenses></Expenses>
      </div>
    </div>
  </div>
</template>

<script>
import Expenses from "./components/Expenses";
import BudgetTotal from "./components/BudgetTotal";
import InputExpenses from "./components/InputExpenses";

export default {
  name: 'App',
  components: {InputExpenses, BudgetTotal, Expenses},
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
