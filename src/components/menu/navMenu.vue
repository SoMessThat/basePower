<template>
  <div class="menu">
    <label v-for="navMenu in navMenus" :key="navMenu.code">
      <div v-if="navMenu.list.length <= 0" :key="navMenu.code" :data="navMenu">
        <el-menu-item>
          <router-link :to="{path:navMenu.url}">
            {{navMenu.name}}
          </router-link>
        </el-menu-item>
      </div>
      <el-submenu v-if="navMenu.list.length > 0" :key="navMenu.code" :data="navMenu" :index="navMenu.code">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          {{navMenu.name}}
        </template>
        <navMenu :navMenus="navMenu.list"></navMenu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'navMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }

</script>
<style>
  .menu {
    border-right: solid 1px #e6e6e6;
    overflow-x: hidden;
  }

  .el-menu-item {
    color: #000;
  }

  a {
    text-decoration: none;
    color: #000;
  }

</style>
