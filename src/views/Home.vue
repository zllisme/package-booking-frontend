<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu @on-select="selectItem" active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="0">
                        <Icon type="ios-navigate"></Icon>
                        <span>包裹入库</span>
                    </MenuItem>
                    <MenuItem name="1">
                        <Icon type="ios-search"></Icon>
                        <span>查看包裹信息</span>
                    </MenuItem>
                    <MenuItem  name="2">
                        <Icon type="ios-settings"></Icon>
                        <span>预约取件时间</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <AddPackage v-if="itemId == 0"></AddPackage>
                    <PackageMessage v-if="itemId == 1"></PackageMessage>
                    <SetFetchTime v-if="itemId == 2"></SetFetchTime>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
// @ is an alias to /src
import PackageMessage from '@/components/PackageMessage'
import AddPackage from '@/components/AddPackage'
import SetFetchTime from '@/components/SetFetchTime'
export default {
  name: 'home',
  components: {
    PackageMessage,
    AddPackage,
    SetFetchTime
  },
  data () {
    return {
        isCollapsed: false,
        itemId: 1
    }
  },
  computed: {
    rotateIcon () {
        return [
            'menu-icon',
            this.isCollapsed ? 'rotate-icon' : ''
        ];
    },
    menuitemClasses () {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
  },
  methods: {
    collapsedSider () {
        this.$refs.side1.toggleCollapse();
    },
    selectItem (id) {
      this.itemId = parseInt(id)
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/home.css');
</style>

