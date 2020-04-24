<template>
  <van-tabbar
    class=""
    v-model="current"
    active-color="#4768F3"
    inactive-color="#D3DBE3"
    fixed
    @change="changeTab"
  >
    <van-tabbar-item name="upcoming">
      <i
        class="iconfont icon-daibanshixiang"
        slot="icon"
        slot-scope="props"
        :class="props.active ? 'blue' : 'dark-grey'"
      ></i>
      <span>{{ $t('menu.upcoming') }}</span>
    </van-tabbar-item>
    <van-tabbar-item name="Index">
      <i
        class="iconfont icon-xin"
        slot="icon"
        slot-scope="props"
        :class="props.active ? 'blue' : 'dark-grey'"
      ></i>
      <span>{{ $t('menu.commonly_used') }}</span>
    </van-tabbar-item>
    <van-tabbar-item name="Features" to="/Features">
      <i
        class="iconfont icon-kuaisugongneng"
        slot="icon"
        slot-scope="props"
        :class="props.active ? 'blue' : 'dark-grey'"
      ></i>
      <span>{{ $t('menu.features') }}</span>
    </van-tabbar-item>
    <van-tabbar-item name="Team">
      <i
        class="iconfont icon-tuanduiguanli"
        slot="icon"
        slot-scope="props"
        :class="props.active ? 'blue' : 'dark-grey'"
      ></i>
      <span>{{ $t('menu.team') }}</span>
    </van-tabbar-item>
    <van-tabbar-item name="Mine">
      <i
        class="iconfont icon-wode"
        slot="icon"
        slot-scope="props"
        :class="props.active ? 'blue' : 'dark-grey'"
      ></i>
      <span>{{ $t('menu.mine') }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
import { GetOpenid } from '../../static/js/global/global'
import { Get } from '../../static/js/util/storage'
import { notify } from '../../static/js/util/message'
export default {
  name: 'Footer',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 'Index'
    }
  },
  computed: {
    current: {
      get: function() {
        return this.$route.name
      },
      set: function(v) {
        this.active = v
      }
    }
  },
  methods: {
    changeTab(obj) {
      this.active = obj
      let current = '/' + obj
      if (
        Get(GetOpenid(), 'guest') === 1 &&
        (obj === 'Index' || obj === 'upcoming' || obj === 'Features')
      )
        return notify('org.valid.no_shop')
      this.$router.push(current)
    }
  }
}
</script>
<style lang="scss" scoped>
.van-tabbar {
  height: 104px;
  border: 0;
}
.van-tabbar-item__icon {
  font-size: 60px;
}
.iconfont {
  font-size: 44px;
  text-align: center;
}
</style>
