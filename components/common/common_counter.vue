<template>
    <div class="count">
        <input type="button" value="-" @click="reduce" :class="reduceBool?'':'disabled'">
        <input type="text" ref="text" v-model="currentCount" @blur="onBlur" step="1">
        <input type="button" value="+" @click="add" :class="addBool?'':'disabled'">
    </div>
</template>
<script>
    /***
     *  引入方式：
     *
     <Counter :item='item' @setcount="setcount" :step="1"  :count="item.num" :min="1"></Counter>
     参数说明：
     1、传递item作数据绑定使用 在绑定的setcount方法中更新item 对应的属性
     2、count当前展示的数值
     3、min最小值 （default 0）
     4、max 最大值 （default Number.MAX_SAFE_INTEGER）
     5、step 加减步长
     */
    export default {
        data() {
            return {
                currentCount: this.count
            };
        },
        props: {
            max: {
                coerce(val) {
                    return val || 0
                },
                type: Number,
                default: Number.MAX_SAFE_INTEGER,
            },
            maxToast: {
                type: String,
                default: ''
            },
            min: {
                coerce(val) {
                    return val || 0
                },
                type: Number,
                default: 0
            },
            count: {
                type: Number,
                default: 0,
            },
            item: {
                type: Object,
            },
            step: {
                type: Number,
                default: 1,
            },
            //有时候 输入超过最大值直接变成最大值，有时候又不需要（业务无法统一 就有了这个传参）
            blurChange:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            add() {
                if (!this.addBool) {
                    this.currentCount = this.max
                    if(this.maxToast){
                        __tostal(this.maxToast)
                    }
                }
                if (this.addBool) this.currentCount += this.step;
            },
            reduce: function () {
                if (!this.reduceBool) return
                if (this.max < this.currentCount)
                    this.currentCount = this.max
                else
                    this.currentCount -= this.step;
            },
            onBlur() {
                window.scrollTo(0,0)
                if (!this.currentCount) {
                    this.currentCount = 0
                } else {
                    this.currentCount = parseInt(this.currentCount)
                    if(this.blurChange&&this.currentCount>this.max){
                        this.currentCount = this.max
                        if(this.maxToast){
                            __tostal(this.maxToast)
                        }
                    }
                }
            },
            resizeInit() {
                let input = this.$refs.text

                function resizable(el) {
                    function resize() {
                        el.style.width = (el.value.length + 1) * 7 + 'px'
                    }

                    let e = 'keyup,keypress,focus,blur,change'.split(',');
                    for (let i in e) el.addEventListener(e[i], resize, false);
                    resize();
                }

                resizable(input);
            }
        },
        computed: {
            addBool: function () {
                return !!(this.max && this.max > this.currentCount);
            },
            reduceBool: function () {
                return (this.currentCount > this.min);
            },
        },
        watch: {
            max(max, old) {
                if (!max || max === 0) this.currentCount = 1;
                // 如果max小于当前count，则当前count更新为max
                if (max !== 0 && max < this.currentCount) this.currentCount = max;
            },
            currentCount(val, old) { //监听变化，将值传递给父组件
                if (!/^\d*$/.test(val)) {
                    return this.currentCount = old
                }
                if (val.length !== old) {
                    let input = this.$refs.text
                    input.style.width = (input.value.length + 1) * 7 + 'px'
                }
                this.$emit('setcount', this.currentCount, this.item);
            },
            count() {
                this.currentCount = this.count
            }
        },
        mounted() {
            this.resizeInit()
        }
    }
</script>

<style scoped>
    .count {
        display: inline-block;
        font-size: 0;
        line-height: 1;
    }

    .count input {
        border-right: none;
    }

    .count input[type=text] {
        color: #ECEBED;
        border-radius: 0;
        background: none;
        text-align: center;
        border-bottom: 1px solid #dbdbdb;
        width: 0.28rem;
        min-width: 0.15rem;
        max-width: 1.5rem;
    }

    .count input[type=button] {
        width: .45rem;
        line-height: .45rem;
        height: .45rem;
        border: none;
        padding: 0;
        outline: none;
        text-align: center;
        font-size: .3rem;
        margin-left: 0.05rem;
        margin-right: 0.05rem;
        color: white;
        background: none;
        background-image: url("/images/1556248997996_mFMRMQR5xy.png");
        background-size: cover;
    }

    .count input:last-child {
        margin-right: 0;
        color: #F75174;
    }

    .disabled {
        color: grey !important;
    }

</style>