<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <div>
          <el-button @click="onCreate('departmentForm')">新增</el-button>
          <el-button @click="onDel">删除</el-button>
        </div>
        <el-tree
          class="filter-tree"
          node-key="code"
          :data="tree"
          :props="props"
          :filter-node-method="filterNode"
          @node-click="handleCheckNode"
          default-expand-all
          ref="tree">
        </el-tree>
      </el-aside>
      <!-- <el-main>
        <el-form ref="form" :model="right" label-width="80px">
          <el-form-item label="">
            <el-input v-model="right.id"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.name"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.code"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.pcode"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.updateTime"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.description"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.url"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.icon"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.type"></el-input>
          </el-form-item>		
          <el-form-item label="">
            <el-input v-model="right.applicationStatus"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.path"></el-input>
          </el-form-item> 			
          <el-form-item label="">
            <el-input v-model="right.orders"></el-input>
          </el-form-item> 			
          <el-form-item label="状态" prop="status">
            <el-select v-model="role.status" placeholder="状态">
              <el-option label="启用" value="ENABLED"></el-option>
              <el-option label="冻结" value="UNENABLED"></el-option>
            </el-select>
          </el-form-item>	
        </el-form>
      </el-main> -->
    </el-container>
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'

export default {
  name: 'First',
  data() {
    return {
      props: {
        code: 'code',
        name: 'name',
        node: []
      },
        props: {
          children: 'node',
          label: 'name'
        },
      isAdd: true,
      right: {
        id: "",
        name: "",
        code: "",
        pcode: "",
        updateTime: "",
        description: "",
        url: "",
        icon: "",
        type: "",
        status: "",
        applicationStatus: "",
        path: "",
        orders: ""
      }
    }
  },
  mounted(){
    this.$axios({
      method: "get",
      url: GLOBAL.api+"/right/queryRightTree"
    }).then((res) => {
      this.tree = res.data;
    }).catch((res) => {
      console.log(res)
      this.$message.error('初始化加载失败');
    });
  },
  methods: {
    handleCheckNode(data, node, vueComponent) {
      // console.log(data, node, vueComponent);
      // this.$axios({
      //     method: "get",
      //     url: GLOBAL.api+"/department/findDepartmentByCode",
      //     params:{
      //       code:data.code
      //     }
      //   }).then((res) => {
      //     this.department = res.data;
      //     this.isAdd = false;
      //   }).catch((res) => {
      //     console.log(res)
      //   });
    },
    onCreate(formName) {
      // console.log(this.$refs.tree.getCurrentKey())
      // this.$refs[formName].resetFields();
      // this.isAdd = true;
      // this.department.parentCode = this.$refs.tree.getCurrentKey()
    },
    onDel() {
      // this.$axios({
      //     method: "get",
      //     url: GLOBAL.api+"/department/mulDelDepartmentByCode",
      //     params:{
      //       codes: '("' + this.$refs.tree.getCheckedKeys().join('","') + '")'
      //     }
      //   }).then((res) => {
      //     this.$refs.tree.getCheckedKeys().forEach(item => {
      //       this.$refs.tree.remove(item);
      //     })
      //   }).catch((res) => {
      //     console.log(res)
      //   });
    },
    onSubmit() {
      // if (this.isAdd) {
      //   this.$refs.tree.getCheckedKeys()
      //   this.$axios({
      //     method: "post",
      //     url: GLOBAL.api+"/department/addDepartment",
      //     data:{
      //       code: this.department.code,
      //       name: this.department.name,
      //       type: this.department.type,
      //       info: this.department.info,
      //       registrationTime: this.department.registrationTime,
      //       duty: this.department.duty,
      //       introduction: this.department.introduction,
      //       position: this.department.position,
      //       other: this.department.other,
      //       masterName: this.department.masterName,
      //       masterTel: this.department.masterTel,
      //       areaId: 0,
      //       parentCode: this.department.parentCode,
      //       parentPath: this.department.parentPath
      //     }
      //   }).then((res) => {
      //     this.$refs.tree.append({"code":res.data,"name":this.department.name,"parentCode":this.department.parentCode,"node":null},
      //       this.$refs.tree.getCurrentKey())
      //   }).catch((res) => {
      //     console.log(res)
      //   });
      // } else {
      //   this.$axios({
      //     method: "post",
      //     url: GLOBAL.api+"/department/updateDepartmentById",
      //     data:{
      //       id: this.department.id,
      //       code: this.department.code,
      //       name: this.department.name,
      //       type: this.department.type,
      //       info: this.department.info,
      //       registrationTime: this.department.registrationTime,
      //       duty: this.department.duty,
      //       introduction: this.department.introduction,
      //       position: this.department.position,
      //       other: this.department.other,
      //       masterName: this.department.masterName,
      //       masterTel: this.department.masterTel,
      //       areaId: 0,
      //       parentCode: this.department.parentCode,
      //       parentPath: this.department.parentPath,
      //       status: this.department.status
      //     }
      //   }).then((res) => {
      //     return (res.data)
      //   }).catch((res) => {
      //     console.log(res)
      //   });
      // }
    },
    remove(node, data) {
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
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
