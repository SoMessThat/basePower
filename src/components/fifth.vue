<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <el-tree :props="props" :load="loadNode" ref="tree" node-key="code" @node-click="handleCheckNode" lazy></el-tree>
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
            <el-input v-model="name" placeholder="角色名/描述" style="width:500px"></el-input>
		        <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
            <el-table :data="roles" ref="table" @selection-change="selectChange"> 
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="name" label="角色名"></el-table-column> 			
              <el-table-column prop="description" label="描述"></el-table-column> 
            </el-table>
            <el-pagination layout="total, prev, pager, next, jumper" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" 
              @current-change="pageChange" hide-on-single-page></el-pagination>
            <el-button  @click="sava">保存</el-button>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'

export default {
  name: 'Fifth',
  data() {
    return {
      code: null,
      name: null,
      checkedbox: [],
      choose: [],
      cancel: [],
      page: {
        total: 1,
        pageSize: 7,
        currentPage: 1
      },
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
      users: [],
      user: {
        id: null,
        account: "",
        name: "",
        code: "",
        idCard: "",
        phone: "",
        email: "",
        createTime: "",
        updateTime: "",
        visible: true,
        status: ""
      },
      roles: []
    }
  },
  methods: {
    findCode(code) {
      this.name = null;
      this.code = code;
      this.page.currentPage = 1;
      this.intiTable();
    },
    intiTable() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/findRoleList",
        data:{
          name: this.name,
          code: this.code,
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then((res) => {
        this.roles = res.data.data;
        this.page.total = res.data.total;
        this.checkedbox = [];
        //渲染多选框
        this.$nextTick(function () {
          for(let i=0;i<res.data.data.length;i++){
            if(res.data.data[i].checked === "checked"){
              this.$refs.table.toggleRowSelection(res.data.data[i],true);
              this.checkedbox.push(res.data.data[i].code);
            }
          }
        });
        console.log(this.checkedbox);
      }).catch((res) => {
        console.log(res);
        this.$message.error('查询失败');
      });
    },
    handleCheckNode(data, node, vueComponent) {
      this.users = null;
      this.roles = null;
      this.name = null;
      this.page.total = 0;
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/queryUser",
        data:{
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
          url: GLOBAL.api+"/department/getDepartmentTree"
        }).then((res) => {
          return resolve(res.data);
        }).catch((res) => {
          console.log(res);
          this.$message.error('查询失败');
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
          console.log(res);
          this.$message.error('查询失败');
        });
      }
    },
    pageChange(page) {
      this.page.currentPage = page;
      this.intiTable();
    },
    onSearch() {
      this.intiTable();
    },
    selectChange(selection) {
      this.cancel = [];
      this.choose = [];
      let select = [];
      for (let i = 0; i < selection.length; i++) {
        const row = selection[i];
        if (this.checkedbox.indexOf(row.code) < 0) {
          this.choose.push('"' + row.code + '"');
        }
        select.push(row.code);
      }
      for (let i = 0; i < this.checkedbox.length; i++) {
        if (select.indexOf(this.checkedbox[i]) < 0) {
          this.cancel.push('"' + this.checkedbox[i] + '"');
        }
      }
    },
    sava() {
      this.$axios({
        method: "get",
        url: GLOBAL.api+"/user/updateUserRole",
        params:{
          userId:this.code,
          addRoleIds:this.choose.join(','),
          delRoleIds:this.cancel.join(',')
        }
      }).then((res) => {
        if (res.data > 0) {
          this.$message({ message: '添加成功', type: 'success' });
          this.choose = [];
          this.cancel = [];
        } else {
          console.log(res)
          this.$message.error('保存失败');
        }
      }).catch((res) => {
        console.log(res)
        this.$message.error('保存失败');
      });
    }
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
