<template>
  <van-grid class="grid" v-model="active" :column-num="coulumnNum">
    <van-grid-item
      v-for="i in list"
      :key="i.id"
      :icon="i.img"
      @click="itemClick(i)"
    >
      <i class="iconfont" slot="icon" v-if="icon" :class="i.iconClass"></i>
      <p slot="text" :class="textColor">{{ i.title }}</p>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { Grid, GridItem, Image } from 'vant';
export default {
  name: 'GridSection',
  components: {
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  props: {
    textColor: { type: String, default: '' },
    background: { type: String, default: 'white' },
    coulumnNum: { type: Number, default: 4 },
    icon: { type: Boolean, default: false }, // 是否自定义icon
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      active: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    itemClick(item) {
      this.$emit('gridItem', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import " ../../static/css/common.scss";
</style>
<style lang="scss">
.grid {
  .van-icon__image {
    width: 60px !important;
    height: 60px !important;
    margin-bottom: 30px;
  }
  .van-icon__image:first-of-type {
    width: 52px !important;
    height: 51px !important;
  }
  .van-grid-item__text {
    font-size: 24px;
  }
  .van-hairline--top::after,
  .van-grid-item__content::after {
    border: 0;
  }
  .van-grid-item__content {
    background: transparent;
  }
}
</style>
