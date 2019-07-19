<template>
  <div>
    <a-menu
      :selectKeys="selectKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.path" @click="() => $router.push({path: item.path})">
          <a-icon type="pie-chart" />
          <span>{{item.name}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>
<script>
/* 
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data () {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    this.menuList = this.getMenu(this.$router.options.routes)
    console.log(this.menuList)
    return {
      selectKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.openKeysMap[this.$route.path]
    }
  },
  watch: {
    '$route.path': function (val) {
      // if (val.includes('/spider/dataDetail/') || val.includes('/spider/detail/')) {
      //   return
      // }
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  methods:{
    getMenu(routes = [], parentKeys = [], selectedKeys){
     let menus = []
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKeys || item.path]
          const newItem = { ...item }
          delete newItem.children
          if (item.children && !item.hideChilrenInMenu) {
            newItem.children = this.getMenu(item.children, [...parentKeys, item.path])
          } else {
            this.getMenu(item.children, selectedKeys ? parentKeys : [...parentKeys, item.path], selectedKeys || item.path)
          }
          menus.push(newItem)
        } else if (!item.hideInMenu && !item.hideChilrenInMenu && item.children) {
          menus.push(...this.getMenu(item.children, [...parentKeys, item.path]))
        }
      })
      return menus
    }
  }
}
</script>
