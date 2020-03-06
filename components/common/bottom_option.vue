<template>
    <div>
        <transition name="fade">
            <div class="mask" v-if="show_option" @click="cancel" @touchmove.prevent></div>
        </transition>
        <div :class="['container', show_option ? '' : 'hide']" @click.stop>
            <p v-html="desc"></p>
            <p :class="desc_confirm=='确定' ? 'red' : ''" @click="confirm">{{ desc_confirm }}</p>
            <p @click="cancel">{{ desc_cancel }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show_option: {
                type: Boolean,
                default: false
            },
            desc_confirm: {
                type: String,
                default: "确定"
            },
            desc_cancel: {
                type: String,
                default: "取消"
            },
            desc: {
                type: String,
                default: "确定要酱紫嘛？"
            }
        },
        data() {
            return {};
        },
        methods: {
            confirm() {
                this.$emit("option_confirm");
            },
            cancel() {
                this.$emit("option_cancel");
            }
        }
    };
</script>

<style>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 200;
    }

    .container {
        position: fixed;
        z-index: 201;
        bottom: 0;
        width: 100%;
        font-size: 0.32rem;
        text-align: center;
        background-color: #f5f5f5;
        transition: bottom 0.5s;
    }

    .container p {
        background-color: #fff;
        padding: 0.2rem 0.3rem;
        line-height: 0.55rem;
    }

    .container p:nth-child(1) {
        margin-bottom: 1px;
    }

    .container p:nth-child(2) {
        margin-bottom: 0.1rem;
    }

    .red {
        color: #ff3167;
    }

    .hide {
        bottom: -5rem;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>