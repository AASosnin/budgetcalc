<template>
    <ElCard class="form-expenses-wrap">
      <ElForm ref="inputForm" :rules="rules" :model="formData" label-width="120px" label-position="top">
        <ElRow>
          <ElCol :span="12">
            <ElFormItem label="Type Income|Outcome" prop="type">
              <ElSelect v-model="formData.type" placeholder="Choose type">
                <ElOption label="INCOME" value="income"></ElOption>
                <ElOption label="OUTCOME" value="outcome"></ElOption>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="Date" prop="date">
              <ElDatePicker type="date" placeholder="Pick a date" v-model="formData.date" style="width: 100%;"></ElDatePicker>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElFormItem label="Comment" prop="comment">
          <ElInput v-model="formData.comment"></ElInput>
        </ElFormItem>
        <ElFormItem label="Value" prop="value">
          <ElInput v-model.number="formData.value"></ElInput>
        </ElFormItem>
        <ElButton @click="cancelSubmit('inputForm')">Cancel</ElButton>
        <ElButton type="primary" @click="onSubmit('inputForm')">Ok</ElButton>
      </ElForm>
    </ElCard>
</template>

<script>
  export default {
    name: "FormExpenses",
    data() {

      var validateValue = (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('Please input number without minus'));
        } else {
          callback();
        }
      };

      return {
        formData: {
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

    methods: {
      onSubmit(inputForm) {
        this.$refs[inputForm].validate((valid) => {
          if (valid) {
            if(this.formData.type === "outcome") {
              this.formData.value *= -1;
            }
            this.$emit('onFormSubmit', {...this.formData, id: (~~(Math.random()*1e8)).toString(16)});
            this.$refs[inputForm].resetFields();
          }
        });
      },
      cancelSubmit(inputForm) {
        this.$refs[inputForm].resetFields();
      }
    }
  }
</script>

<style>
  .form-expenses-wrap {
    width: 60%;
    max-width: 600px;
    margin: 0 auto;
  }
</style>