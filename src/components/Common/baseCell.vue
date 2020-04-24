<template>
  <van-cell
    class="cell"
    :title="cellTitle"
    :label="cellLabel"
    :value="cellValue"
    :title-class="cellTitleClass"
    :label-class="cellLabelClass"
    :value-class="cellValueClass"
    @click="CellClick"
  >
    <van-icon
      slot="icon"
      v-if="needIcon"
      :name="iconUrl"
      @click="ClickIcon"
    ></van-icon>
  </van-cell>
</template>
<script>
import { Cell, Icon } from 'vant';
export default {
  name: 'BaseCell',
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  props: {
    cellLabel: { type: String, default: '' },
    cellTitle: { type: String, default: '' },
    cellValue: { type: String, default: '' },
    cellLabelClass: { type: String, default: '' },
    cellValueClass: { type: String, default: '' },
    cellTitleClass: { type: String, default: '' },
    iconUrl: { type: String, default: '' },
    needIcon: { type: Boolean, default: false }
  },
  methods: {
    ClickIcon() {
      this.$emit('IconClick');
    },
    CellClick() {
      this.$emit('cellClick');
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell-group__title {
  padding: 20px 10px;
  line-height: 2;
  font-size: 28px;
}
.cell-group {
}
.cell {
  padding: 20px 10px;
  line-height: 2;
  font-size: 28px;
}
.van-icon {
  line-height: 2;
}
</style>
