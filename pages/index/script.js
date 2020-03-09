import Vue from 'vue';
import {Tabbar, TabbarItem} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
import 'vant/lib/index.css';
import store from '~/components/home/store'
import category from '~/components/home/category'

export default {
  data() {
    return {
      title: '珂曼',
      active: 'tab_store',
      icon: {
        active: '/images/favicon.ico',
        inactive: '/images/close_gray.png'
      }
    }
  },
  components: {
    store,
    category
  },
  head() {
    return {
      title: this.title
    }
  },
  
}
