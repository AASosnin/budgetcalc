<template>
  <ElCard class="form-expenses-wrap">
    <ExpensesForm @onExpensesFormSubmit="addNewItem"></ExpensesForm>
  </ElCard>
</template>

<script>
  import ExpensesForm from "@/components/ExpensesForm";
  import { mapActions } from "vuex";

  export default {
    name: "InputExpenses",
    components: { ExpensesForm },
    methods: {
      ...mapActions('expensesStore', ['addNewItem'])
    }
  }
</script>

<style>
  .form-expenses-wrap {
    max-width: 400px;
    min-width: 300px;
    margin: 20px;
  }
</style>