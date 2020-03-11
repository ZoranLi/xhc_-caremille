import Vue from 'vue';
import {Tabbar, TabbarItem} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);

import 'vant/lib/index.css';
import store from '~/components/home/store'
import category from '~/components/home/category'
import cart from '~/components/home/cart'


export default {
  data() {
    return {
      title: '珂曼',
      icon: {
        active: '/images/favicon.ico',
        inactive: '/images/close_gray.png'
      }
    }
  },
  asyncData({query}) {
    return {
      anchor: query.tab_index || '0'
    }
  },
  components: {
    store,
    category,
    cart
  },
  head() {
    return {
      title: this.title
    }
  },
  
}
