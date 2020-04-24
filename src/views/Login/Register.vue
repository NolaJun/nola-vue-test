<template>
  <div class="register">
    <!--    <img src="../../assets/login.jpg">正确-->
    <!--    <van-image src="../../assets/login.jpg"></van-image>错误-->
    <van-row type="flex" justify="center">
      <van-col :span="24" class="banner-register">
        <van-image
          class="logo text-center img_center"
          :src="require('../../static/img/icon-logo.png')"
        ></van-image>
        <p class="white text-center register-title">
          {{ $t('register.title') }}
        </p>
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
        <field-checkcode
          class="form-input input-border"
          ref="smscode"
          :border="false"
          :button-lable="$t('register.get_checkcode')"
          :clearable="true"
          :code-url="'/Register/RegisterCode'"
          :icon-type="3"
          :icon-left-class="'icon-mobile'"
          :img-url="require('../../static/img/icon-code.png')"
          :input-align="'left'"
          :input-data="smscode"
          :label-width="'0'"
          :input-lable="''"
          :max-length="6"
          :mobile="mobile"
          :placeholder="$t('register.placeholder.smscode')"
          :readonly="false"
          @updateText="setSmscode"
        ></field-checkcode>
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
        <field-input
          class="form-input input-border"
          ref="mobile"
          :border="true"
          :clearable="true"
          :icon-type="3"
          :icon-left-class="'icon-lock'"
          :img-url="require('../../static/img/icon-lock.png')"
          :input-align="'left'"
          :input-data="checkPassword"
          :input-lable="''"
          :input-type="'password'"
          :label-width="'0'"
          :placeholder="$t('register.placeholder.check_password')"
          :min-length="6"
          :max-length="12"
          @updateText="setCheckPassword"
        ></field-input>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="row-top">
      <van-col :span="18">
        <van-button
          class="button-full white"
          type="info"
          round
          :loading="false"
          @click="complete"
          >{{ $t('button.complete') }}</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Row, Col, Image, Field, Button } from 'vant'
import fieldInput from '../../components/Common/fieldInput'
import fieldCheckcode from '../../components/Common/fieldCheckcode'
import { notify } from '../../static/js/util/message'
import { ajaxPost } from '../../static/js/util/apiHttp'
import {
  generateRoute,
  saveGuest,
  saveRules,
  saveToken
} from '../../static/js/global/login'
// import menus from ' ../../static/js/Menus'
export default {
  name: 'Register',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    fieldInput,
    fieldCheckcode
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
    setSmscode(obj) {
      this.smscode = obj
    },
    setPassword(obj) {
      this.password = obj
    },
    setCheckPassword(obj) {
      this.checkPassword = obj
    },
    complete() {
      if (this.mobile.length !== 11)
        return notify('register.verify.mobile.exists')
      if (this.smscode.length !== 6)
        return notify('register.verify.code.exists')
      if (
        this.password.length > 12 ||
        this.password.length < 6 ||
        this.checkPassword.length < 6 ||
        this.checkPassword.length > 12
      )
        return notify('register.verify.password.between')
      let params = {
        source: 4,
        mobile: this.mobile,
        code: this.smscode,
        password: this.password,
        password_confirmation: this.checkPassword
      }
      ajaxPost('/Register/Register', params).then(res => {
        if (res.code === 200) {
          saveToken(res.data.token)
          saveRules(res.data.rules)
          saveGuest(res.data.guest)
          generateRoute(res.data.menus)
          // this.$router.push({ path: '/Org', component: () => import('../organization/Index.vue') })
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./login.scss" scoped></style>
