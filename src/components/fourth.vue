<template>
  <div id="app">
    <el-container>
      <el-aside width="20%">
        <div>
          <el-button @click="onCreate('form')">新增</el-button>
          <el-button @click="onDel">删除</el-button>
        </div>
        <el-tree
          class="filter-tree"
          node-key="code"
          :data="tree"
          :props="props"
          @node-click="handleCheckNode"
          ref="tree">
        </el-tree>
      </el-aside>
      <el-main>
        <el-form ref="form" :model="right" label-width="80px">			
          <el-form-item label=名称 prop="name">
            <el-input v-model="right.name"></el-input>
          </el-form-item> 			
          <el-form-item label="编号" prop="code">
            <el-input v-model="right.code" :disabled="true"></el-input>
          </el-form-item> 			
          <el-form-item label="上级编号" prop="pcode">
            <el-input v-model="right.pcode" :disabled="true"></el-input>
          </el-form-item> 			
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="right.updateTime" :disabled="true"></el-input>
          </el-form-item> 			
          <el-form-item label="描述" prop="description">
            <el-input v-model="right.description"></el-input>
          </el-form-item> 			
          <el-form-item label="地址" prop="url">
            <el-input v-model="right.url"></el-input>
          </el-form-item> 			
          <el-form-item label="图标" prop="icon">
            <el-input v-model="right.icon"></el-input>
          </el-form-item> 			
          <el-form-item label="类型" prop="type">
            <el-select v-model="right.type" placeholder="类型">
              <el-option label="电脑端菜单" value="MENU"></el-option>
              <el-option label="APP菜单" value="APP"></el-option>
              <el-option label="资源" value="RESOURCE"></el-option>
            </el-select>
          </el-form-item>		
          <el-form-item label="上架状态" prop="applicationStatus">
            <el-radio-group v-model="right.applicationStatus" size="medium">
              <el-radio-button label="GROUNDING">上架</el-radio-button>
              <el-radio-button label="UNDERCARRIAGE">下架</el-radio-button>
            </el-radio-group>
          </el-form-item> 			
          <el-form-item label="路径" prop="path">
            <el-input v-model="right.path"></el-input>
          </el-form-item> 			
          <el-form-item label="排序" prop="orders">
            <el-input v-model="right.orders"></el-input>
          </el-form-item> 			
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="right.status" size="medium" :disabled="isAdd">
              <el-radio-button label="ENABLED">启用</el-radio-button>
              <el-radio-button label="UNENABLED">冻结</el-radio-button>
            </el-radio-group>
          </el-form-item>	
          <el-form-item>
            <el-button @click="onSubmit">保存</el-button>
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
      props: {
        label: 'name',
        children: 'node'
      },
      tree: [],
      isAdd: true,
      right: {}
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
      this.isAdd = false;
      this.$axios({
        method: "get",
          url: GLOBAL.api+"/right/findRightByCode",
          params:{
            code:data.code
          }
        }).then((res) => {
          this.right = res.data;
        }).catch((res) => {
          console.log(res);
          this.$message.error('查看消息失败');
        });
    },
    onCreate(formName) {
      this.$refs[formName].resetFields();
      this.isAdd = true;
      this.right.pcode = this.$refs.tree.getCurrentKey()
    },
    onDel() {
      this.$axios({
          method: "get",
          url: GLOBAL.api+"/right/delRightById",
          params:{
            id: this.right.id
          }
        }).then((res) => {
          this.$refs.tree.remove(this.$refs.tree.getCurrentKey());
        }).catch((res) => {
          console.log(res);
          this.$message.error('删除失败');
        });
    },
    onSubmit() {
      if (this.isAdd) {
        this.$axios({
          method: "post",
          url: GLOBAL.api+"/right/addRight",
          data:{
            name: this.right.name,
            code: this.$refs.tree.getCurrentKey(),
            pcode: this.right.pcode,
            description: this.right.description,
            url: this.right.url,
            icon: this.right.icon,
            type: this.right.type,
            applicationStatus: this.right.applicationStatus,
            path: this.right.path,
            orders: this.right.orders
          }
        }).then((res) => {
          this.$refs.tree.append({"code":res.data,"name":this.right.name,"parentCode":this.right.pcode,"node":null},
            this.$refs.tree.getCurrentKey());
          this.$message({
          message: '添加成功',
          type: 'success'
          });
        }).catch((res) => {
          console.log(res);
          this.$message.error('添加失败');
        });
      } else {
        this.$axios({
          method: "post",
          url: GLOBAL.api+"/right/updateRightById",
          data:{
            id: this.right.id,
            name: this.right.name,
            description: this.right.description,
            url: this.right.url,
            icon: this.right.icon,
            type: this.right.type,
            applicationStatus: this.right.applicationStatus,
            path: this.right.path,
            orders: this.right.orders,
            status: this.right.status
          }
        }).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }).catch((res) => {
          console.log(res);
          this.$message.error('修改失败');
        });
      }
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
