<template>
    <span>
        <i v-if="fmt.d && remaining.d > 0">{{ remaining.d }}</i>
        <b v-if="fmt.d && remaining.d > 0">{{ fmt.d || ':' }}</b>

        <i v-if="fmt.h && remaining.h > 0">{{ remaining.h | formatTime }}</i>
        <b v-if="fmt.h && remaining.h > 0">{{ fmt.h || ':' }}</b>

        <i v-if="fmt.m">{{ remaining.m | formatTime }}</i>
        <b v-if="fmt.m">{{ fmt.m || ':' }}</b>

        <i v-if="fmt.s">{{ remaining.s | formatTime }}</i>
        <b v-if="fmt.s">{{ fmt.s || '' }}</b>

        <i v-if="fmt.ms">{{ remaining.ms | formatTime }}</i>
    </span>
</template>

<script>
    export default {
        props: ["target", "fmt", "now_time"],
        data() {
            return {
                remaining: {
                    d: "",
                    h: "",
                    m: "",
                    s: "",
                    ms: ""
                },
                timer: null,
                minus_ms: 0
            };
        },

        filters: {
            formatTime(n) {
                if (n < 10 && n > -1) n = "0" + n;
                return n;
            }
        },
        methods: {
            stoptimer() {
                this.minus_ms -= 100;
                let minus_m = this.minus_ms / 1000;
                if (this.fmt.d) this.remaining.d = parseInt(minus_m / (60 * 60 * 24));
                if (this.fmt.d && this.fmt.h)
                    this.remaining.h = parseInt((minus_m / (60 * 60)) % 24);
                if (!this.fmt.d && this.fmt.h)
                    this.remaining.h = parseInt(minus_m / (60 * 60));
                if (this.fmt.m) this.remaining.m = parseInt((minus_m / 60) % 60);
                if (this.fmt.s) this.remaining.s = parseInt(minus_m % 60);
                if (this.fmt.ms) this.remaining.ms = parseInt((minus_m * 10) % 10);
                if (
                    this.remaining.h < 0 ||
                    this.remaining.m < 0 ||
                    this.remaining.s < 0 ||
                    this.remaining.ms < 0
                ) {
                    this.remaining.s = "0";
                    this.remaining.ms = "0";
                    clearInterval(this.timer);
                    location.reload(true);
                }
            }
        },
        mounted() {
            let now = Number(this.now_time || new Date().getTime());
            this.minus_ms = Math.abs(this.target - now);
            this.timer = setInterval(this.stoptimer, 100);
        }
    };
</script>