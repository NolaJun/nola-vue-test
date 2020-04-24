<template>
  <div class="img_center">
    <img src="../../../static/img/start-up-page.png" alt="" />
  </div>
</template>
<script>
import {
  // generateRoute,
  saveRules,
  saveToken
} from '../../../static/js/global/login';
import { GetOpenid } from '../../../static/js/global/global';
import { ajaxPost } from '../../../static/js/util/apiHttp';
import store from '../../store';

export default {
  name: 'StartUpPage',
  data() {
    return {};
  },
  activated() {
    console.log(GetOpenid());
    this.autoLogin(GetOpenid());
  },
  methods: {
    autoLogin(openid) {
      let params = {
        type: 4,
        driver_code: openid
      };
      ajaxPost('/Employee/AutoLogin', params).then(res => {
        if (res.code === 200) {
          saveToken(res.data.token);
          saveRules(res.data.rules);
          // generateRoute(menus.menus);
          store.dispatch('user/setUser', res.data.customer);
          setTimeout(() => {
            this.$router.push('/Index');
          }, 3000);
        } else {
          console.log(res.code);
          setTimeout(() => {
            this.$router.push({ name: 'Login' });
          }, 3000);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../static/css/base.less';
</style>
