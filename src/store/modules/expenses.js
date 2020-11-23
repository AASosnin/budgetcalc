import Vue from 'vue';

const expensesStore = {
  namespaced: true,

  state: {
    expensesList: {
      1: {
        id: 1,
        value: 100,
        comment: "Some earnings",
        type: "income"
      },

      2: {
        id: 2,
        value: -50,
        comment: "Some expense",
        type: "outcome"
      },

      3: {
        id: 3,
        value: -50,
        comment: "Some expense",
        type: "outcome"
      },

      4: {
        id: 4,
        value: 0,
        comment: "Some expense",
        type: "income"
      },

      5: {
        id: 5,
        value: 0,
        comment: "Some expense",
        type: "income"
      },

      6: {
        id: 6,
        value: 50,
        comment: "Some expense",
        type: "income"
      },
    }
  },

  getters: {
    expensesAll: ({ expensesList }) => Object.values(expensesList),
    expensesIn: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value > 0),
    expensesOut: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value < 0),
    expensesWP: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value === 0),
    totalBudget: ({ expensesList }) => Object.values(expensesList).reduce((acc, item) => acc + item.value, 0),
    totalProfit: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value > 0).reduce((acc, item) => acc + item.value, 0),
    totalExpenses: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value < 0).reduce((acc, item) => acc + item.value, 0),
  },

  mutations: {
    ADD_NEW_ITEM(state, item) {
      Vue.set(state.expensesList, item.id, item);
    },
    DELETE_ITEM(state, id) {
      Vue.delete(state.expensesList, id);
    },
    EDIT_ITEM(state, item) {
      Vue.set(state.expensesList, item.id, item);
    }
  },

  actions: {
    addNewItem({ commit }, item) {
      commit('ADD_NEW_ITEM', item);
    },
    deleteItem({ commit }, id) {
      commit('DELETE_ITEM', id);
    },
    editItem({ commit }, item) {
      commit('EDIT_ITEM', item);
    }
  },

};

export default expensesStore;