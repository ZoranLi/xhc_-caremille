<style>
  .list_container {
    padding-bottom: 2rem;
  }

  .list_container img {
    vertical-align: top;
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    background-size: 100% 100%;
    background-position: 50%;
  }
</style>

<template>
  <van-tree-select
    height="100vh"
    :items="items"
    :main-active-index.sync="active">
    <template slot="content">
      <div class="list_container">
        <ul>
          <li v-for="(item,index) in goodsList" @click="detail(item.g_id)">
            <p>{{item.g_name}}</p>
            <img :src="item.g_image | optimize('small3x')" alt="">
          </li>
        </ul>
      </div>
    </template>
  </van-tree-select>
</template>

<script>
  import LazyLoad from '~/lib/lazyload'
  import optimize from '~/filters/imgOptimize'
  import Vue from 'vue';
  import {TreeSelect} from 'vant';

  Vue.use(TreeSelect);

  export default {
    data() {
      return {
        active: 0,
        items: [
          {
            text: '全部',
            id: 1
          },
          {
            text: '热销爆款',
            id: 2
          },
          {
            text: '新品上市',
            id: 3
          },
          {
            text: '跟妆',
            id: 4
          },
          {
            text: '唇妆',
            id: 5
          }
        ],
        goodsList: [],
        goodsList1: [{
          "tg_id": 170293,
          "g_id": 7060,
          "g_name": "MAC 魅可 子弹头口红 #cb96 3g",
          "g_price_shop": 59,
          "origin_g_price_shop": 165,
          "g_price_market": 299,
          "g_title": "橘色偏光人鱼姬",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_12708_1583312404364.png",
          "gd_number": 0,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=12708&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170282,
          "g_id": 19873,
          "g_name": "Elizabeth Arden 伊丽莎白雅顿 超时空精华粉胶胶囊 30粒",
          "g_price_shop": 209,
          "origin_g_price_shop": 288,
          "g_price_market": 400,
          "g_title": "雅顿小粉胶",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19873_1583312401726.png",
          "gd_number": 25,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19873&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170290,
          "g_id": 14875,
          "g_name": "Shiseido 资生堂 安耐晒/安热沙 摇摇乐小金瓶防晒霜 SPF50+ PA++++ 60ml",
          "g_price_shop": 175,
          "origin_g_price_shop": 218,
          "g_price_market": 259,
          "g_title": "油皮必入防晒",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_14875_1583312404247.png",
          "gd_number": 83,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=14875&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170292,
          "g_id": 19062,
          "g_name": "MAC 魅可 独角兽高光 #Lightscapade 10g",
          "g_price_shop": 259,
          "origin_g_price_shop": 299,
          "g_price_market": 599,
          "g_title": "绝美神仙高光",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19062_1583318701534.png",
          "gd_number": 25,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19062&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170283,
          "g_id": 18534,
          "g_name": "ARMANI 阿玛尼 红色轻垫精华粉底液 ＃2 15g",
          "g_price_shop": 399,
          "origin_g_price_shop": 539,
          "g_price_market": 630,
          "g_title": "卓越遮瑕 丝光妆感",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18534_1583312403925.png",
          "gd_number": 6,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18534&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170296,
          "g_id": 18612,
          "g_name": "NARS 炫色腮红 #orgasm 高潮 4.8g",
          "g_price_shop": 159,
          "origin_g_price_shop": 229,
          "g_price_market": 350,
          "g_title": "腮红界的鼻祖",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18612_1583312402680.png",
          "gd_number": 2,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18612&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170288,
          "g_id": 10902,
          "g_name": "IPSA 茵芙莎 粘土按摩泥面膜 100g",
          "g_price_shop": 299,
          "origin_g_price_shop": 339,
          "g_price_market": 350,
          "g_title": "轻松吸附黑白头",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_10902_1583312401756.png",
          "gd_number": 30,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=10902&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 171252,
          "g_id": 17888,
          "g_name": "Dr.jart+ 蒂佳婷 蓝色药丸深层保湿补水面膜 5片/盒 2盒装",
          "g_price_shop": 99,
          "origin_g_price_shop": 139,
          "g_price_market": 336,
          "g_title": "薄透服帖巨补水",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_17888_1583315753848.png",
          "gd_number": 19,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=17888&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170298,
          "g_id": 19668,
          "g_name": "LANCOME 兰蔻 菁纯柔润黑管宝石唇膏 #02 RUBY QUEEN 3g",
          "g_price_shop": 229,
          "origin_g_price_shop": 269,
          "g_price_market": 270,
          "g_title": "超显气色的胡萝卜",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19668_1583312400657.png",
          "gd_number": 10,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19668&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170297,
          "g_id": 19865,
          "g_name": "ARMANI 阿玛尼 简约防水珍珠贝母女士手表",
          "g_price_shop": 899,
          "origin_g_price_shop": 2599,
          "g_price_market": 3390,
          "g_title": "时尚小心机",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19865_1583312403024.png",
          "gd_number": 29,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19865&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170284,
          "g_id": 18263,
          "g_name": "Givenchy 纪梵希 高级定制小羊皮唇膏 #306 3.4g",
          "g_price_shop": 199,
          "origin_g_price_shop": 269,
          "g_price_market": 355,
          "g_title": "易烊千玺亲选色号",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18263_1583312406442.png",
          "gd_number": 7,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18263&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170281,
          "g_id": 14074,
          "g_name": "Jo Malone 祖马龙 英国梨与小苍兰香水 30ml",
          "g_price_shop": 299,
          "origin_g_price_shop": 449,
          "g_price_market": 580,
          "g_title": "明媚优雅英伦风",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_14074_1583312402682.png",
          "gd_number": 13,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=14074&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170294,
          "g_id": 19824,
          "g_name": "CLARINS 娇韵诗 焕颜弹力全明星眼霜 15ml",
          "g_price_shop": 329,
          "origin_g_price_shop": 429,
          "g_price_market": 530,
          "g_title": "“眼“绎神采",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19824_1583312400709.png",
          "gd_number": 19,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19824&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170280,
          "g_id": 14919,
          "g_name": "FRESH 馥蕾诗 大豆精粹卸妆洁颜凝露保湿洗面奶 150ml",
          "g_price_shop": 169,
          "origin_g_price_shop": 315,
          "g_price_market": 520,
          "g_title": "“护肤式”温和洁面",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_14919_1583312401600.png",
          "gd_number": 1,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=14919&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 171251,
          "g_id": 17819,
          "g_name": "Shiseido 资生堂 FWB隔离霜 35g",
          "g_price_shop": 69,
          "origin_g_price_shop": 85,
          "g_price_market": 99,
          "g_title": "隔离彩妆和污垢",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_17819_1583312402178.png",
          "gd_number": 20,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=17819&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170289,
          "g_id": 16529,
          "g_name": "RCMA 无色透明定妆散粉 3Oz",
          "g_price_shop": 99,
          "origin_g_price_shop": 119,
          "g_price_market": 129,
          "g_title": "美国畅销散粉",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_16529_1583312400782.png",
          "gd_number": 19,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=16529&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170299,
          "g_id": 18797,
          "g_name": "MICHAEL KORS Cece皮质铆钉单肩包 中号 多颜色可选",
          "g_price_shop": 1199,
          "origin_g_price_shop": 2599,
          "g_price_market": 5800,
          "g_title": "别具一格的时髦感",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18797_1583312402832.png",
          "gd_number": 8,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18797&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170285,
          "g_id": 18718,
          "g_name": "VENUS MARBLE 9色复古油画眼影盘 拜金主义 13.5g",
          "g_price_shop": 99,
          "origin_g_price_shop": 119,
          "g_price_market": 139,
          "g_title": "一盘打造夺目眼妆",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18718_1583312403506.png",
          "gd_number": 10,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18718&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170286,
          "g_id": 18266,
          "g_name": "Cosme Decorte 黛珂 高机能紫苏水化妆水 300ml",
          "g_price_shop": 349,
          "origin_g_price_shop": 509,
          "g_price_market": 530,
          "g_title": "消灭闭口神器",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18266_1583312404745.png",
          "gd_number": 5,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18266&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170300,
          "g_id": 18802,
          "g_name": "【预计10号发货】CHAMPION 渔夫帽 多颜色可选",
          "g_price_shop": 148,
          "origin_g_price_shop": 238,
          "g_price_market": 368,
          "g_title": "百搭渔夫帽",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18802_1583394319914.jpg",
          "gd_number": 10,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18802&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170279,
          "g_id": 18564,
          "g_name": "MAC 魅可 子弹头哑光唇膏 #Devoted to chili 3g",
          "g_price_shop": 129,
          "origin_g_price_shop": 165,
          "g_price_market": 299,
          "g_title": "泫雅画报同款",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18564_1583312402037.png",
          "gd_number": 9,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=18564&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170295,
          "g_id": 16234,
          "g_name": "EMPORIO ARMANI 阿玛尼 镶钻满天星系列女士手表 多规格可选",
          "g_price_shop": 980,
          "origin_g_price_shop": 2990,
          "g_price_market": 3990,
          "g_title": "时尚简约气质百搭",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_16234_1583312402532.png",
          "gd_number": 18,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=16234&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }, {
          "tg_id": 170291,
          "g_id": 19321,
          "g_name": "Atreus 生姜洗发水 400ml 2瓶装",
          "g_price_shop": 69,
          "origin_g_price_shop": 139,
          "g_price_market": 170,
          "g_title": "防脱修复小能手",
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19321_1583312401881.png",
          "gd_number": 29,
          "mark": null,
          "activity_content": "限时价",
          "jump_url": "xhc://xiaohongchun/params?goods=19321&track_info=%7B%22api%22%3A%22%2Fgoods%2Ftopic%2F5230%22%7D"
        }],
        goodsList2: [{
          "g_id": 18265,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18265_1583312407796.png",
          "g_name": "Givenchy 纪梵希 高级定制小羊皮唇膏 #304 3.4g",
          "g_price_market": 355,
          "g_price_shop": 189,
          "g_price_rushbuy": 189,
          "g_title": "春夏必备西柚红",
          "gd_number": 12,
          "original_price_shop": 269
        }, {
          "g_id": 12677,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_12677_1583312407804.png",
          "g_name": "Kiehl's 科颜氏 集焕白淡斑精华液 50ml",
          "g_price_market": 780,
          "g_price_shop": 469,
          "g_price_rushbuy": 469,
          "g_title": "一瓶就能白",
          "gd_number": 12,
          "original_price_shop": 539
        }, {
          "g_id": 19853,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19853_1583312401601.png",
          "g_name": "GUCCI 古驰 花之舞女士淡香水 绚丽栀子花 30ml",
          "g_price_market": 459,
          "g_price_shop": 279,
          "g_price_rushbuy": 279,
          "g_title": "古驰花之舞",
          "gd_number": 8,
          "original_price_shop": 349
        }, {
          "g_id": 19057,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19057_1583312400771.png",
          "g_name": "DHC 蝶翠诗 橄榄卸妆油 200ml",
          "g_price_market": 218,
          "g_price_shop": 109,
          "g_price_rushbuy": 109,
          "g_title": "深层卸妆无残留",
          "gd_number": 25,
          "original_price_shop": 139
        }, {
          "g_id": 17327,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_17327_1583312407909.png",
          "g_name": "DONGSUNG 东星制药 琅丝曲酸去斑霜 70g",
          "g_price_market": 269,
          "g_price_shop": 159,
          "g_price_rushbuy": 159,
          "g_title": "平价黛珂+兰蔻",
          "gd_number": 35,
          "original_price_shop": 229
        }, {
          "g_id": 18226,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18226_1583312400736.png",
          "g_name": "Estee Lauder 雅诗兰黛 肌透修护眼部密集精华 15ml",
          "g_price_market": 560,
          "g_price_shop": 329,
          "g_price_rushbuy": 329,
          "g_title": "眼部专用小棕瓶",
          "gd_number": 12,
          "original_price_shop": 459
        }, {
          "g_id": 18634,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18634_1583312401666.png",
          "g_name": "ARMANI 阿玛尼 臻致丝绒哑光唇釉 #405 番茄红6.5ml",
          "g_price_market": 320,
          "g_price_shop": 258,
          "g_price_rushbuy": 258,
          "g_title": "超难买番茄色",
          "gd_number": 20,
          "original_price_shop": 298
        }, {
          "g_id": 18668,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18668_1583312407909.png",
          "g_name": "MAC 魅可 子弹头口红 #922 werk werk werk 3g",
          "g_price_market": 299,
          "g_price_shop": 125,
          "g_price_rushbuy": 125,
          "g_title": "人间正气小桃红",
          "gd_number": 28,
          "original_price_shop": 165
        }, {
          "g_id": 19846,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19846_1583312407861.png",
          "g_name": "Shiseido 资生堂 洗颜专科 柔澈泡沫洗面奶 120g 3支装",
          "g_price_market": 144,
          "g_price_shop": 89.9,
          "g_price_rushbuy": 89.9,
          "g_title": "超绵密泡泡",
          "gd_number": 40,
          "original_price_shop": 109
        }, {
          "g_id": 18729,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18729_1583312407815.png",
          "g_name": "VT 范特 老虎睡眠面膜条 4ml*30",
          "g_price_market": 149,
          "g_price_shop": 89,
          "g_price_rushbuy": 89,
          "g_title": "修复光损伤",
          "gd_number": 13,
          "original_price_shop": 119
        }, {
          "g_id": 19847,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19847_1583312406066.png",
          "g_name": "NARS 纳斯 裸光透明蜜粉 #1410 10g",
          "g_price_market": 400,
          "g_price_shop": 249,
          "g_price_rushbuy": 249,
          "g_title": "明星定妆单品",
          "gd_number": 8,
          "original_price_shop": 339
        }, {
          "g_id": 18914,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18914_1583312407971.jpg",
          "g_name": "MAC 魅可 子弹头磨砂哑光唇膏 #314 Mull it over 蜜桃奶茶色 3g",
          "g_price_market": 299,
          "g_price_shop": 125,
          "g_price_rushbuy": 125,
          "g_title": "温柔蜜桃奶茶色",
          "gd_number": 8,
          "original_price_shop": 165
        }, {
          "g_id": 19252,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19252_1583312407809.png",
          "g_name": "LANEIGE 兰芝 雪纱修颜气垫隔离 15g*2 多规格可选",
          "g_price_market": 275,
          "g_price_shop": 109,
          "g_price_rushbuy": 109,
          "g_title": "妆前隔离遮瑕防护",
          "gd_number": 18,
          "original_price_shop": 179
        }, {
          "g_id": 19610,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19610_1583312400793.png",
          "g_name": "Sesderma 舒敏焕白身体乳 400ml",
          "g_price_market": 288,
          "g_price_shop": 108,
          "g_price_rushbuy": 108,
          "g_title": "范冰冰同款身体乳",
          "gd_number": 30,
          "original_price_shop": 228
        }, {
          "g_id": 19708,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19708_1583312400748.png",
          "g_name": "PAESE 派斯 沁肤粉底液 #1 30ml",
          "g_price_market": 139,
          "g_price_shop": 79,
          "g_price_rushbuy": 79,
          "g_title": "微光奶油肌",
          "gd_number": 15,
          "original_price_shop": 99
        }, {
          "g_id": 18559,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_18559_1583312401520.jpeg",
          "g_name": "EMPORIO ARMANI 阿玛尼 多功能时尚商务男士石英表",
          "g_price_market": 2980,
          "g_price_shop": 999,
          "g_price_rushbuy": 999,
          "g_title": "金城武海报同款",
          "gd_number": 26,
          "original_price_shop": 2599
        }, {
          "g_id": 19711,
          "g_image": "https://wicdn.xiaohongchun.com/goodsmark/goodsmark_19711_1583312400658.png",
          "g_name": "SWAROVSKI 施华洛世奇 NORTH NORTH手链 镀玫瑰金色",
          "g_price_market": 1490,
          "g_price_shop": 639,
          "g_price_rushbuy": 639,
          "g_title": "悦动光彩手镯",
          "gd_number": 4,
          "original_price_shop": 1039
        }]
      }
    },
    filters: {
      optimize
    },
    watch: {
      active(val, old) {
        if (this.goodsList !== this.goodsList2) {
          this.goodsList = this.goodsList2
        } else {
          this.goodsList = this.goodsList1
        }
      }
    },
    methods:{
      detail(id){
        location.href = `/goods/${id}`
      }
    },
    mounted() {
      this.lazyload = new LazyLoad({selector: 'img[data-src]'})
      this.goodsList = this.goodsList1
    }
  }

</script>
