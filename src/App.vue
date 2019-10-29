<template>
	<el-container>
		<!-- <el-header> -->
			<!-- <span></span> -->
		<!-- </el-header> -->
		<el-main>
			<el-container>
			<el-aside width="200px">
				<el-menu :default-openeds="['1']">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>导航一</template>
						<el-menu-item-group>
							<template slot="title">组织</template>
							<router-link :to="{path:'/first'}"><el-menu-item index="1-1">组织管理</el-menu-item></router-link>
							<router-link :to="{path:'/second'}"><el-menu-item index="1-2">用户管理</el-menu-item></router-link>
						</el-menu-item-group>
						<el-menu-item-group title="用户">
							<router-link :to="{path:'/third'}"><el-menu-item index="1-3">角色管理</el-menu-item></router-link>
							<router-link :to="{path:'/fourth'}"><el-menu-item index="1-4">权限管理</el-menu-item></router-link>
							<router-link :to="{path:'/fifth'}"><el-menu-item index="1-5">用户分配角色</el-menu-item></router-link>
							<router-link :to="{path:'/sixth'}"><el-menu-item index="1-5">角色分配权限</el-menu-item></router-link>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
						</el-submenu>
					</el-submenu>
				</el-menu>
			</el-aside>
					<el-main>
						<router-view></router-view>
					</el-main>
			</el-container>
		</el-main>
		<!-- <el-footer> -->
			<!-- 脚222222222222222222222222222222222222222222222222222 -->
		<!-- </el-footer> -->
	</el-container>
</template>

<script>
export default {

}
</script>

<style>
	html,body,#app,.el-container{
			/*设置内部填充为0，几个布局元素之间没有间距*/
			padding: 0px;
			/*外部间距也是如此设置*/
			margin: 0px;
			/*统一设置高度为100%*/
			height: 100%;
			overflow:hidden;
	}
	.display{
		display: none;
	}
</style>