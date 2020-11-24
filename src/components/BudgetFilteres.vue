<template>
  <ElCard class="budget-filteres-card">
    <BudgetTotal />
    <div class="select-wrapper">
      <ElSelect v-model.number="selectedYear" clearable placeholder="Select YEAR" @change="onSelectYear">
        <ElOption v-for="item in yearsArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
        </ElOption>
      </ElSelect>
    </div>
    <div class="select-wrapper">
      <ElSelect v-if="this.selectedYear" v-model.number="selectedMonth" clearable placeholder="Select MONTH" @change="onSelectMonth">
        <ElOption v-for="item in monthesArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
        </ElOption>
      </ElSelect>
      <ElSelect v-else v-model.number="selectedMonth" disabled placeholder="Select MONTH"></ElSelect>
    </div>
  </ElCard>
</template>

<script>
  import BudgetTotal from "./BudgetTotal";
  import { bus } from "../main";

  export default {
    components: {BudgetTotal},
    data() {
      return {
        selectedYear: "",
        selectedMonth: "",
        yearsArray: [
          {
            label: "2020",
            value: 2020
          },
          {
            label: "2021",
            value: 2021
          },
          {
            label: "2022",
            value: 2022
          },
          {
            label: "2023",
            value: 2023
          },
          {
            label: "2024",
            value: 2024
          },
          {
            label: "2025",
            value: 2025
          },
          {
            label: "2026",
            value: 2026
          },
          {
            label: "2027",
            value: 2027
          },
          {
            label: "2028",
            value: 2028
          },
          {
            label: "2029",
            value: 2029
          },
          {
            label: "2030",
            value: 2030
          },
          {
            label: "2031",
            value: 2031
          },
          {
            label: "2032",
            value: 2032
          },
          {
            label: "2033",
            value: 2033
          },
          {
            label: "2034",
            value: 2034
          },
          {
            label: "2035",
            value: 2035
          },
          {
            label: "2036",
            value: 2036
          },
          {
            label: "2037",
            value: 2037
          },
          {
            label: "2038",
            value: 2038
          },
          {
            label: "2039",
            value: 2039
          },
          {
            label: "2040",
            value: 2040
          },
        ],
        monthesArray: [
          {
            value: 0,
            label: "January",
          },
          {
            value: 1,
            label: "February",
          },
          {
            value: 2,
            label: "March",
          },
          {
            value: 3,
            label: "April",
          },
          {
            value: 4,
            label: "May",
          },
          {
            value: 5,
            label: "June",
          },
          {
            value: 6,
            label: "July",
          },
          {
            value: 7,
            label: "August",
          },
          {
            value: 8,
            label: "September",
          },
          {
            value: 9,
            label: "October",
          },
          {
            value: 10,
            label: "November",
          },
          {
            value: 11,
            label: "December",
          },
        ]
      }
    },

    methods: {
      onSelectMonth() {
        bus.$emit("onSelectMonth", this.selectedMonth);
      },
      onSelectYear() {
        bus.$emit("onSelectYear", this.selectedYear);
      }
    }
  }
</script>

<style>
  .budget-filteres-card {
    margin: 20px;
    width: 400px;
    min-width: 300px;
  }
  .select-wrapper {
    margin: 20px;
  }
</style>