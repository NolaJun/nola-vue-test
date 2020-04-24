<template>
  <div>
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
          :code-url="'/Customer/ForgotCode'"
          :icon-type="3"
          :icon-left-class="'icon-mobile'"
          :img-url="require('../../static/img/icon-code.png')"
          :input-align="'left'"
          :input-data="smscode"
          :label-width="'0'"
          :input-lable="''"
          :max-length="6"
          :mobile="mobile"
          :readonly="false"
          :placeholder="$t('register.placeholder.smscode')"
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
import { saveRules, saveToken } from '../../static/js/global/login'
export default {
  name: 'register',
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
        mobile: this.mobile,
        code: this.smscode,
        password: this.password,
        password_confirmation: this.checkPassword
      }
      ajaxPost('/Customer/ForgotPassword', params).then(res => {
        if (res.code === 200) {
          saveToken(res.data.token)
          saveRules(res.data.rules)
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./login.scss" scoped></style>
