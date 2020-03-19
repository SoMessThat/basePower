<template>
	<el-container>
		<!-- <el-header> -->
			<!-- <span></span> -->
		<!-- </el-header> -->
		<el-main>
			<el-container>
			<el-aside class="menu" width="200px">
				<el-menu :default-openeds="['1']">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-setting"></i>管理</template>
						<el-menu-item-group>
							<template slot="title">组织</template>
							<router-link :to="{path:'/departmentManager'}"><el-menu-item index="1-1">组织管理</el-menu-item></router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">用户</template>
							<router-link :to="{path:'/userManager'}"><el-menu-item index="1-2">用户管理</el-menu-item></router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">角色</template>
							<router-link :to="{path:'/roleManager'}"><el-menu-item index="1-3">角色管理</el-menu-item></router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">权限</template>
							<router-link :to="{path:'/rightManager'}"><el-menu-item index="1-4">权限管理</el-menu-item></router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">配置</template>
							<router-link :to="{path:'/configureRole'}"><el-menu-item index="1-5">用户分配角色</el-menu-item></router-link>
							<router-link :to="{path:'/configureRight'}"><el-menu-item index="1-6">角色分配权限</el-menu-item></router-link>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-magic-stick"></i>展示</template>
						<el-menu-item-group>
							<router-link :to="{path:'/userMenu'}"><el-menu-item index="2-1">获取角色菜单</el-menu-item></router-link>
						</el-menu-item-group>
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
	.menu {
		border-right: solid 1px #e6e6e6;
		overflow-x: hidden;
	}
	.el-menu-item {
		color: #303133;
	}
	a {
		text-decoration: none;
	}
</style>
