<template>
  <div class="expenses-wrap">
    <ElDialog :visible.sync="editDialogVisible" width="400px">
      <ElForm :model="editItemForm" :rules="rules" label-position="top">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="Type Income|Outcome" prop="type">
              <ElSelect v-model="editItemForm.type" placeholder="Choose type">
                <ElOption label="INCOME" value="income"></ElOption>
                <ElOption label="OUTCOME" value="outcome"></ElOption>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="Date" prop="date">
              <ElDatePicker type="date" placeholder="Pick a date" v-model="editItemForm.date" style="width: 100%;"></ElDatePicker>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem label="Comment" prop="comment">
          <ElInput v-model="editItemForm.comment"></ElInput>
        </ElFormItem>
        <ElFormItem label="Value" prop="value">
          <ElInput v-model.number="editItemForm.value"></ElInput>
        </ElFormItem>
          <ElButton @click="editDialogVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="editThisItemConfirm">Confirm</ElButton>
      </ElForm>
    </ElDialog>

    <ElCard class="expenses-card">
      <div class="select-wrap20">
        <ElSelect v-model="filterInOut">
          <ElOption label="ALL" value="all"></ElOption>
          <ElOption label="INCOME" value="income"></ElOption>
          <ElOption label="OUTCOME" value="outcome"></ElOption>
          <ElOption label="WITHOUT PAYMENT" value="without_payment"></ElOption>
        </ElSelect>
      </div>
      <template v-if="isEmptyExpenses">
        <ExpensesItem v-for="item in filteredExpenses" :key="item.id" :item="item" @deleteItem="deleteThisItem" @editItem="editThisItem"></ExpensesItem>
      </template>
      <ElAlert v-else
        title="No expenses yet"
        type="info" >
      </ElAlert>
    </ElCard>
  </div>
</template>

<script>
  import ExpensesItem from '@/components/ExpensesItem'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { bus } from '../main'

  export default {
    name: 'Expenses',
    components: {
      ExpensesItem,
    },

    data() {

      var validateValue = (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('Please input number without minus'));
        } else {
          callback();
        }
      };

      return {
        filterInOut: "all",
        delDialogVisible: false,
        selectedDate: {
          selectedYear: "",
          selectedMonth: "",
        },
        editDialogVisible: false,
        editItemForm: {
          type: "",
          comment: "",
          value: 0,
          date: ""
        },
        rules: {
          type: [
            { required: true, message: 'Please input type', trigger: 'blur' }
          ],
          comment: [
            { required: true, message: 'Please input comment', trigger: 'change' }
          ],
          value: [
            { required: true, message: "Please input value", trigger: 'change' },
            { type: 'number', message: "Value must be a number", trigger: 'change' },
            { validator: validateValue, trigger: "change" },
          ],
          date: [
            {required: true, message: "Please pick date", trigger: 'blur'},
          ]
        }
      }
    },

    created() {
      bus.$on("onSelectYear", year => this.selectedDate.selectedYear = year);
      bus.$on("onSelectMonth", month => this.selectedDate.selectedMonth = month);
    },

    computed: {
      ...mapGetters('expensesStore', [
        'expensesAll',
        'expensesIn',
        'expensesOut',
        'expensesWP',
        'expensesAllYear',
        'expensesInYear',
        'expensesOutYear',
        'expensesWPYear',
        'expensesAllYearMonth',
        'expensesInYearMonth',
        'expensesOutYearMonth',
        'expensesWPYearMonth',
      ]),

      isEmptyExpenses() {
        return Object.keys(this.filteredExpenses).length;
      },

      filteredExpenses() {
        if (this.selectedDate.selectedYear && (this.selectedDate.selectedMonth || this.selectedDate.selectedMonth === 0)) {
          switch (this.filterInOut) {
            case "income":
              return this.expensesInYearMonth(this.selectedDate);
            case "outcome":
              return this.expensesOutYearMonth(this.selectedDate);
            case "without_payment":
              return  this.expensesWPYearMonth(this.selectedDate);
            default:
              return this.expensesAllYearMonth(this.selectedDate);
          }
        } else
        if (this.selectedDate.selectedYear) {
          switch (this.filterInOut) {
            case "income":
              return this.expensesInYear(this.selectedDate.selectedYear);
            case "outcome":
              return this.expensesOutYear(this.selectedDate.selectedYear);
            case "without_payment":
              return  this.expensesWPYear(this.selectedDate.selectedYear);
            default:
              return this.expensesAllYear(this.selectedDate.selectedYear);
          }
        } else {
          switch (this.filterInOut) {
            case "income":
              return this.expensesIn;
            case "outcome":
              return this.expensesOut;
            case "without_payment":
              return  this.expensesWP;
            default:
              return this.expensesAll;
          }
        }
      },
    },

    methods: {
      ...mapActions('expensesStore', ['deleteItem', 'editItem']),

      deleteThisItem(id) {
        this.deleteItem(id);
      },

      editThisItem(item) {
        this.editItemForm = { ...item };
        if(this.editItemForm.type === 'outcome') {
          this.editItemForm.value *= -1;
        }
        this.editDialogVisible = true;
      },

      editThisItemConfirm() {
        if(this.editItemForm.type === 'outcome') {
          this.editItemForm.value *= -1;
        }
        this.editItem(this.editItemForm);
        this.editItemForm = {
          type: "",
          comment: "",
          value: 0,
          date: ""
        };
        this.editDialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .expenses-wrap {
    width: 60%;
    min-width: 500px;
    margin: 20px;
  }
  .select-wrap20 {
    margin: 20px;
  }
  .expenses-card {
    max-height: 1000px;
    overflow: auto;
  }
</style>