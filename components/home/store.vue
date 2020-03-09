<style>
  .template_image {
    display: block;
    width: 100%;
    height: 4.3rem;
    background-size: cover;
  }
</style>

<template>
  <ul>
    <li v-for="(image,key) in imageList">
      <div class='template_image' :data-src="image | optimize('small3x')"></div>
    </li>
  </ul>
</template>

<script>

  import LazyLoad from '~/lib/lazyload'
  import optimize from '~/filters/imgOptimize'

  export default {
    data() {
      return {
        imageList: [
          '/images/1562054250687_N45HFE7Ac3.png',
          '/images/1562054250687_N45HFE7Ac3.png',
          '/images/1562054250687_N45HFE7Ac3.png',
          '/images/1562054250687_N45HFE7Ac3.png',
          '/images/1562054250687_N45HFE7Ac3.png',
          '/images/1562054250687_N45HFE7Ac3.png',
        ]
      }
    },
    filters: {
      optimize
    },
    mounted() {
      this.lazyload = new LazyLoad({selector: 'div[data-src]'})
    }
  }

</script>
