<template>
  <van-field
    class="font-12"
    v-model="inputVal"
    :disabled="disabled"
    :input-align="inputAlign"
    :label="inputLable"
    :label-width="labelWidth"
    :maxlength="maxLength"
    :readonly="readonly"
    :placeholder="placeholder"
    @input="updateText"
  >
    <div slot="left-icon">
      <van-icon v-if="iconType === 1" :name="leftIcon"></van-icon>
      <i v-if="iconType === 2" class="iconfont" :class="iconLeftClass"></i>
      <img
        slot="left-icon"
        v-if="iconType === 3"
        :src="imgUrl"
        alt=""
        class="icon"
        :class="iconLeftClass"
      />
    </div>
    <van-button
      class="slot-button"
      :class="border ? '' : 'no-border'"
      slot="button"
      size="mini"
      type="warning"
      plain
      round
      @click="getCheckCode"
    >
      {{ times === 60 ? buttonLable : times + "s后重新发送" }}
    </van-button>
  </van-field>
</template>
<script>
import { Field, Button } from 'vant';
import { notify } from '../../../static/js/util/message';
import { ajaxPost } from '../../../static/js/util/apiHttp';
export default {
  name: 'CheckCodeField',
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
    border: { type: Boolean, default: true },
    buttonLable: { type: String, default: '', required: true },
    clearable: { type: Boolean, default: true },
    codeUrl: { type: String, default: '', required: true },
    disabled: { type: Boolean, default: false },
    leftIcon: { type: String, default: '' }, // 左侧图标名称-右箭头arrow
    iconLeftClass: { type: String, default: '' }, // 左侧icon
    iconType: { type: Number, defulat: 1 }, // 图标类型 1-vant默认图标或图片链接、2-iconfont图标
    inputAlign: { type: String, default: 'right' },
    inputData: { type: String, default: '', required: true },
    inputLable: { type: String, default: '' },
    imgUrl: { type: String, default: '' }, // 输入框左侧图标地址
    labelWidth: { type: String, default: '3rem' }, // 标签宽度
    mobile: { type: String, default: '', required: true },
    maxLength: { type: Number, default: 4 }, // 默认验证码长度4，其他自定义
    required: { type: Boolean, default: false }, // *必填
    readonly: { type: Boolean, default: true },
    type: { type: Number, default: 1 }, // 1-普通验证码，2-邀请验证码
    orgId: { type: String, default: '' }, // type=2时，组织id
    placeholder: { type: String, default: '' }
  },
  data() {
    return {
      inputVal: '',
      flag: false,
      times: 60,
      timer: null // 定时器名称
    };
  },
  activated() {
    this.inputVal = this.inputData;
  },
  beforeDestroy() {
    clearInterval(this.timer);
    Object.assign(this.$data, this.$options.data());
  },
  watch: {
    inputData(val, old) {
      if (val !== old) this.carPlate = val;
    },
    buttonLable(val, old) {
      if (val !== old) this.$forceUpdate();
    },
    disabled(val, old) {
      if (val !== old) this.$forceUpdate();
    },
    readonly(val, old) {
      if (val !== old) this.$forceUpdate();
    },
    mobile(val) {
      return val;
    }
  },
  methods: {
    getCheckCode() {
      let that = this;
      if (this.readonly && this.mobile.length !== 11)
        return notify('login.new_mobile');
      if (that.flag) return;
      that.flag = true;
      let params = {
        // 获取验证码所需参数
        mobile: that.mobile
      };
      if (that.type === 2) params.org_id = this.orgId;
      that.timeCountDown();

      ajaxPost(this.codeUrl, params).then(res => {
        if (res.code === 200) {
          notify('tip.check_code');
        } else {
          clearInterval(that.timer);
          that.flag = false;
          that.times = 60;
        }
      });
    },
    timeCountDown() {
      let that = this;
      that.timer = setInterval(() => {
        if (that.times === 0) {
          clearInterval(that.timer);
          that.flag = false;
          that.times = 60;
        } else {
          that.times--;
        }
      }, 1000);
    },
    updateText() {
      if (!this.readonly) this.$emit('updateText', this.inputVal);
    }
  }
};
</script>
<style lang="less" scoped>
.slot-button {
  margin: auto;
  border-radius: 0.5rem;
  background: transparent;
  height: 1.2rem;
  line-height: initial;
  padding: 0 0.5rem;
  box-sizing: border-box;
}
.icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 20px;
}
.no-border {
  border: 0;
}
</style>
