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
  watch: {
    anchor(newVal, old) {
      this.$router.push({
        query: {
          tab_index: `${newVal}`
        }
      })
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  
}
