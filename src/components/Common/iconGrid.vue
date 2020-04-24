<template>
  <van-grid
    class="grid"
    :gutter="10"
    :border="false"
    v-model="active"
    :column-num="coulumnNum"
  >
    <van-grid-item
      class="grid-item"
      v-for="i in list"
      :key="i.id"
      :text="i.title"
      @click="itemClick(i)"
    >
      <i slot="icon" class="iconfont" :class="i.icon"></i>
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
    coulumnNum: { type: Number, default: 4 },
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
@import ' ../../static/css/color';
.grid {
  .grid-item {
    margin: 10px 0;
  }
  .van-icon__image {
    width: 80px !important;
    height: 80px !important;
  }
  .van-grid-item__text {
    font-size: 24px;
  }
  .van-hairline--top::after,
  .van-grid-item__content::after {
    border: 0;
  }
  .iconfont {
    font-size: 60px;
  }
}
</style>
