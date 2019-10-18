<template>
	<div id="app">
		<el-input v-model="name" placeholder="角色名/描述" style="width:500px"></el-input>
		<el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
		<el-button type="primary" icon="el-icon-add" @click="addRole">新建</el-button>
		<el-table :data="roles"> 
			<el-table-column prop="code" label="编号"></el-table-column> 			
			<el-table-column prop="name" label="角色名"></el-table-column> 			
			<!-- <el-table-column prop="pcode" label="父级编号"></el-table-column> 			 -->
			<el-table-column prop="updateTime" label="修改时间"></el-table-column> 			
			<el-table-column prop="description" label="描述"></el-table-column> 			
			<el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column> 			
			<el-table-column fixed="right" label="操作" width="150"> 
			<template slot-scope="scope">   
				<el-button @click="modifyRole(scope.row)" type="text" size="small">修改</el-button>
				<el-button @click="delRole(scope.row.id)" type="text" size="small">删除</el-button>
			</template>
			</el-table-column>   
		</el-table>
		<el-pagination layout="total, prev, pager, next, jumper" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" 
            @current-change="pageChange" hide-on-single-page></el-pagination>

		<el-dialog title="表单弹框" :visible.sync="dialogFormVisible" center>
      <el-form ref="form" :model="role" label-width="80px">			
        <el-form-item label="编号">
          <el-input v-model="role.code" :disabled="true"></el-input>
        </el-form-item> 			
        <el-form-item label="角色名">
          <el-input v-model="role.name"></el-input>
        </el-form-item> 			
        <!-- <el-form-item label="父级编号">
          <el-input v-model="role.pcode" :disabled="true"></el-input>
        </el-form-item> 			 -->
        <el-form-item label="修改时间">
          <el-input v-model="role.updateTime" :disabled="true"></el-input>
        </el-form-item> 			
        <el-form-item label="描述">
          <el-input v-model="role.description"></el-input>
        </el-form-item> 
        <el-form-item label="状态" prop="status">
          <el-select v-model="role.status" placeholder="状态">
            <el-option label="启用" value="ENABLED"></el-option>
            <el-option label="冻结" value="UNENABLED"></el-option>
          </el-select>
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
  name: 'Third',
  data() {
    return {
      name: null,
      id: null,
      visible: true,
      isAdd: true,
      dialogFormVisible: false,
      page: {
        total: 1,
        pageSize: 7,
        currentPage: 1
      },
      roles: [{
        id: "",
        code: "",
        name: "",
        // pcode: "",
        updateTime: "",
        description: "",
        status: "",
      }],
      role: {
        id: "",
        code: "",
        name: "",
        // pcode: "",
        updateTime: "",
        description: "",
        status: "",
      }
    }
  },
  mounted(){
    this.intiTable();
  },
  methods: {
    formatStatus: function(row, column) {
      return row.status === 'ENABLED' ? "正常" : "冻结";
    },
    intiTable() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/role/queryRole",
        data:{
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then((res) => {
        this.roles = res.data.data;
        this.page.total = res.data.total;
      }).catch((res) => {
        console.log(res);
        this.$message.error('查询失败');
      });
    },
    onSearch() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/role/queryRole",
        data:{
		      name: this.name,
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then((res) => {
        this.roles = res.data.data;
        this.page.total = res.data.total;
      }).catch((res) => {
        console.log(res);
        this.$message.error('查询失败');
      });
    },
    addRole() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    modifyRole(row) {
      this.dialogFormVisible = true;
      this.role = row;
      this.role.id = row.id;
      this.isAdd = false;
    },
    delRole(id) {
      this.$axios({
        method: "get",
        url: GLOBAL.api+"/role/delRoleById",
        params: {
          id: id
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.intiTable();
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
        url: GLOBAL.api+"/role/addRole",
        data:{
          name: this.role.name,
          description: this.role.description
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.intiTable();
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
        url: GLOBAL.api+"/role/updateRoleById",
        data:{
          id: this.role.id,
          name: this.role.name,
          description: this.role.description,
          status: this.status,
        }
      }).then((res) => {
        if(res.data > 0){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.intiTable();
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