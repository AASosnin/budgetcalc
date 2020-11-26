<template>
    <div class="expenses-item-wrap">
        <span class="item-date">{{(new Date(item.date).getDate() || "__") + "." + (new Date(item.date).getMonth() + 1 || "__")}}</span>
        <span class="item item-comment">{{item.comment}}</span>
        <span class="item item-value" :class="colorClass">{{item.value}}</span>
        <i :class="iconClass"></i>
        <ElButton class="expenses-edit-button" type="primary" icon="el-icon-edit" circle @click="editItem(item)"></ElButton>
        <ElPopconfirm
          placement="top"
          title="Are you sure?"
          @confirm="deleteItem(item.id)"
          confirm-button-text='OK'
          cancel-button-text='Cancel'
        >
            <ElButton slot="reference" type="danger" icon="el-icon-delete" circle></ElButton>
        </ElPopconfirm>
    </div>
</template>

<script>
    export default {
        name: "ExpensesItem",
        props: {
            item: {
                type: Object,
                default: () => ({}),
            }
        },
        data() {
            return {
                visible: false
            }
        },
        computed: {
          colorClass() {
              if(this.item.value > 0) {
                  return "green";
              } else if (this.item.value < 0) {
                  return "red";
              } else {
                  return "";
              }
          },
          iconClass() {
              if(this.item.value > 0) {
                  return "el-icon-top green";
              } else if (this.item.value < 0) {
                  return "el-icon-bottom red";
              } else {
                  return "el-icon-minus";
              }
          }
        },

        methods: {
            deleteItem(id) {
                this.$emit('deleteItem', id);
                this.visible = false;
            },
            editItem(item) {
                this.$emit('editItem', item);
            }
        }
    }

</script>

<style scoped>
    .expenses-item-wrap {
        padding: 10px 20px;
        display: flex;
        align-items: center;

    }

    .item {
        color: #808080;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-weight: 400;
    }

    .item-comment {
        margin-right: auto;
        text-align: left;
    }

    .item-value {
        margin: 0 20px;
    }

    .item-date {
        margin: 0 20px 0 0;
        color: #808080;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-weight: 400;
    }

    i {
        margin: 0 20px 0 0;
    }

    .expenses-edit-button {
        margin: 0 10px 0 0;
    }

    .red {
        color: red;
    }

    .green {
        color: green;
    }

</style>