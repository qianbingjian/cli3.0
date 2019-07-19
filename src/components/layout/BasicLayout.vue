<template>
  <a-layout>
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="min-height:100vh">
      <Aside></Aside>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <Header></Header>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <Content></Content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from './Header';
import Aside from './Aside';
import Content from './Content';
// import Footer from "./Footer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Aside,
    Content
  }
};
</script>
