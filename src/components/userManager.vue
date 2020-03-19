<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <el-tree :props="props" :load="loadNode" ref="tree" node-key="code" @node-click="handleCheckNode" lazy></el-tree>
      </el-aside>
      <el-main>
          <el-input v-model="name" placeholder="账号/姓名" style="width:500px"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
          <el-button type="primary" icon="el-icon-add" @click="addUser">新建</el-button>
          <el-table :data="users"> 
            <el-table-column prop="account" label="账号"></el-table-column> 
            <el-table-column prop="name" label="姓名"></el-table-column> 
            <el-table-column prop="idCard" label="身份证"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150"> 
            <template slot-scope="scope">   
              <el-button @click="modifyUser(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="delUser(scope.row.id)" type="text" size="small">删除</el-button> 
              <el-button type="text" size="small">分配</el-button> 
            </template>
            </el-table-column>   
          </el-table>
          <el-pagination layout="total, prev, pager, next, jumper" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" 
            @current-change="pageChange" hide-on-single-page></el-pagination>
      </el-main>
    </el-container>
    
    <el-dialog title="表单弹框" :visible.sync="dialogFormVisible" center>
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="user.idCard"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="onSibmit">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'

export default {
  name: 'UserManager',
  data() {
    return {
      name: '',
      id: null,
      visible: true,
      isAdd: true,
      dialogFormVisible: false,
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
      department: {},
      users: [],
      user: {}
    }
  },
  mounted(){
    this.intiTable(this.$refs.tree.getCurrentKey());
  },
  methods: {
    intiTable(code) {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/queryUser",
        data:{
          departmentCode: code,
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then((res) => {
        this.users = res.data.data;
        console.log(this.users);
        this.page.total = res.data.total;
      }).catch((res) => {
        console.log(res);
        this.$message.error('查询失败');
      });
    },
    handleCheckNode(data, node, vueComponent) {
      this.intiTable(this.$refs.tree.getCurrentKey());
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
    onSearch() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/queryUser",
        data:{
          departmentCode:this.$refs.tree.getCurrentKey(),
          name:this.name,
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then((res) => {
        this.users = res.data.data;
        this.page.total = res.data.total;
      }).catch((res) => {
        console.log(res);
        this.$message.error('查询失败');
      });
    },
    addUser() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    modifyUser(row) {
      this.dialogFormVisible = true;
      this.user = row;
      this.id = row.id;
      this.isAdd = false;
    },
    delUser(id) {
      this.$axios({
        method: "get",
        url: GLOBAL.api+"/user/delUserById",
        params: {
          id: id
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.intiTable(this.$refs.tree.getCurrentKey());
        }else{
          this.$message.error('删除失败');
        }
      }).catch((res) => {
        console.log(res);
        this.$message.error('删除失败');
      });
    },
    onSibmit() {
      if(this.isAdd) {
        this.onAdd();
      }else {
        this.onModify();
      }
    },
    onAdd() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/addUser",
        data:{
          account: this.user.account,
          name: this.user.name,
          idCard: this.user.idCard,
          phone: this.user.phone,
          email: this.user.email,
          departmentCode: this.$refs.tree.getCurrentKey()
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.intiTable(this.$refs.tree.getCurrentKey());
        }else{
          this.$message.error('新增失败');
        }
      }).catch((res) => {
        console.log(res);
        this.$message.error('新增失败');
      });
    },
    onModify() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/user/updateUserById",
        data:{
          id: this.id,
          account: this.user.account,
          name: this.user.name,
          idCard: this.user.idCard,
          phone: this.user.phone,
          email: this.user.email
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.intiTable(this.$refs.tree.getCurrentKey());
        }else{
          this.$message.error('修改失败');
        }
      }).catch((res) => {
        console.log(res);
        this.$message.error('修改失败');
      });
    },
    pageChange(page) {
      this.page.currentPage = page;
      this.onSearch();
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
