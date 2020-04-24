<template>
  <div>
    <field-input
      class="font-14"
      :input-lable="'地区选择'"
      :input-data="areas"
      :input-align="'left'"
      :right-icon="'arrow'"
      :placeholder="'请选择地区'"
      :readonly="true"
      @clickText="show = true"
    ></field-input>
    <van-popup position="bottom" v-model="show">
      <van-area
        v-if="show"
        :area-list="areaList"
        :columns-num="columnsNum"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        :value="currentArea"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>
<script>
import fieldInput from './fieldInput';
import { Area, Cell, Popup } from 'vant';
import { AuthPost } from '../../../static/js/util/apiHttp';
import { Get, Set } from '../../../static/js/util/storage';
export default {
  name: 'Area',
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Area.name]: Area,
    fieldInput
  },
  props: {
    columnsNum: { type: Number, default: 3 },
    currentArea: { type: String, default: '' }
  },
  data() {
    return {
      show: false,
      areaList: {},
      areas: ''
    };
  },
  created() {
    if (!Get('', 'areas')) this.getArea();
    setTimeout(this.initArea(), 1000);
  },
  methods: {
    initArea() {
      let areas = Get('', 'areas') ? Get('', 'areas') : this.getArea();
      let obj = {
        province_list: {},
        city_list: {},
        county_list: {}
      };
      this.formatArea(obj.province_list, areas.province_list);
      this.formatArea(obj.city_list, areas.city_list);
      this.formatArea(obj.county_list, areas.county_list);
      this.areaList = obj;
    },
    formatArea(obj, ary) {
      for (let i in ary) {
        let key = '' + ary[i].id;
        obj[key] = ary[i].name;
      }
    },
    getArea() {
      AuthPost('/District/GetCascade_', {}).then(res => {
        Set('', 'areas', res.data);
        return res.data;
      });
    },
    confirm(obj) {
      this.areas = obj.map(item => item.name).join(' ');
      this.$emit('setArea', obj);
      this.show = false;
    },
    cancel() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell {
  font-size: 28px;
}
.title-class {
  width: 110px;
}
/deep/ .van-picker__toolbar {
  height: 80px;
}
.van-cell__right-icon {
  line-height: 2;
}
</style>
