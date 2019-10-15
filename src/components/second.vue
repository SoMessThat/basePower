<template>
  <div id="app">
      <div style="width: 20%; float: left;">
        <el-tree
          :props="props"
          :load="loadNode"
          ref="tree"
          node-key="code"
          @node-click="handleCheckNode"
          lazy>
        </el-tree>
      </div>
      <div>
        
        <el-input v-model="name" placeholder="账号/姓名" style="width:500px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-add" @click="onAdd">新建</el-button>
        <el-table :data="user" style="width: 100%;float: left;"> 
          <el-table-column prop="account" label="账号" width="180"></el-table-column> 
          <el-table-column prop="name" label="姓名" width="180"></el-table-column> 
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150"> 
            <template slot-scope="scope">   
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>   
              <el-button type="text" size="small">删除</el-button> 
              <el-button type="text" size="small">分配</el-button> 
            </template>
          </el-table-column>   
        </el-table> 
    </div>
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'

export default {
  name: 'First',
  data() {
    return {
      name: '',
      props: {
        code: 'code',
        label: 'name',
        children: [],
        isLeaf: 'isLeaf'
      },
      department: {
        id: null,
        code: "",
        name: "",
        type: "",
        info: "",
        registrationTime: "",
        duty: "",
        introduction: "",
        position: "",
        other: "",
        masterName: "",
        masterTel: "",
        areaId: 0,
        parentCode: "",
        parentPath: "",
        createTime: "",
        updateTime: "",
        status: ""
      },
      user: [{
        id: null,
        account: "",
        name: "",
        idCard: "",
        phone: "",
        email: "",
        createTime: "",
        updateTime: "",
        status: ""
      }]
    }
  },
  methods: {
    handleCheckNode(data, node, vueComponent) {
      this.$axios({
          method: "post",
          url: GLOBAL.api+"/user/queryUser",
          data:{
            departmentCode:data.code
          }
        }).then((res) => {
          this.user = res.data.data;
        }).catch((res) => {
          console.log(res)
        });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$axios({
          method: "get",
          url: GLOBAL.api+"/department/getDepartmentTree"
        }).then((res) => {
          return resolve(res.data);
        }).catch((res) => {
          console.log(res)
        });
      }else{
        this.$axios({
          method: "get",
          url: GLOBAL.api+"/department/getDepartmentSonTree",
          params:{
            id:node.data.code
          }
        }).then((res) => {
          return resolve(res.data)
        }).catch((res) => {
          console.log(res)
        });
      }
    },
    handleClick(row) {
      console.log(row);
    },
    onSubmit() {
      this.$axios({
          method: "post",
          url: GLOBAL.api+"/user/queryUser",
          data:{
            departmentCode:this.$refs.tree.getCurrentKey(),
            name:this.name
          }
        }).then((res) => {
          console.log(res)
          this.user = res.data.data;
        }).catch((res) => {
          console.log(res)
        });
    },
    onAdd() {

    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
