import Vue from 'vue';
import {Tabbar, TabbarItem} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
import 'vant/lib/index.css';
import store from '~/components/home/store'

export default {
  data() {
    return {
      title: '珂曼',
      active: 'home',
      icon: {
        active: '/images/favicon.ico',
        inactive: '/images/close_gray.png'
      }
    }
  },
  components: {
    store
  },
  head() {
    return {
      title: this.title
    }
  },
  
}
