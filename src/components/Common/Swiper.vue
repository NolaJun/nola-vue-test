<template>
  <div class="detail-swiper" :style="{ height: height + 'px' }">
    <!-- 轮播图 -->
    <van-swipe
      v-if="list.length > 0"
      :autoplay="3000"
      :width="swiperWidth"
      :height="swiperHeight"
      indicator-color="#f79836"
    >
      <van-swipe-item
        class="img_center"
        v-for="(item, index) in list"
        :key="index"
        @click="linkPage(item)"
        ><!--375*150-->
        <van-image
          class="slider-img"
          :class="isGame ? 'img-distance' : ''"
          :src="isLink ? item.full_url : item.img ? item.img : item"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
    <img
      v-else
      src="/src/static/img/load-failed.jpg"
      alt=""
      class="slider-img"
    />
  </div>
</template>
<script>
import { Swipe, SwipeItem, Lazyload, Image } from 'vant';
export default {
  name: 'Swiper',
  components: {
    [Image.name]: Image,
    [Lazyload.name]: Lazyload,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    height: { type: Number, default: 750 },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isGame: { type: Boolean, default: false }, // 是否是游戏
    isLink: { type: Boolean, default: false } // 是否路由外跳转
  },
  data() {
    return {
      swiperWidth: document.body.clientWidth,
      swiperHeight: document.body.clientWidth,
      option: {
        direction: 'horizontal',
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false
        },
        speed: 1000,
        mousewheel: true,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    };
  },
  activated() {
    this.swiperHeight = this.height;
    // this.swiperHeight = this.isLink ? this.height : document.body.clientWidth
  },
  watch: {
    swiperHeight(val) {
      return this.isLink ? this.height : document.body.clientWidth;
    }
  },
  computed: {
    Swiper() {
      return this.$refs.Swiper.swiper;
    }
  },
  methods: {
    linkPage(item) {
      this.$emit('linkPage', item);
    }
  }
};
</script>
<style lang="scss">
.detail-swiper {
  width: 100%;
  overflow: hidden;
  .banner-swiper {
    height: 100% !important;
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 0.05rem;
      text-align: right;
      padding-right: 0.8rem;
      box-sizing: border-box;
    }
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background: #f3ceaf;
    }
    .swiper-pagination-bullet-active {
      background: #fe8247;
    }
  }
  .slider-img {
    height: 100%;
    width: 100%;
  }
  .img-distance {
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
