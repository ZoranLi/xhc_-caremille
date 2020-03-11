<template>
  <div class="rootClass">
    <input type="button" value="-" @click="reduce" :class="reduceBool ? '' : 'disabled'">
    <input type="text" v-model="currentCount" readonly>
    <input type="button" value="+" @click="add" :class="addBool ? '' : 'disabled'">
  </div>
</template>
<script>
  export default {
    props: {
      max: {
        coerce(val) {
          return val || 0
        }
      },
      themes: {
        type: String,
      },
      count: {
        type: Number,
        default: 1,
      },
      goods: {
        type: Object,
      },
      type: {   //用于区分哪个页面的目前是购物车和商品详情页
        type: String
      }
    },
    data: function () {
      return {
        currentCount: this.count
      };
    },
    computed: {
      addBool: function () {
        return !!(this.max && this.max > this.currentCount);
      },
      reduceBool: function () {
        return !!(this.currentCount > 1);
      }

    },
    methods: {
      async add() {
        // if(this.max && (this.currentCount === this.max)) return this.$root.tostal('数量超出范围～')
        if (this.type !== "goodsDetail") {
          // 在 MAX 范围内，会先加再发请求，并没有每人限购的字段，暂时这样处理
          let url = `/v2/cart/${this.goods.gd_id}/number/${this.currentCount + 1}`,
            ids = this.$root.giftIds
          if (ids.length) url += `?gi_ids=${ids.join(',')}`
          let resp = await axios.get(url)
          resp = resp.data

          if (resp.code !== 0) {
            this.$root.init()
            return this.$root.tostal(resp.msg || '报错了～')
          } else if (resp.code == 0) this.currentCount++;

          this.$root.init()
        } else {
          if (this.addBool) this.currentCount++;

          this.$emit('setcount', this.currentCount);
        }
      },
      reduce: function () {
        if (!this.reduceBool) return

        if (this.max < this.currentCount)
          this.currentCount = this.max
        else
          this.currentCount--;

        this.$emit('setcount', this.currentCount);
      }
    },
    watch: {
      max(max, old) {
        // 如果max为0，则购买数量显示为1
        if (!max || max === 0) this.currentCount = 1;

        // 如果max小于当前count，则当前count更新为max
        if (max !== 0 && max < this.currentCount) this.currentCount = max;

        this.$emit('setcount', this.currentCount);
      }
    }
  }

</script>

<style>
  .count {
    display: inline-block;
    font-size: 0;
    line-height: 1;
  }

  .count input {
    width: .36rem;
    line-height: .36rem;
    border: none;
    background-color: #f1f1f1;
    padding: 0;
    margin: 0 1px 0 0;
    outline: none;
    text-align: center;
    font-size: .24rem;
    color: #605e5d;
    border-radius: 3px;
  }

  .count input:last-child {
    margin-right: 0;
  }

  .count input[type=text] {
    background-color: #f1f1f1;
    color: #222;
  }

  .disabled {
    background-color: #f9f9f9!important;
    color: #ccc!important;
  }

  .cart input {
    border-right: none;
  }

  .cart input[type=text] {
    width: 1.5em;
  }

  .cart input:last-child {
    color: #ff3657;
  }

</style>
