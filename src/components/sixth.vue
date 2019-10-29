<template>
  <div id="app">
    <el-container>
      <el-aside>
        <el-input v-model="name" placeholder="角色名/描述" style="display: inline-table;width:50%;margin:10px"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="onSearch" style="width:32%">搜索</el-button>
        <el-button-group style="display: grid;padding:1px;margin:10px">
          <el-button v-for="role in roles" :key="role.code" @click="findCode(role.code)" style="width:100%">
            {{role.name}}
          </el-button>
        </el-button-group>
      </el-aside>
      <el-main>
        <el-tree :check-strictly="true" :default-checked-keys="checkedbox" :data="tree" :props="props" 
          class="filter-tree" node-key="code" ref="tree" show-checkbox 
          @node-click="handleCheckNode" @check-change="selectChange"> 
        </el-tree>
        <el-button @click="sava">保存</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GLOBAL from '@/components/global_val.js'

export default {
  name: 'Sixth',
  data() {
    return {
      code: null,
      name: null,
      checkedbox: [],
      choose: [],
      cancel: [],
      props: {
        label: 'name',
        children: 'right'
      },
      tree: [],
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
      },
      roles: {},
      roles: []
    }
  },
  mounted(){
    this.intiList();
  },
  methods: {
    intiList() {
      this.$axios({
        method: "post",
        url: GLOBAL.api+"/role/queryRole",
        data:{
          name: this.name
        }
      }).then((res) => {
        this.roles = res.data.data;
      }).catch((res) => {
        console.log(res);
        this.$message.error('初始化加载失败');
      });
    },
    findCode(code) {
      this.code = code;
      this.intiTree();
    },
    intiTree() {
      this.$axios({
        method: "get",
        url: GLOBAL.api+"/right/findRightTreeByRole",
        params: {
          id:this.code
        }
      }).then((res) => {
        this.tree = res.data;
        this.checkedbox = [];
        this.isChecked(res.data)
        this.$nextTick(function () {
          this.choose = [];
          this.cancel = [];
        })
      }).catch((res) => {
        console.log(res)
        this.$message.error('初始化加载失败');
      });
    },
    isChecked(data) {
      for (let e = 0; e < data.length; e++) {
        if (data[e].checked == 'checked') {
          this.checkedbox.push(data[e].code)
        }
        if (data[e].right !==undefined && data[e].right.length > 0 ) {
          this.isChecked(data[e].right)
        }
      }
    },
    handleCheckNode(data, node, vueComponent) {
      return ;
    },
    onSearch() {
      this.intiList();
    },
    selectChange(a1,a2,a3) {
      if (a2) {
        if (this.cancel.indexOf('"' + a1.code + '"') === -1) {
          if (this.choose.indexOf('"' + a1.code + '"') === -1) {
            this.choose.push('"' + a1.code + '"');
          }
        } else {
          this.cancel.splice(this.cancel.indexOf('"' + a1.code + '"'), 1)
        }
      } else{
        if (this.choose.indexOf('"' + a1.code + '"') === -1) {
          if (this.cancel.indexOf('"' + a1.code + '"') === -1) {
            this.cancel.push('"' + a1.code + '"');
          }
        } else {
          this.choose.splice(this.choose.indexOf('"' + a1.code + '"'), 1)
        }
      }
    },
    sava() {
      console.log("选中：" + this.choose);
      console.log("取消：" + this.cancel);
      this.$axios({
        method: "get",
        url: GLOBAL.api+"/right/updateRoleRight",
        params:{
          roleId: this.code,
          addRightIds: (this.choose !==undefined && this.choose.length > 0) ? this.choose.join(',') :null,
          delRightIds: (this.cancel !==undefined && this.cancel.length > 0) ? this.cancel.join(',') :null
        }
      }).then((res) => {
        if (res.data > 0) {
          this.$message({ message: '添加成功', type: 'success' });
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
