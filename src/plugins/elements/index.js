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
  Col,
  Row,
  DatePicker,
  Popconfirm
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
  Col,
  Row,
  DatePicker,
  Popconfirm
];

locale.use(lang);
elements.forEach(El => Vue.use(El, { locale }));