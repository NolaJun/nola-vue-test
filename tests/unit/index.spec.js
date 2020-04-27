import Vue from 'vue'
import vant from 'vant'
import { shallowMount } from '@vue/test-utils'
import iconGrid from '../../src/components/Common/iconGrid'

Vue.use(vant)

describe('iconGrid.vue', () => {
  // 组件实例
  it('renders props.coulumnNum when passed', () => {
    const coulumnNum = 5
    const list = [
      {
        id: 0,
        icon: 'icon-saomazhifu gradient-text-blue',
        title: '智能识别',
        url: ''
      },
      {
        id: 1,
        icon: 'icon-youjiguanli gradient-text-orange',
        title: '客户寄存'
      },
      {
        id: 2,
        icon: 'icon-yuyue1 gradient-text-light-blue',
        title: '客户预约'
      },
      {
        id: 3,
        icon: 'icon-yuding gradient-text-light-red',
        title: '客户预定'
      },
      {
        id: 4,
        icon: 'icon-kuaijiekaidan gradient-text-blue2',
        title: '快捷开单'
      }
    ]
    const wrapper = shallowMount(iconGrid, {
      propsData: {
        coulumnNum: coulumnNum,
        list: list
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    // expect(wrapper.text()).toMatch(list)
  })
})
