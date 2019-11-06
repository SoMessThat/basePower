<template>
  <div id="app">
    <el-dialog title="选择位置" :visible.sync="dialogFormVisible" center>
      <gd-map style="width:100%;height:500px" v-on:leaveSelectAdress ="getAddress" :initPosition='department.position'></gd-map>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="valPosition">确 定</el-button>
      </span>
    </el-dialog>
    <el-container>
      <el-aside width="20%">
        <div>
          <el-button @click="onCreate('departmentForm')">新增</el-button>
          <el-button @click="onDel">删除</el-button>
        </div>
        <el-tree
          :props="props"
          :load="loadNode"
          ref="tree"
          node-key="code"
          @node-click="handleCheckNode"
          lazy
          show-checkbox>
        </el-tree>
      </el-aside>
      <el-main>
        <el-form :model="department" ref="departmentForm" :inline="true" label-position="right" class="demo-form-inline" label-width="100px" :hide-required-asterisk="true">
          <el-form-item label="名字" prop="name">
            <el-input v-model="department.name"></el-input>
          </el-form-item>
          <el-form-item label="编号" prop="code">
            <el-input v-model="department.code" :disabled="true"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="部门性质" prop="type">
            <el-input v-model="department.type"></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="registrationTime">
            <el-date-picker v-model="department.registrationTime" value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="成立时间" style="width:202px">
            </el-date-picker>
          </el-form-item>
          <br/>
          <el-form-item label="负责人姓名" prop="masterName">
            <el-input v-model="department.masterName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="masterTel">
            <el-input v-model="department.masterTel"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="上级编号" prop="parentCode">
            <el-input v-model="department.parentCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="parentPath">
            <el-input v-model="department.parentPath"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="department.createTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="department.updateTime" :disabled="true"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="辖区" prop="areaId">
            <el-cascader :props="cascaderProps"></el-cascader>
            <el-input v-model="department.areaId"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="department.status" size="medium">
              <el-radio-button label="ENABLED" autofocus="true">启用</el-radio-button>
              <el-radio-button label="UNENABLED">冻结</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <br/>
          <el-form-item label="地址" prop="position">
            <el-tooltip class="item" effect="light" content="点击输入框后的图标可以通过地图选择哦！" placement="top">
              <el-input v-model="department.position" style="width:500px">
                <i slot="suffix" class="el-icon-map-location" style="font-size: 25px;line-height: unset;" @click="kk"></i>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <br/>
          <el-form-item label="部门信息" prop="info">
            <el-input type="textarea" v-model="department.info" style="width:500px"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="职责" prop="duty">
            <el-input type="textarea" v-model="department.duty" style="width:500px"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="简介" prop="introduction">
            <el-input type="textarea" v-model="department.introduction" style="width:500px"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="其他" prop="other">
            <el-input type="textarea" v-model="department.other" style="width:500px"></el-input>
          </el-form-item>
          <br/>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="margin-left:250px">保存</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'
export default {
  name: 'First',
  data() {
    return {
      dialogFormVisible: false,
      address: '',
      props: {
        code: 'code',
        label: 'name',
        children: [],
        isLeaf: 'isLeaf'
      },
      cascaderProps: {
          lazy: true,
          lazyLoad (node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 })
                .map(item => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }, 1000);
          }
      },
      isAdd: true,
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
      }
    }
  },
  methods: {
    handleCheckNode(data, node, vueComponent) {
      console.log(data, node, vueComponent);
      this.$axios({
          method: "get",
          url: GLOBAL.api+"/department/findDepartmentByCode",
          params:{
            code:data.code
          }
        }).then((res) => {
          this.department = res.data;
          this.isAdd = false;
        }).catch((res) => {
          console.log(res)
          this.$message.error('查找失败');
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
          this.$message.error('加载失败');
        });
      }else{
        // console.log(node)
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
          this.$message.error('查询失败');
        });
      }
    },
    onCreate(formName) {
      console.log(this.$refs.tree.getCurrentKey())
      this.$refs[formName].resetFields();
      this.isAdd = true;
      this.department.parentCode = this.$refs.tree.getCurrentKey()
    },
    onDel() {
      this.$axios({
          method: "get",
          url: GLOBAL.api+"/department/mulDelDepartmentByCode",
          params:{
            codes: '("' + this.$refs.tree.getCheckedKeys().join('","') + '")'
          }
        }).then((res) => {
          if(res.data > 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.$refs.tree.getCheckedKeys().forEach(item => {
              this.$refs.tree.remove(item);
            })
          }else {
            this.$message.error('删除失败');
          }
        }).catch((res) => {
          console.log(res)
        });
    },
    onSubmit() {
      if (this.isAdd) {
        this.$refs.tree.getCheckedKeys()
        this.$axios({
          method: "post",
          url: GLOBAL.api+"/department/addDepartment",
          data:{
            code: this.department.code,
            name: this.department.name,
            type: this.department.type,
            info: this.department.info,
            registrationTime: this.department.registrationTime,
            duty: this.department.duty,
            introduction: this.department.introduction,
            position: this.department.position,
            other: this.department.other,
            masterName: this.department.masterName,
            masterTel: this.department.masterTel,
            areaId: 0,
            parentCode: this.department.parentCode,
            parentPath: this.department.parentPath
          }
        }).then((res) => {
          console.log(res)
          if(!res.data || res.data != 'Fail') {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$refs.tree.append({"code":res.data,"name":this.department.name,"parentCode":this.department.parentCode,"node":null},
              this.$refs.tree.getCurrentKey())
          }else {
            this.$message.error('添加失败');
          }
        }).catch((res) => {
          console.log(res)
        });
      } else {
        this.$axios({
          method: "post",
          url: GLOBAL.api+"/department/updateDepartmentById",
          data:{
            id: this.department.id,
            code: this.department.code,
            name: this.department.name,
            type: this.department.type,
            info: this.department.info,
            registrationTime: this.department.registrationTime,
            duty: this.department.duty,
            introduction: this.department.introduction,
            position: this.department.position,
            other: this.department.other,
            masterName: this.department.masterName,
            masterTel: this.department.masterTel,
            areaId: 0,
            parentCode: this.department.parentCode,
            parentPath: this.department.parentPath,
            status: this.department.status
          }
        }).then((res) => {
          if(res.data > 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else {
            this.$message.error('修改失败');
          }
        }).catch((res) => {
          console.log(res)
        });
      }
    },
    kk() {
      this.dialogFormVisible = true;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    getAddress(val) {
      console.log(val)
      this.address = val;
    },
    valPosition() {
      this.department.position = this.address;
      this.address = '';
      this.dialogFormVisible = false;
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
