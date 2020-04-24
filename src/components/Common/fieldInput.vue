<template>
  <van-field
    v-model="fieldValue"
    :border="border"
    :clearable="clearable"
    :error="error"
    :input-align="inputAlign"
    :label-width="labelWidth"
    :label-class="labelClass"
    :label="inputLable"
    :maxlength="maxLength"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="asterisk"
    :right-icon="rightIcon"
    :type="inputType"
    @clear="clearData"
    @input="inputText"
    @click="clickText"
  >
    <van-icon
      slot="left-icon"
      v-if="iconType === 1"
      :name="leftIcon"
      class="icon"
    ></van-icon>
    <i
      slot="left-icon"
      v-if="iconType === 2"
      class="iconfont"
      :class="iconLeftClass"
    ></i>
    <img
      slot="left-icon"
      v-if="iconType === 3"
      :src="imgUrl"
      alt=""
      class="icon"
      :class="iconLeftClass"
    />
  </van-field>
</template>

<script>
import { Field } from 'vant'
export default {
  name: 'Field',
  components: {
    [Field.name]: Field
  },
  props: {
    arrowDirection: { type: String, default: 'right' },
    asterisk: { type: Boolean, default: false }, // 是否需要必填星号提示
    border: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    error: { type: Boolean, default: false }, // 错误输入标红
    iconType: { type: Number, defulat: 1 }, // 图标类型 1-vant默认图标或图片链接、2-iconfont图标
    iconLeftClass: { type: String, default: '' }, // 左侧icon
    inputData: { type: null, default: null }, // 输入值
    inputType: { type: String, default: 'text' }, // 输入框类型
    inputAlign: { type: String, default: 'right' }, // 输入框对齐方式
    inputLable: { type: String, default: '' }, // 输入框左侧文本内容
    imgUrl: { type: String, default: '' }, // 输入框左侧图标地址
    labelWidth: { type: String, default: '3rem' }, // 标签宽度
    labelClass: { type: String, default: '' }, // 标签
    leftIcon: { type: String, default: '' }, // 左侧图标名称-右箭头arrow
    minLength: { type: Number, default: 6 }, // 输入框类型
    maxLength: { type: Number, default: 100 }, // 输入框类型
    readonly: { type: Boolean, default: false }, // 只读模式
    rightIcon: { type: String, default: '' }, // 右侧图标名称-右箭头arrow
    placeholder: { type: String, default: '' } // 输入框右侧提示内容
  },
  data() {
    return {
      fieldValue: this.inputData
    }
  },
  watch: {
    inputData(val, oldVal) {
      if (val !== oldVal) this.fieldValue = val
    }
  },
  destroyed() {
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    clearData () {
      this.$emit('updateText', this.fieldValue)
    },
    inputText(val) {
      this.$emit('updateText', val)
    },
    clickText() {
      this.$emit('clickText')
    }
  }
}
</script>

<style lang="scss" scoped>
.default-input {
  font-size: 24px;
  padding-left: 20px;
}
.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 20px;
}
</style>
