import Vue from 'vue'
import template from './tmpl.html'
import style from './style.css'
import axios from 'axios'
import qs from 'qs'

export default Vue.extend({
    template,
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
        type:{   //用于区分哪个页面的目前是购物车和商品详情页
            type:String
        }
	},
    data: function () {
        return {
            style,
            currentCount: this.count
        };
    },
    computed: {
        addBool: function () {
            return !!(this.max && this.max > this.currentCount);
        },
        reduceBool: function () {
            return !!(this.currentCount > 1);
        },
       
    },
    methods: {
        async add() {
            // if(this.max && (this.currentCount === this.max)) return this.$root.tostal('数量超出范围～')
            if(this.type !=="goodsDetail"){
                // 在 MAX 范围内，会先加再发请求，并没有每人限购的字段，暂时这样处理
                let url = `/v2/cart/${this.goods.gd_id}/number/${this.currentCount + 1}`,
                ids = this.$root.giftIds
                if(ids.length) url += `?gi_ids=${ids.join(',')}`
                let resp = await axios.get(url)
                resp = resp.data
                
                if(resp.code !== 0) {
                    this.$root.init()
                    return this.$root.tostal(resp.msg || '报错了～')
                }else if(resp.code == 0) this.currentCount++;
                
                this.$root.init()
            }else{
                if(this.addBool) this.currentCount++;
                
                this.$emit('setcount', this.currentCount);
            }
        },
        reduce: function () {
            if(!this.reduceBool) return

            if(this.max < this.currentCount)
                this.currentCount = this.max
            else
                this.currentCount--;
            
            this.$emit('setcount', this.currentCount);
        }
    },
    watch: {
        max(max,old) {
            // 如果max为0，则购买数量显示为1
            if(!max || max === 0) this.currentCount = 1;

            // 如果max小于当前count，则当前count更新为max
            if(max !== 0 && max < this.currentCount) this.currentCount = max;

            this.$emit('setcount', this.currentCount);
        }
    }
});
