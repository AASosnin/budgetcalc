<template>
  <div class="expenses-wrap">
    <ElDialog :visible.sync="editDialogVisible" width="40%">
      <ElForm :model="editItemForm" :rules="rules" label-position="top">
        <ElFormItem label="Type Income|Outcome" prop="type">
          <ElSelect v-model="editItemForm.type" placeholder="Choose type">
            <ElOption label="INCOME" value="income"></ElOption>
            <ElOption label="OUTCOME" value="outcome"></ElOption>
          </ElSelect>
        </ElFormItem>
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
    <ElDialog
      title="Warning!"
      :visible.sync="delDialogVisible"
      width="30%">
          <span>Are you sure?<br>If you delete this item, you can no longer restore it. </span>
          <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteThisItemConfirm">Confirm</el-button>
      </span>
    </ElDialog>
    <ElCard class="box-card">
      <template v-if="isEmptyExpenses">
        <ElSelect v-model="filterInOut">
          <ElOption label="ALL" value="all"></ElOption>
          <ElOption label="INCOME" value="income"></ElOption>
          <ElOption label="OUTCOME" value="outcome"></ElOption>
          <ElOption label="WITHOUT PAYMENT" value="without_payment"></ElOption>
        </ElSelect>
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
        delId: "",
        editDialogVisible: false,
        editItemForm: {
          type: "",
          comment: "",
          value: 0
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
        }
      }
    },
    computed: {
      ...mapGetters('expensesStore', ['expensesAll', 'expensesIn', 'expensesOut', 'expensesWP']),
      isEmptyExpenses() {
        return Object.keys(this.filteredExpenses).length;
      },
      filteredExpenses() {
        if(this.filterInOut === 'all') {
          return this.expensesAll;
        } else if (this.filterInOut === 'income') {
          return this.expensesIn;
        } else if (this.filterInOut === 'outcome') {
          return this.expensesOut;
        } else return this.expensesWP;

      }
    },
    methods: {
      ...mapActions('expensesStore', ['deleteItem', 'editItem']),

      deleteThisItem(id) {
        this.delId = id;
        this.delDialogVisible = true;
      },

      deleteThisItemConfirm() {
        this.deleteItem(this.delId);
        this.delId = "";
        this.delDialogVisible = false;
      },

      editThisItem(item) {
        this.editItemForm = { ...item };
        if(this.editItemForm.type === 'outcome') {
          this.editItemForm.value *= -1;
        }
        console.log(this.editItemForm);
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
          value: 0
        };
        this.editDialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .expenses-wrap {
    max-width: 600px;
    width: 60%;
    margin: 0 auto;
  }
</style>