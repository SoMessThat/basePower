import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/first'
import Second from '@/components/second'
import Third from '@/components/third'
import Fourth from '@/components/fourth'
import Fifth from '@/components/fifth'
import Sixth from '@/components/sixth'
import Seven from '@/components/seven'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/first',
      name: 'first',
      component: First
    },
    {
      path: '/second',
      name: 'second',
      component: Second
    },
    {
      path: '/third',
      name: 'third',
      component: Third
    },
    {
      path: '/fourth',
      name: 'fourth',
      component: Fourth
    },
    {
      path: '/fifth',
      name: 'fifth',
      component: Fifth
    },
    {
      path: '/sixth',
      name: 'sixth',
      component: Sixth
    },
    {
      path: '/seven',
      name: 'seven',
      component: Seven
    }
  ]
})
