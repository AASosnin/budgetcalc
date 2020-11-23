import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Alert,
  Dialog,
  Icon,
} from 'element-ui';

const elements = [
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Alert,
  Dialog,
  Icon,
];

locale.use(lang);
elements.forEach(El => Vue.use(El, { locale }));