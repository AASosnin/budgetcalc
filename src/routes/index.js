import Vue from 'vue'
import VueRouter from 'vue-router'
import CalcPage from "../pages/CalcPage";
import StartPage from "../pages/StartPage";


Vue.use(VueRouter);

export default new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', name: 'startPage', component: StartPage },
    { path: '/calc', name: 'calcPage', component: CalcPage }
  ]
})