<template>
  <div class="container" @click="close">
    <div class="sku" @click.stop>
      <header>
        <img :src="skuImg | optimize('avatars3x')">

        <div class="guide">
          <div class="skuPrice">
            <i class="price">¥{{price}}</i>
          </div>
          <div class="tip">{{selected.length ? '已选择 ' + selected.join(' ') : unSelected}}</div>
        </div>
      </header>
      <div class="body">
        <div class="props">
          <dl v-for="sku in goods.sku">
            <dt>{{sku.name}}</dt>
            <sku-item :items="sku.properties" :parent-name="sku.name"></sku-item>
          </dl>
          <div class="num">
            <div class="t">购买数量</div>
            <div>
              <sku-pcount class="pcount" :max="max" :goods="goods" :type="'goodsDetail'"
                          @setcount="setCount"></sku-pcount>
              <!-- <span class="[repo, repoZero ? 'zero' : '']">{{repo}}</span> -->
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <input @click="confirm" type="button" value="加入购物车">
          <input @click="buy_now" type="button" value="立即购买">
        </div>
      </footer>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import skuItem from '~/components/goods/sku_item'
  import skuPcount from '~/components/goods/pcount'
  import optimize from '~/filters/imgOptimize'

  export default {
    props: {
      goods: Object,
      show: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        count: 1,
        // isMember: window.__user.member
      };
    },
    components: {skuItem, skuPcount},
    filters: {optimize},
    methods: {
      confirm() {
        if (this.current === null) return this.$root.tostal('请选择商品规格')

        if (this.current === false || !this.current.gd_number) return this.$root.tostal('库存不足，请选择其它规格')

        this.$emit('update', this.current.gd_id, this.count);
        this.$emit('closesku')
      },
      buy_now() {
        if (this.current === null) return this.$root.tostal('请选择商品规格')

        if (this.current === false || !this.current.gd_number) return this.$root.tostal('库存不足，请选择其它规格')

        this.$emit('buy_now', this.current.gd_id, this.count);
        this.$emit('closesku')
      },
      setCount(count) {
        this.count = count;
      },
      close() {
        this.$emit('closesku')
      },
      formatPrice(price) {
        if (!price) return 0
        return price.replace(/#([^#]*)#/g, (match, word) => `<em> ${word}</em>`)
      }
    },
    computed: {
      discount() {
        return (this.goods.g_price_shop / this.goods.g_price_market * 10).toFixed(1);
      },
      max() {
        return this.current && Math.min(this.current.gd_number, this.current.gd_limit);
      },
      selected() {
        var arr = [];
        this.goods.sku.forEach(s => s.properties.forEach(p => p.selected && arr.push(`${s.name}:${p.name}`)));

        return arr;
      },
      // 代表当前选择的goods_detail
      current() {
        // 有规格还未选择, 返回null
        if (!this.goods.sku.every(s => s.properties.some(prop => prop.selected))) return null;

        let sku_ids = this.goods.sku.map(sku => sku.properties.filter(prop => prop.selected)[0].id),
          detail = this.goods.g_detail.filter(d => d.sku_ids.every(id => sku_ids.indexOf(id) != -1));

        // 此商品无此规格，则返回null
        return detail.length ? detail[0] : false;
      },
      skuImg() {
        return this.current ? (this.current.gd_icon || this.goods.g_image) : this.goods.g_image;
      },
      unSelected() {
        var prefix = '请选择 ';
        let un = this.goods.sku.map(sku => sku.properties.some(prop => prop.selected) ? '' : sku.name).join(' ');

        return un.trim() && (prefix + ' ' + un);
      },
      repo() {
        var prefix = '库存: ';
        // if (this.current === null) return '';
        if (this.current === false) return prefix + '0';
        return '';
      },
      repoZero() {
        if (this.current === null) return false;
        if (this.current === false || this.current.gd_number === 0) return true;
        return false;
      },
      price() {
        if (!this.current) return this.goods.g_price_shop

        if (Object.keys(this.goods.vip).length && this.current.vip) return this.current.vip.friend_price

        return this.goods.g_price_shop + this.current.gd_price_diff
      }
    },
    mounted() {
      this.goods.sku.forEach(sku => sku.properties.forEach(item => Vue.set(item, 'selected', false)));
    }
  }
</script>
<style>


</style>
