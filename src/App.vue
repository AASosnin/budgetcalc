<template>
  <div id="app">
    <FormExpenses @onFormSubmit="addNewItem"></FormExpenses>
    <BudgetTotal />
    <Expenses></Expenses>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Expenses from "./components/Exepenses";
import BudgetTotal from "./components/BudgetTotal";
import FormExpenses from "./components/FormExpenses";

export default {
  name: 'App',
  components: {FormExpenses, BudgetTotal, Expenses},
  computed: {
    ...mapGetters('expensesStore', ['expensesAll']),
  },
  methods: {
    ...mapActions('expensesStore', ['addNewItem']),
  }
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
</style>
