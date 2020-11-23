<template>
  <div class="budget-total-wrap">
    <ElSelect v-model="totalType">
      <ElOption label="Total BUDGET" value="total"></ElOption>
      <ElOption label="Total PROFIT" value="income"></ElOption>
      <ElOption label="Total EXPENSES" value="outcome"></ElOption>
    </ElSelect>
    <p :class="colorClass">{{totalCount.text}}{{totalCount.value}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "BudgetTotal",
    data: () => ({
      totalType: "total"
    }),
    computed: {
      ...mapGetters('expensesStore', ['totalBudget', 'totalProfit', 'totalExpenses']),
      totalCount() {
        if (this.totalType === "income") {
          return {
            text: "Total PROFIT : ",
            value: this.totalProfit
          }
        } else if (this.totalType === "outcome") {
          return {
            text: "Total EXPENSES : ",
            value: this.totalExpenses
          }
        } else
          return {
            text: "Total BUDGET : ",
            value: this.totalBudget
          }
      },
      colorClass() {
        if (this.totalCount.value > 0) {
          return "green"
        }
        else if (this.totalCount.value < 0) {
          return "red"
        } else {return ""}
      }
    }
  }
</script>

<style scoped>
    .budget-total-wrap {
      padding-top: 25px;
      font-size: 26px;
    }
    .red {
      color: red;
    }
    .green {
      color: green;
    }
</style>