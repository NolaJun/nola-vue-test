<template>
  <van-row
    type="flex"
    justify="space-around"
    class="clearfix"
    @click="CellClick(url)"
  >
    <van-col :span="5" class="text-center">
      <div v-if="icon" class="icon" :class="bgClass">
        <i class="iconfont" :class="iconClass"></i>
      </div>
      <img v-else :src="iconImg" alt="" class="icon-img" />
    </van-col>
    <van-col :span="21" class="cell-content">
      <van-row type="flex" justify="space-around">
        <van-col :span="18">
          <p class="font-16 dark-black title text-left">{{ cellTitle }}</p>
        </van-col>
        <van-col :span="6">
          <p class="date grey text-right">{{ cellValue }}</p>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col :span="22">
          <p class="font-14 light-black label text-left">{{ cellLabel }}</p>
        </van-col>
        <van-col :span="2">
          <van-tag round type="" color="#FF6934" v-if="num > 0">{{
            num
          }}</van-tag>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script>
import { Row, Col, Cell, Tag } from 'vant';
export default {
  name: 'IconCell',
  components: {
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell
  },
  props: {
    bgClass: { type: String, default: '' },
    cellLabel: { type: String, default: '' },
    cellTitle: { type: String, default: '' },
    cellValue: { type: String, default: '' },
    iconImg: { type: String, default: '' },
    icon: { type: Boolean, default: false },
    iconClass: { type: String, default: '' },
    num: { type: Number, default: 0 },
    url: { type: String, default: '' }
  },
  methods: {
    CellClick(url) {
      console.log(url);
      if (url !== '') this.$router.push({ path: url });
    }
  }
};
</script>
<style lang="scss" scoped>
@import " ../../static/css/common.scss";
.cell-content {
  padding-right: 30px;
  box-sizing: border-box;
}
.icon {
  width: 80px;
  height: 80px;
  display: block;
  margin: 24px auto;
  vertical-align: middle;
  .border-radius(10px);
  .line-height(80px);
  .text-center;
}
.icon-img {
  width: 80px;
  height: 80px;
  display: block;
  margin: 24px auto;
  vertical-align: middle;
}
p {
  &.title {
    margin: 10px 0;
    padding: 0;
  }
  &.date {
    margin: 10px 0;
    padding: 0;
  }
  &.label {
    margin: 0;
    padding: 0;
  }
}
</style>
