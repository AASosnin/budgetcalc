<template>
  <div class="budget-total-wrap">
    <ElSelect v-model="totalType">
      <ElOption label="BUDGET" value="total"></ElOption>
      <ElOption label="PROFIT" value="income"></ElOption>
      <ElOption label="EXPENSES" value="outcome"></ElOption>
    </ElSelect>
    <p :class="colorClass">{{totalCount.text}}{{totalCount.value}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "BudgetTotal",
    props: {
      selectedDate: {
       type: Object,
       default: () => ({})
      }
    },

    data: () => ({
      totalType: "total"
    }),
    computed: {
      ...mapGetters('expensesStore', [
        'totalBudget',
        'totalProfit',
        'totalExpenses',
        'totalBudgetYear',
        'totalProfitYear',
        'totalExpensesYear',
        'totalBudgetYearMonth',
        'totalProfitYearMonth',
        'totalExpensesYearMonth',
      ]),
      totalCount() {
        if (this.selectedDate.selectedYear && (this.selectedDate.selectedMonth || this.selectedDate.selectedMonth === 0)) {
          switch (this.totalType) {
            case "income":
              return {
                text: "Month PROFIT : ",
                value: this.totalProfitYearMonth(this.selectedDate)
              }
            case "outcome":
              return {
                text: "Month EXPENSES : ",
                value: this.totalExpensesYearMonth(this.selectedDate)
              }
            default:
              return {
                text: "Month BUDGET : ",
                value: this.totalBudgetYearMonth(this.selectedDate)
              }
          }
        } else if (this.selectedDate.selectedYear) {
          switch (this.totalType) {
            case "income":
              return {
                text: "Year PROFIT : ",
                value: this.totalProfitYear(this.selectedDate.selectedYear)
              }
            case "outcome":
              return {
                text: "Year EXPENSES : ",
                value: this.totalExpensesYear(this.selectedDate.selectedYear)
              }
            default:
              return {
                text: "Year BUDGET : ",
                value: this.totalBudgetYear(this.selectedDate.selectedYear)
              }
          }
        } else {
          switch (this.totalType) {
            case "income":
              return {
                text: "Total PROFIT : ",
                value: this.totalProfit
              }
            case "outcome":
              return {
                text: "Total EXPENSES : ",
                value: this.totalExpenses
              }
            default:
              return {
                text: "Total BUDGET : ",
                value: this.totalBudget
              }
          }
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
      margin: 20px;
      font-size: 26px;
    }
    .red {
      color: red;
    }
    .green {
      color: green;
    }
</style>