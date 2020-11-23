import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import expensesStore  from './modules/expenses.js';

Vue.use(Vuex);

const expensesState = createPersistedState({
  paths: ['expensesStore']
});

export default new Vuex.Store({
  modules: {
    expensesStore
  },
  plugins: [expensesState]
});