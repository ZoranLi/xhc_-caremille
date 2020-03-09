import Vue from 'vue';
import {DropdownMenu, DropdownItem} from 'vant';
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  
  async asyncData({$axios, query, store}) {
    return {
    }
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
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ]
    }
  },
  components: {},
  methods: {},
  mounted() {
  }
};
