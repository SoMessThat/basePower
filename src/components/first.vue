<template>
  <div id="app">
      <div style="width: 20%; float: left;">
        <div>
          <el-button>新增</el-button>
          <el-button>删除</el-button>
        </div>
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="code"
          @node-click="handleCheckNode"
          lazy
          show-checkbox>
        </el-tree>
      </div>
      <div>
        <el-form :model="department" :inline="true" label-position="right" class="demo-form-inline" label-width="100px" :hide-required-asterisk="true">
          <el-form-item label="名字">
            <el-input v-model="department.name"></el-input>
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="department.code"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="部门性质">
            <el-input v-model="department.type"></el-input>
          </el-form-item>
          <el-form-item label="成立时间">
            <el-input v-model="department.registrationTime"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="负责人姓名">
            <el-input v-model="department.masterName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="department.masterTel"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="上级编号">
            <el-input v-model="department.parentCode"></el-input>
          </el-form-item>
          <el-form-item label="路劲">
            <el-input v-model="department.parentPath"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="创建时间">
            <el-input v-model="department.createTime"></el-input>
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="department.updateTime"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="辖区Id">
            <el-input v-model="department.areaId"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="department.status" placeholder="状态">
              <el-option label="启用" value="ENABLED"></el-option>
              <el-option label="删除" value="UNENABLED"></el-option>
            </el-select>
          </el-form-item>
          <br/>
          <el-form-item label="地址">
            <el-input v-model="department.position"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="部门信息">
            <el-input type="textarea" v-model="department.info"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="职责">
            <el-input type="textarea" v-model="department.duty"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="department.name"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="其他">
            <el-input type="textarea" v-model="department.other"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        label: 'name',
        children: [],
        isLeaf: 'isLeaf'
      },
      department: {
        id: 0,
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
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
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
        });
      }
    },
    onSubmit() {
      console.log('submit!');
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
