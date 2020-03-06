<style module>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .con{
        position: fixed;
        box-sizing: border-box;
        width:7.5rem;
        height:6.8rem;
        z-index: 2;
        bottom: 0;
        left: 50%;
        padding-top: .2rem;
        margin-left: -3.75rem;
        background-image: -webkit-linear-gradient( 90deg, rgb(39,22,62) 1%, rgb(55,22,69) 69%, rgb(61,32,83) 100%);
        box-shadow: 0px 5px 49px 0px rgba(98, 73, 118, 0.17);
    }

    .total{
        font-size: .6rem;
        line-height: 1rem;
        text-align: center;
        color: #F75174;
    }
    .pay_type{
        margin-top: .7rem;
        padding-left: .3rem;
        line-height: 1rem;
    }
    .pay_type div{
        display: flex;
        align-items: center;
        padding-right: .3rem;
    }
    .pay_type div b{
        background-size: 100% 100%;
    }

    .pay_type .wechat b{
        width: .58rem;
        height: .51rem;
        background-image: url('/images/pay/wechat_large.png');
    }

    .pay_type .ali b{
        width: .58rem;
        height: .58rem;
        background-image: url('/images/pay/ali.png');
    }

    .pay_type div i{
        margin-left: .2rem;
        flex: 1;
    }

    .pay_type .wechat em{
        width: .5rem;
        height: .5rem;
        background-image: url('/images/pay/result.png');
        background-size: 100% 100%;
    }

    .pay_type .ali em{
        width: 1.94rem;
        height: .82rem;
        text-align: center;
        line-height: .82rem;
        margin-right: -.1rem;
        color: #381747;
        font-size: .24rem;
        background-image: url('/images/pay/ali_qr.png');
        background-size: 100% 100%;
    }

    .to_pay{
        position: absolute;
        width: 7.5rem;
        left: 50%;
        bottom: 0;
        color: #fff;
        line-height: 1rem;
        text-align: center;
        margin-left: -3.75rem;
        background-image: -webkit-linear-gradient( 0deg, rgb(254,100,172) 1%, rgb(186,60,255) 100%);
    }

    .mask_pay_qr{
        z-index: 5;
    }

    .pay_qr{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 5rem;
        height: 6.3rem;
        padding-top: 1.1rem;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 2px 3px 0px rgba(8, 2, 3, 0.3);
    }
    .pay_qr p{
        color: #222;
        font-size: .26rem;
        text-align: center;
    }

    .pay_qr img{
        display: block;
        width: 2.2rem;
        margin: .45rem auto 0;
    }

    .close{
        position: absolute;
        right: .3rem;
        top: .3rem;
        width: .25rem;
        height: .25rem;
        background-image: url('/images/pay/close.png');
        background-size: 100% 100%;
    }
</style>

<template>
    <div>
        <transition name="fade">
            <div :class="$style.mask" v-if="show_pay"></div>
        </transition>

        <transition name="bottom">
            <div :class="$style.con" v-if="show_pay">
                <i :class="$style.close" @click="close"></i>

                <div :class="$style.total">￥{{ pay_info.amount }}</div>

                <div :class="$style.pay_type">
                    <div :class="$style.wechat">
                        <b></b><i>微信支付</i><em></em>
                    </div>

                    <div :class="$style.ali">
                        <b></b><i>支付宝支付</i><em @click="to_pay('cuqr')">生成支付码</em>
                    </div>
                </div>

                <div :class="$style.to_pay" @click="to_pay('cuww')">确认支付</div>
            </div>
        </transition>

        <transition name="fade">
            <div :class="[$style.mask, $style.mask_pay_qr]" v-if="show_pay_qr" @click="show_pay_qr=false">
                <!-- <div :class="[$style.mask, $style.mask_pay_qr]" v-if="show_pay_qr" @click="show_pay_qr=false"> -->
                <div :class="$style.pay_qr" @click.stop>
                    <p>长按保存支付码，打开支付宝扫码<br>支付，支付码30分钟内有效</p >

                    <img :src="ali_qr">
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: ['show_pay', 'pay_info', 'return_url'],
        data() {
            return {
                show_pay_qr: false,
                ali_qr: '',
                payUrl:'',
                next_allow: true,
            }
        },
        watch:{
            next_allow() {
                if (!this.next_allow) {
                    setTimeout(() => {
                        this.next_allow = true
                    }, 3000)
                }
            },
            show_pay(val,old){
                if(!val){
                    this.show_pay_qr = false
                }
            }
        },
        methods: {
            // pay_type: cuww / cuqr
            async to_pay(pay_type){
                if (!this.next_allow) return __tostal('您的操作太频繁了,请稍后再试')
                this.next_allow = false
                let return_url = this.return_url || location.href
                let resp = await this.$axios.$post(`/v1/member/team/merchants/order_pay`, {
                    sub_order_num: this.pay_info.sub_order_num,
                    pay_type,
                    return_url,
                })
                if(resp.code) return __tostal(resp.msg || '出错了，请联系客服~')

                if(pay_type == 'cuww') {
                    location.href = resp.data && resp.data.url || ''
                } else{
                    if(resp.data.qr_url){
                        this.ali_qr = resp.data && resp.data.qr_url || ''
                        if(resp.data.trade_no && localStorage){
                            let subOrderList = JSON.parse(localStorage.getItem("trade_no_list")) || [];
                            subOrderList.push({
                                trade_no:resp.data.trade_no,
                                expire_time:parseInt(resp.data.expire_time)
                            });
                            localStorage.setItem('trade_no_list',JSON.stringify(subOrderList));//保存支付宝的id
                        }
                    }
                    this.show_pay_qr = true
                }
            },
            close(){
                this.$emit('dismiss')
            }
        },
        mounted() {

        }
    };
</script>