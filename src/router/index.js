import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/first'
import Second from '@/components/second'
import Third from '@/components/third'
import Fourth from '@/components/fourth'
import Fifth from '@/components/fifth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
    }
  ]
})
