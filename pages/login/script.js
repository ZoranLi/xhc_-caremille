export default {
    data() {
        return {
            title: '管理中心',
            show_message_count: false,
            show_mask: true,
            sessionShow: 'false',
            isShowMask: true,
            isShowPay: false
        }
    },
    filters: {
    },
    async asyncData({$axios, query}) {
    },
    methods: {},
    head() {
        return {
            title: this.title
        }
    },
    watch: {
    },
    computed: {
    },
    mounted() {
    },
};
