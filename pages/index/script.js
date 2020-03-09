import Vue from 'vue';
import {Tabbar, TabbarItem} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
import 'vant/lib/index.css';

import LazyLoad from '~/lib/lazyload'
import optimize from '~/filters/imgOptimize'

export default {
  data() {
    return {
      title: '珂曼',
      imageList: [
        '/images/1562054250687_N45HFE7Ac3.png',
        '/images/1562054250687_N45HFE7Ac3.png',
        '/images/1562054250687_N45HFE7Ac3.png',
        '/images/1562054250687_N45HFE7Ac3.png',
        '/images/1562054250687_N45HFE7Ac3.png',
        '/images/1562054250687_N45HFE7Ac3.png',
      ],
      active: 'home',
      icon:{
        active: '/images/favicon.ico',
        inactive: '/images/close_gray.png'
      }
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  filters: {
    optimize
  },
  mounted() {
    this.lazyload = new LazyLoad({selector: 'div[data-src]'})
  }
  
}
