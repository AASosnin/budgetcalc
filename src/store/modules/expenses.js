import Vue from 'vue';

const expensesStore = {
  namespaced: true,

  state: {
    expensesList: {
      1: {
        id: 1,
        value: 100,
        comment: "Some earnings",
        type: "income",
        date: new Date(2020, 10, 3)
      },

      2: {
        id: 2,
        value: -50,
        comment: "Some expense",
        type: "outcome",
        date: new Date(2021, 11, 3)
      },

      3: {
        id: 3,
        value: -50,
        comment: "Some expense",
        type: "outcome",
        date: new Date(2021, 10, 6)
      },

      4: {
        id: 4,
        value: 0,
        comment: "Some expense",
        type: "income",
        date: new Date(2020, 10, 5)
      },

      5: {
        id: 5,
        value: 0,
        comment: "Some expense",
        type: "income",
        date: new Date(2020, 10, 7)
      },

      6: {
        id: 6,
        value: 50,
        comment: "Some expense",
        type: "income",
        date: new Date(2021, 10, 2)
      },
    }
  },

  getters: {
    expensesAllYear: ({expensesList}) => year => Object.values(expensesList).filter(item => new Date(item.date).getFullYear() === year).sort((a,b) => new Date(a.date) - new Date(b.date)),

    expensesAllYearMonth: ({expensesList}) => ym => Object.values(expensesList).filter(item => (new Date(item.date).getFullYear() === ym.selectedYear && new Date(item.date).getMonth() === ym.selectedMonth)).sort((a,b) => new Date(a.date) - new Date(b.date)),

    expensesAll: ({ expensesList }) => Object.values(expensesList).sort((a,b) => new Date(a.date) - new Date(b.date)),
    expensesIn: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value > 0).sort((a,b) => new Date(a.date) - new Date(b.date)),
    expensesOut: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value < 0).sort((a,b) => new Date(a.date) - new Date(b.date)),
    expensesWP: ({ expensesList }) => Object.values(expensesList).filter((item) => item.value === 0).sort((a,b) => new Date(a.date) - new Date(b.date)),

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