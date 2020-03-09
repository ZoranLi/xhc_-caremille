import Vue from 'vue';
import {DropdownMenu, DropdownItem} from 'vant';
import 'vant/lib/index.css';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  
  async asyncData({$axios, query, store}) {
    return {}
  },
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: '注册VIP账号',
      realName: '',
      storeName: '',
      optionValue: -1,
      options: [
        {text: '请选择分销渠道', value: -1},
        {text: '淘宝', value: 0},
        {text: '京东', value: 1},
        {text: '拼多多', value: 2},
        {text: '其他', value: 3}
      ],
    }
  },
  components: {},
  methods: {},
  mounted() {
  }
};
