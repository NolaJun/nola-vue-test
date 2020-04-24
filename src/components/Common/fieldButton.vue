<template>
  <van-field
    class="font-12"
    :label="inputLable"
    v-model="carPlate"
    :readonly="readonly"
    :input-align="'right'"
  >
    <van-button
      class="btn-change"
      slot="button"
      v-if="carsLength > 0"
      plain
      round
      type="warning"
      size="small"
      @click="changeClick"
      >{{ $t("car.switch_vehicle") }}</van-button
    >
    <van-button
      class="btn-change"
      slot="button"
      v-else
      size="small"
      plain
      round
      type="warning"
      @click="changeClick"
      >{{ $t("reservation.no_car") }}</van-button
    >
  </van-field>
</template>
<script>
import { Field, Button, CellGroup } from 'vant';
export default {
  name: 'fieldButton',
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
    readonly: { type: Boolean, default: true },
    carsLength: { type: Boolean, default: true },
    inputLable: { type: String, default: '' },
    inputData: { type: String, default: '', required: true }
  },
  data() {
    return {
      carPlate: '',
      flag: false,
      times: 60,
      timer: null // 定时器名称
    };
  },
  activated() {
    this.carPlate = this.inputData;
  },
  watch: {
    inputData(val, old) {
      if (val !== old) this.carPlate = val;
    }
  },
  methods: {
    changeClick() {
      this.$emit('setClick', this.carPlate);
    }
  }
};
</script>
<style lang="scss" scoped>
.van-field__button {
  width: 5rem !important;
}
.btn-change {
  margin: auto;
  border-radius: 0.5rem;
  background: transparent;
  height: 1.2rem;
  line-height: initial;
  padding: 0 0.5rem;
  box-sizing: border-box;
}
</style>
