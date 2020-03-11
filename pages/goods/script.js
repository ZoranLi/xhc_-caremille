import Vue from 'vue';
import {Swipe, SwipeItem} from 'vant';
import 'vant/lib/index.css';
import optimize from '~/filters/imgOptimize'

Vue.use(Swipe);
Vue.use(SwipeItem);

import LazyLoad from '~/lib/lazyload'

export default {
  validate({params}) {
    return /^\d+$/.test(params.id) //如果商品为非数字
  },
  async asyncData({$axios, store, params}) {
    let resp = await $axios.$get(`napi::/goods/${params.id}/all`)
    return {
      goods: resp.data,
    }
  },
  data() {
    return {
      title: '商品详情',
      current: 0
    }
  },
  filters: {
    optimize
  },
  head() {
    return {
      title: this.title
    }
  },
  computed: {
    pageImgs() {
      if (!this.goods.g_gallery) return ''
      return this.goods.g_gallery
        .filter(img => img.gg_type === 3)
    }
  },
  methods: {
    linkTo(type) {
      window.location.href =`/?tab_index=${type}`
    },
    gallery(type) {
      if (!this.goods.g_gallery) return ''
      return this.goods.g_gallery
        .filter(img => img.gg_type === type)
        .map(g => g.gg_image);
    },
    currentDiffPrice() {
      if (!this.goods.sku) return this.goods.g_detail[0];
      if (!this.goods.sku.every(s => s.properties.some(prop => prop.selected))) return this.goods.g_detail[0];      // 有规格还未选择, 返回null
      let sku_ids = this.goods.sku.map(sku => sku.properties.filter(prop => prop.selected)[0].id),
        detail = this.goods.g_detail.filter(d => d.sku_ids.every(id => sku_ids.indexOf(id) !== -1));
      return detail.length ? detail[0] : this.goods.g_detail[0];      // 此商品无此规格，则返回null
    },
    onChange(index) {
      this.current = index;
    }
  },
  mounted() {
    new LazyLoad({
      selector: 'i[data-src], img[data-src], div[data-src], span[data-src]',
      offset: 20
    })
  }
}
