<template>
    <div class="header">
        <span v-if="!$parent.hide_back" class="back">
            <svg
                t="1536740101174"
                class="icon"
                style
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1640"
                data-spm-anchor-id="a313x.7781069.0.i7"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="90%"
                height="90%"
            >
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M738.145103 170.248828 663.234207 95.337931 313.114483 445.457655 312.937931 445.298759 238.768552 519.450483 238.945103 519.627034 238.768552 519.785931 313.679448 594.696828 313.838345 594.537931 658.996966 939.696552 733.166345 865.509517 388.007724 520.368552Z"
                    p-id="1641"
                    fill="#fff"
                ></path>
            </svg>
        </span>
        <p class="title">{{ $parent.title }}</p>
    </div>
</template>

<script>
import goBack from '~/lib/go_back'
export default {
    mounted() {
        if (document.getElementsByClassName("back")[0]) {
            document.getElementsByClassName("back")[0].onclick = function() {
                goBack()
            };
        }
    }
};
</script>


<style>
body {
    min-height: 100vh;
    background-color: #200932;
}
.header{
    position: relative;
}
.header .title {
    font-size: 0.34rem;
    font-weight: 500;
    text-align: center;
    width: 5rem;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 0.1rem;
    line-height: 0.76rem;
    height: 0.76rem;
    color: #fff;
}
.header .back {
    position: absolute;
    display: block;
    width: 0.45rem;
    height: 0.45rem;
    text-align: center;
    line-height: 0.45rem;
    left: 0.4rem;
    top: 0.255rem;
    font-size: 0;
}
.header .close {
    position: absolute;
    display: block;
    width: 0.9rem;
    height: 0.9rem;
    right: 0.4rem;
    top: 0.255rem;
    font-size: 0;
    text-align: center;
    line-height: 0.45rem;
    transform: scale(0.45);
    transform-origin: top right;
}

</style>

