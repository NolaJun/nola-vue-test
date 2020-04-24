<template>
  <div>
    <van-row type="flex" justify="center">
      <van-col
        :span="colSpan"
        v-for="(item, index) in buttonList"
        :key="index"
        @click="SetRadios(item)"
      >
        <van-button
          class="full-width"
          :round="round"
          :plain="plain"
          hairline
          :size="size"
          :color="
            (radio && item.id === current) ||
            (!radio && currents.indexOf(item.id) > -1)
              ? activeColor
              : color
          "
        >
          {{ "按钮" + item.name }}
        </van-button>
      </van-col>
    </van-row>
    <p class="font-14 line-height-double grey">
      选中项为： {{ radio ? name : names }}
    </p>
  </div>
</template>

<script>
import { Button, Radio, RadioGroup, Row, Col } from 'vant';
import { notify } from '../../static/util/message';
export default {
  name: 'radio',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup
  },
  props: {
    activeColor: { type: String, default: 'blue' }, // 'normal', large, small, mini
    buttonList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    colSpan: { type: Number, default: 4 },
    color: { type: String, default: 'grey' }, // 'normal', large, small, mini
    maxNumber: { type: Number, default: 4 }, // 多选最多个数
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    radio: { type: Boolean, default: true }, // 是否单选 是-true、否-false
    size: { type: String, default: 'normal' } // 'normal', large, small, mini
  },
  data() {
    return {
      index: 0,
      current: 0,
      currents: [],
      name: '',
      names: []
    };
  },
  destroyed() {
    Object.assign(this.$data, this.$data.options);
  },
  methods: {
    SetRadios(item) {
      if (this.radio) {
        this.current = item.id;
        this.name = item.name;
      } else {
        if (this.currents.indexOf(item.id) === -1) {
          // 不存在,则添加
          if (this.currents.length >= this.maxNumber)
            return notify('error.max_number');
          this.currents.push(item.id);
          this.names.push(item.name);
        } else {
          // 存在,则删除
          this.names.splice(this.currents.indexOf(item.id), 1);
          this.currents.splice(this.currents.indexOf(item.id), 1);
        }
      }
      let raidos = this.radio ? this.current : this.currents;
      this.$emit('UpdateRadio', raidos);
    }
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
  line-height: 3;
}
</style>
