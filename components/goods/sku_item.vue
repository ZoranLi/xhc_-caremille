<template>
  <dd class="box">
    <a v-for="item in items" href="javascript:;" @click="changeSelect(item)" :class="[item.selected ? selected : '']">{{item.name && item.name.trim()}}</a>
  </dd>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      items: Array,
      parentName: String
    },
    computed: {

    },
    methods: {
      changeSelect: function (item) {
        var selected = item.selected;
        this.items.forEach(i => i.selected === true && (i.selected = false));
        item.selected || (item.selected = true);
      }
    }
  }
</script>
<style>
  .box {
    font-size: 0;
    text-align: justify;
  }

  .box a {
    display: inline-block;
    margin-right: .2rem;
    margin-top: .2rem;
    padding: .07rem .15rem;
    color: #4c4c4c;
    font-size: .24rem;
    border: 1px solid #f1f1f1;
    text-decoration: none;
    text-align: center;
    background: #f1f1f1;
    border-radius: 3px;
  }

  a.selected {
    color: #ff3167;
    background:#fff4f7;
    border:1px solid #ff3167;
  }

</style>
