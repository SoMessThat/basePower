<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <el-tree :props="props" :load="loadNode" ref="tree" node-key="code" @node-click="handleCheckNode" lazy>
        </el-tree>
      </el-aside>
      <el-main>
        <el-container>
          <el-aside width="200px">
            <el-button-group style="display: grid;padding:1px;margin:10px">
              <el-button v-for="user in users" :key="user.code" @click="findCode(user.code)">
                {{user.name}}
              </el-button>
            </el-button-group>
          </el-aside>
          <el-main>
            <el-menu>
              <navMenu :navMenus="rights"></navMenu>
            </el-menu>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import GLOBAL from '@/components/global_val.js'
  import navMenu from './menu/navMenu.js'

  export default {
    name: 'Seven',
    components: {
        navMenu
    },
    data() {
      return {
        code: '',
        props: {
          code: 'code',
          label: 'name',
          children: [],
          isLeaf: 'isLeaf'
        },
        department: {},
        users: [],
        user: {},
        rights: [],
        right: {}
      }
    },
    methods: {
      findCode(code) {
        this.code = code;
        this.rights = [];
        this.$axios({
          method: "get",
          url: GLOBAL.api + "/user/queryMenu?code=" + code
        }).then((res) => {
          this.rights = res.data;
          console.log(this.rights);
        }).catch((res) => {
          console.log(res);
          this.$message.error('查询失败');
        });
      },
      handleCheckNode(data, node, vueComponent) {
        this.users = null;
        this.$axios({
          method: "post",
          url: GLOBAL.api + "/user/queryUser",
          data: {
            departmentCode: this.$refs.tree.getCurrentKey()
          }
        }).then((res) => {
          this.users = res.data.data;
        }).catch((res) => {
          console.log(res);
          this.$message.error('查询失败');
        });
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          this.$axios({
            method: "get",
            url: GLOBAL.api + "/department/getDepartmentTree"
          }).then((res) => {
            return resolve(res.data);
          }).catch((res) => {
            console.log(res);
            this.$message.error('查询失败');
          });
        } else {
          this.$axios({
            method: "get",
            url: GLOBAL.api + "/department/getDepartmentSonTree",
            params: {
              id: node.data.code
            }
          }).then((res) => {
            return resolve(res.data)
          }).catch((res) => {
            console.log(res);
            this.$message.error('查询失败');
          });
        }
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    list-style:none;
  }

  a {
    color: #42b983;
  }

</style>
