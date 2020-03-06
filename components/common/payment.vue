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
        background: linear-gradient(0deg,rgba(53,31,70,1),rgba(54,30,62,1),rgba(32,16,57,1));
        box-shadow: 0 .05rem .5rem 0 rgba(98,73,118,0.17);
    }
    .timer{
        font-size: 0;
        text-align: center;
    }
    
    .timer i, .timer b, .timer>i{
        display: inline-block;
        vertical-align: middle;
        width: .35rem;
        height: .35rem;
        line-height: .35rem;
        font-size: .24rem;
        text-align: center;
    } 
    .timer>i{
        width: auto;
        margin-right: .15rem;
    }
    .timer span i{
        background-color: #000;
    }
    .timer span b{
        width: .2rem;
    }
    .timer span b:last-child{
        display: none;
    }
    .total{
        font-size: .6rem;
        line-height: 1rem;
        text-align: center;
        color: #F75174;
    }
    .pay_type{
        margin-top: .7rem;
        border-top: 1px solid #DDC5E8;
        padding-left: .3rem;
        line-height: 1rem;
    }
    .pay_type div{
        display: flex;
        align-items: center;
        padding-right: .3rem;
        border-bottom: 1px solid #DDC5E8;
    }
    .pay_type div b{
        width: .44rem;
        height: .39rem;
        background-image: url('/images/pay/weichat.png');
        background-size: 100% 100%;
    }
    .pay_type div i{
        margin-left: .1rem;
        flex: 1;
    }
    .pay_type div em{
        width: .4rem;
        height: .4rem;
        background-image: url('/images/pay/current.png');
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
        background:linear-gradient(-90deg,rgba(247,81,116,1),rgba(253,130,134,1));
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
                <div :class="$style.total">￥{{ pay_info.need_pay }}</div>
                <div :class="$style.timer">
                    <i>剩余</i><timer :fmt="fmt" :target="pay_info.time"></timer>
                </div>

                <div :class="$style.pay_type">
                    <div>
                        <b></b><i>微信支付</i><em></em>
                    </div>
                </div>

                <div :class="$style.to_pay" @click="toPay">确认支付</div>
            </div>
        </transition>
        
    </div>
</template>

<script>
    import timer from './timer'
    import { getCode, open_id, appid, PAYSTATE } from '~/lib/weixin_pay'
    export default {
        props: {
            show_pay: {
                type: Boolean,
                default: false
            },
            pay_info: {
                type: Object,
                default: {}
            }
        },
        components: { timer },
        data() {
            return {
                fmt: {
                    m: ':',
                    s: ':',
                },
            }
        },
        mounted(){
            console.log(appid)
        },
        methods: {
            async toPay(){
                const name = 'exhange_openid'
                const has_exchanged = localStorage.getItem(name)
                if(!has_exchanged || !open_id) {
                    return getCode(location.href, 'pay_hy')
                }

                let resp = await this.$axios.$get(`/v1/member/team/retail/pay_info?oid=${this.pay_info.oid}&open_id=${open_id}`)
                let credential = resp.data && resp.data.credential

                if(!credential) return __tostal('出了一些问题')
                this.wxpay(credential)
            },
            close() {
                location.href = `/stock/delivery_info?oid=${this.pay_info.oid}`
            },
            wxpay(params, url){
                
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        appId: appid,
                        timeStamp: params.timestamp.toString(),
                        nonceStr: params.noncestr,
                        package: `prepay_id=${params.prepayid}`,
                        signType: 'MD5',
                        paySign: params.sign
                    },
                    () => location.href = `/stock/pay_result?oid=${this.pay_info.oid}`
                );
            }
        }
    };
</script>
