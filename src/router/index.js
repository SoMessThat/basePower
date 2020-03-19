import Vue from 'vue'
import Router from 'vue-router'
import DepartmentManager from '@/components/departmentManager'
import UserManager from '@/components/userManager'
import RoleManager from '@/components/roleManager'
import RightManager from '@/components/rightManager'
import ConfigureRole from '@/components/configureRole'
import ConfigureRight from '@/components/configureRight'
import UserMenu from '@/components/userMenu'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/departmentManager',
      name: 'departmentManager',
      component: DepartmentManager
    },
    {
      path: '/userManager',
      name: 'userManager',
      component: UserManager
    },
    {
      path: '/roleManager',
      name: 'roleManager',
      component: RoleManager
    },
    {
      path: '/rightManager',
      name: 'rightManager',
      component: RightManager
    },
    {
      path: '/configureRole',
      name: 'configureRole',
      component: ConfigureRole
    },
    {
      path: '/configureRight',
      name: 'configureRight',
      component: ConfigureRight
    },
    {
      path: '/userMenu',
      name: 'userMenu',
      component: UserMenu
    }
  ]
})
