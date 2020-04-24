<template>
  <van-nav-bar :title="title" @click-left="cancel" @click-right="save">
    <p class="" slot="title">{{ title }}</p>
    <p class="" slot="left">
      {{ leftText ? leftText : $t("operation.cancel") }}
    </p>
    <p class="orange" slot="right">
      {{ rightText ? rightText : $t("operation.done") }}
    </p>
  </van-nav-bar>
</template>
<script>
import { NavBar } from 'vant';
export default {
  name: 'navBarHeader',
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: { type: String, default: '' },
    leftText: { type: String, default: '取消' },
    rightText: { type: String, default: '确定' }
  },
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit('cancelFn');
    },
    save() {
      this.$emit('saveFn');
    }
  }
};
</script>
