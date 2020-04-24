<template>
  <div class="login">
    <van-row type="flex" justify="center">
      <van-col :span="24" class="banner-register">
        <van-image
          class="logo"
          :src="require('../../static/img/icon-logo.png')"
        ></van-image>
        <p class="white register-title">{{ $t('login.title') }}</p>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <field-input
          class="form-input input-border"
          ref="mobile"
          :border="true"
          :clearable="true"
          :input-align="'left'"
          :input-data="mobile"
          :label-width="'0'"
          :icon-type="3"
          :icon-left-class="'icon-mobile'"
          :img-url="require('../../static/img/icon-mobile.png')"
          :input-lable="''"
          :placeholder="$t('register.placeholder.mobile')"
          :max-length="11"
          @updateText="setMobile"
        ></field-input>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <field-input
          class="form-input input-border"
          ref="mobile"
          :border="true"
          :clearable="true"
          :icon-type="3"
          :icon-left-class="'icon-lock'"
          :img-url="require('../../static/img/icon-lock.png')"
          :input-align="'left'"
          :input-data="password"
          :input-lable="''"
          :input-type="'password'"
          :label-width="'0'"
          :placeholder="$t('register.placeholder.password')"
          :min-length="6"
          :max-length="12"
          @updateText="setPassword"
        ></field-input>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <router-link :to="'/resetPassword'"
          ><p class="rest-password grey text-right">
            {{ $t('login.forget_password') }}
          </p></router-link
        >
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <van-button
          class="button-full white"
          type="info"
          round
          :loading="false"
          @click="complate"
          >{{ $t('login.name') }}</van-button
        >
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <van-button
          class="button-full blue border-blue"
          type="default"
          round
          :loading="false"
          to="Register"
          >{{ $t('register.name') }}</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Image, Field, Button } from 'vant'
import fieldInput from '../../components/Common/fieldInput'
import { notify } from '../../static/js/util/message'
import { ajaxPost } from '../../static/js/util/apiHttp'
import {saveGuest, saveRules, saveToken} from '../../static/js/global/login'
import { GetOpenid } from '../../static/js/global/global'
export default {
  name: 'Login',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    fieldInput
  },
  props: {},
  data() {
    return {
      mobile: '',
      password: '',
      checkPassword: '',
      smscode: ''
    }
  },
  methods: {
    setMobile(obj) {
      this.mobile = obj
    },
    setPassword(obj) {
      this.password = obj
    },
    complate() {
      if (this.mobile === '') return notify('login.verify.mobile.required')
      if (this.mobile.length !== 11)
        return notify('login.verify.mobile.wrong_format')
      if (this.password === '')
        return notify('register.verify.password.required')
      if (this.password.length > 12 || this.password.length < 6)
        return notify('register.verify.password.between')
      let params = {
        mobile: this.mobile,
        password: this.password,
        driver_code: GetOpenid(),
        type: 4
      }
      ajaxPost('/Employee/Login', params).then(res => {
        if (res.code === 200) {
          saveToken(res.data.token)
          saveRules(res.data.rules)
          saveGuest(res.data.guest)
          // generateRoute(menus.menus)
          // 重定向至之前的路由
          let redirect = this.$route.query.redirect
          if (!redirect) {
            if (res.data.guest === 1) {
              this.$router.push('/Mine')
            } else {
              this.$router.push('/Index')
            }
          } else {
            this.$router.push('' + redirect)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./login.scss" scoped></style>
