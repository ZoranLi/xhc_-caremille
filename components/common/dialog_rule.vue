<template>
    <transition name="fade">
        <div v-if="show" class="mask" style="padding-top: 2rem;" @touchmove.prevent @click="dismiss">
            <div class="mask_con" @click.stop>
                <p v-if="ruleTitle">{{ruleTitle}}</p>
                <ul>
                    <li v-for="item in ruleList">{{item}}</li>
                </ul>
            </div>
            <div class="close" @click="dismiss">
                <img src="/images/1562053357896_QnHhZNw7tn.png">
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            ruleTitle: {
                type: String,
                default: ''
            },
            ruleList: {
                type: Array,
                default: []
            }
        },
        methods: {
            dismiss() {
                this.$emit('dismiss')
            }
        },
    }
</script>

<style>
    .mask_con {
        box-sizing: border-box;
        padding: .6rem .3rem;
        background-color: #fff;
        border-radius: 5px;
        width: 5rem;
        margin: 0 auto;
    }

    .mask_con p {
        text-align: center;
        font-size: 0.32rem;
        color: #222222;
        font-weight: 600;
    }

    .mask_con ul {
        margin-top: .5rem;
    }

    .mask_con ul li {
        font-size: .26rem;
        color: #222222;
        line-height: .42rem;
    }

    .close {
        margin: .8rem auto 0;
        text-align: center;
    }

    .close img {
        width: .6rem;
        height: .6rem;
    }

</style>