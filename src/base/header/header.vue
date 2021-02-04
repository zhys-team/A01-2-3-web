<template>
  <el-header height="41px" class="bs-header">
    <el-tooltip
      class="item"
      effect="dark"
      :content="$store.state.isCollapse ? '显示缩略菜单' : '显示图文菜单'"
      placement="bottom-end"
    >
      <el-button
        class="header-collapse-btn"
        type="primary"
        size="small"
        @click="changeCollapse"
      >
        <i
          :class="[
            $store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
          ]"
        ></i>
      </el-button>
    </el-tooltip>
    <!--
      -->
    <el-button
      class="header-opera-btn br-right"
      size="small"
      @click="scrollLeft"
    >
      <i class="el-icon-d-arrow-left"></i>
    </el-button>
    <!--
      -->
    <div ref="pg" class="pageList">
      <div
        v-for="(item, index) in this.$store.state.pageTabList"
        :key="index"
        :class="[
          'clItem',
          { active: $store.state.chooseIndex == item.menuView },
        ]"
        :menulink="item.menuLink"
        :menuindex="item.menuIndex"
      >
        <a
          :class="['page-item', { canclose: item.menuIndex != '0' }]"
          @click="menuLink(item, index)"
        >
          {{ item.menuName }}
        </a>
        <a
          v-if="item.menuIndex != '0'"
          class="item-close el-icon-error"
          @click="removeTab(item)"
        ></a>
      </div>
    </div>
    <!--
      -->
    <div class="operaList">
      <el-button
        class="header-opera-btn br-left"
        size="small"
        @click="scrollRight"
      >
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
      <!--
      -->
      <el-dropdown>
        <el-button
          size="small"
          class="header-opera-btn br-left"
          style="width: 104px"
        >
          <span class="font-13">关闭操作</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="closeAllTab">关闭所有选项卡</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="closeOtherTab">关闭其他选项卡</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--
        -->
      <el-tooltip
        class="item"
        effect="dark"
        content="全屏显示"
        placement="bottom-end"
      >
        <el-button
          class="header-opera-btn br-left"
          size="small"
          @click="fullScreen"
        >
          <i class="el-icon-full-screen"></i>
        </el-button>
      </el-tooltip>
      <!--
        -->
      <el-tooltip
        class="item"
        effect="dark"
        content="系统刷新"
        placement="bottom-end"
      >
        <el-button
          class="header-opera-btn br-left"
          size="small"
          @click="sysReset"
        >
          <i class="el-icon-refresh-left"></i>
        </el-button>
      </el-tooltip>
      <!--
        -->
      <el-tooltip
        class="item"
        effect="dark"
        content="用户注销"
        placement="bottom-end"
      >
        <el-button
          class="header-opera-btn br-left"
          size="small"
          @click="sysSignOut"
        >
          <i class="el-icon-switch-button"></i>
        </el-button>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
  export default {
    name: 'BaseHeader',
    data() {
      return {
        a: '0', // 无用
      }
    },
    created() {},
    methods: {
      changeCollapse() {
        // 显示缩略菜单，显示图文菜单操作
        console.log(this.$store.state.isCollapse)
        this.$store.dispatch('cgCollapse')
      },
      menuLink(obj, i) {
        // 打开菜单
        this.$store.dispatch('choosePage', obj)
      },
      removeTab(obj) {
        // 关闭页面
        this.$nextTick(() => {
          this.$store.dispatch('removePage', obj)
        })
      },
      closeAllTab() {
        // 关闭所有页面
        this.$store.dispatch('setHomePage')
      },
      closeOtherTab() {
        // 关闭其他页面
        this.$store.dispatch('setNowPage')
      },
      sysReset() {
        // 刷新系统
        this.closeAllTab()
        this.$message({
          showClose: true,
          message: '刷新成功！',
          type: 'success',
        })
      },
      scrollLeft() {
        // 顶部移动到最左边
        let p = this.$refs.pg
        p.scrollTo(0, 0)
      },
      scrollRight() {
        // 顶部移动到最右边
        let p = this.$refs.pg
        let pWidth = p.scrollWidth
        p.scrollTo(pWidth, 0)
      },
      fullScreen() {
        // 全屏
        let n = document
        let e = n.documentElement
        n.fullscreenElement ||
        n.mozFullScreenElement ||
        n.webkitFullscreenElement
          ? n.exitFullscreen
            ? n.exitFullscreen()
            : n.mozCancelFullScreen
            ? n.mozCancelFullScreen()
            : n.webkitExitFullscreen
            ? n.webkitExitFullscreen()
            : alert('浏览器不支持全屏操作')
          : e.requestFullscreen
          ? e.requestFullscreen()
          : e.mozRequestFullScreen
          ? e.mozRequestFullScreen()
          : e.webkitRequestFullScreen
          ? e.webkitRequestFullScreen()
          : alert('您的浏览器不支持全屏操作')
      },
      sysSignOut() {
        // 登出
        this.$router.push({ path: '/' })
      },
    },
  }
</script>

<style lang="stylus">
  .el-menu--inline .el-menu-item-group .el-menu-item-group__title,.el-menu--popup .el-menu-item-group .el-menu-item-group__title
    padding 0
  .font-13
    font-size 13px
    font-weight 400
  .bs-header
    height 40px
    padding 0px
    width 100%
    background-color #fafafa
    border-bottom solid 1px #e6e6e6
    position relative
    .header-collapse-btn
      border 0
      border-radius 0
      font-size 16px
      height 40px
      width 40px
      padding 0
      text-align center
      float left
    .header-opera-btn
      margin-left 0
      border 0
      border-radius 0
      font-size 16px
      height 40px
      padding 0 11.5px
      text-align center
      color #409EFF
      float left
    .br-left
      border-left: solid 1px #eee;
    .br-right
      border-right: solid 1px #eee;
    .pageList
      float left
      width calc(100% - 346px)
      white-space nowrap
      word-wrap normal
      overflow hidden
      height 40px
      background #fafafa
      box-sizing border-box
      scroll-behavior smooth
      .clItem
        display inline-block
        position relative
        height 40px
        .page-item
          display block
          border 0
          border-radius 0
          font-size 13px
          font-weight 400
          height 40px
          line-height 40px
          padding 0 11.5px
          text-align center
          border-right: solid 1px #eee;
          color: #409EFF;
          background: #ecf5ff
        .page-item:hover
          cursor pointer
        .page-item.canclose
          padding 0 30.5px 0 11.5px
        .item-close
          font-size 14px
          position absolute
          top 13px
          right 11.5px
          color #409EFF
        .item-close:hover
          cursor pointer
          color #e36159
      .clItem.active
        .page-item
        .item-close
          background #3a8ee6;
          color #eee
        .page-item:hover
          color #fff
          cursor pointer
        .item-close:hover
          color #fff
          cursor pointer
    .operaList
      float right
      .el-dropdown
        float left
</style>
