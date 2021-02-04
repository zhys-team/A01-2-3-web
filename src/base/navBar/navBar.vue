<template>
    <el-aside width="auto" class="navBar">
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="this.$store.state.isCollapse" :unique-opened="true">
        <el-menu-item class="comTop">
          <transition name="el-fade-in">
            <div class="companyInfo" v-show="!this.$store.state.isCollapse">
              <el-image class="companyLogo" :src="companyInfo.logo" :fit="this.$store.state.isCollapse?'fill':'contain'"></el-image>
              <el-tooltip class="item" effect="dark" :content="companyInfo.name" placement="right-end">
                <div class="companyName" v-text="companyInfo.name"></div>
              </el-tooltip>
              <div class="operator">用户：{{operator}}</div>
            </div>
          </transition>
          <transition name="el-fade-in">
            <div class="smCompanyInfo" v-show="this.$store.state.isCollapse">
              <el-tooltip class="item" effect="dark" :content="companyInfo.name" placement="right-end">
                <el-image class="smCompanyLogo" :src="companyInfo.logo" :fit="this.$store.state.isCollapse?'fill':'contain'"></el-image>
              </el-tooltip>
            </div>
          </transition>
        </el-menu-item>
        <el-menu-item :index="indexPage.menuIndex" @click="menuLink(indexPage)">
          <i :class="[indexPage.menuIcon]"></i>
          <span slot="title">{{indexPage.menuName}}</span>
        </el-menu-item>
        <el-submenu v-for="menu in menuList" :key="menu.menuIndex" :index="menu.menuIndex">
          <template slot="title">
            <i :class="[menu.menuIcon]"></i>
            <span slot="title">{{menu.menuName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="item in menu.subMenu" :key="item.menuIndex" :index="item.menuIndex" @click="menuLink(item)">{{item.menuName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>

<script>
import logo from '@/assets/images/logo_el.png'
export default {
  name: 'nav-bar',
  props: ['username'],
  data () {
    return {
      companyInfo: { // 公司信息
        logo: logo,
        name: '中航云税'
      },
      fit: 'contain', // 图片展现方式
      operator: this.username, // 操作人员
      indexPage: {menuIndex: '0', menuName: '首页', menuIcon: 'el-icon-s-platform', menuView: 'Home'}, // 首页
      menuList: [ // 菜单列表
        // {menuIndex: '1', menuName: '企业开票', menuIcon: 'el-icon-s-ticket', subMenu: [{menuIndex: '1-1', menuName: '专票台账', menuView: 'treeTable'}, {menuIndex: '1-2', menuName: '测试', menuView: 'test'}]},
        // {menuIndex: '2', menuName: '进项台账', menuIcon: 'el-icon-s-finance', subMenu: [
        //   {menuIndex: '2-1', menuName: '专票台账', menuView: 'receiveInvoice'},
        //   {menuIndex: '2-2', menuName: '客运台账', menuView: 'trafficInvoice'},
        //   {menuIndex: '2-3', menuName: '费用台账', menuView: 'costInvoice'},
        //   {menuIndex: '2-4', menuName: '机动车台账', menuView: 'saleCarInvoice'},
        //   {menuIndex: '2-5', menuName: '发票复查', menuView: 'reviewInvoice'},
        //   {menuIndex: '2-6', menuName: '疑票处理', menuView: 'doubtfulInvoice'},
        //   {menuIndex: '2-7', menuName: '进项汇总台帐', menuView: 'invoiceStatistics'},
        //   {menuIndex: '2-8', menuName: '进项台帐导出', menuView: 'exportInvoice'}]},
        // {menuIndex: '3', menuName: '智能认证申报', menuIcon: 'el-icon-s-claim', subMenu: [
        //   {menuIndex: '3-2', menuName: '发票勾选认证', menuView: 'certifiedInvoice'},
        //   {menuIndex: '3-3', menuName: '客运发票申报', menuView: 'cerTraInvoice'},
        //   {menuIndex: '3-4', menuName: '认证发票转出', menuView: 'turnOffInvoice'},
        //   {menuIndex: '3-5', menuName: '认证汇总台账', menuView: 'certifiedStatistics'}]}, //, {menuIndex: '3-2', menuName: '客运发票申报'}
        // // {menuIndex: '4', menuName: '智能申报', menuIcon: 'el-icon-s-data', subMenu: [{menuIndex: '4-1', menuName: '智能申报1'}, {menuIndex: '4-2', menuName: '智能申报2'}]},
        // {menuIndex: '4', menuName: '主数据管理', menuIcon: 'el-icon-s-data', subMenu: [
        //   {menuIndex: '4-1', menuName: '费用类别管理', menuView: 'businessSet'},
        //   {menuIndex: '4-2', menuName: '税收分类设置', menuView: 'taxCodeSet'},
        //   {menuIndex: '4-3', menuName: '规则匹配库', menuView: 'rulesStore'},
        //   {menuIndex: '4-4', menuName: '基础数据设置', menuView: 'baseDataSet'}]},
        // {menuIndex: '5', menuName: '系统设置', menuIcon: 'el-icon-s-tools', subMenu: [
        //   {menuIndex: '5-1', menuName: '发票查验日志', menuView: 'checkQueryLog'},
        //   {menuIndex: '5-2', menuName: '发票认证日志', menuView: 'certifiedResult'},
        //   {menuIndex: '5-3', menuName: '用户列表', menuView: 'userList'},
        //   {menuIndex: '5-4', menuName: '组织管理', menuView: 'org'}]}, //  {menuIndex: '5-2', menuName: '发票识别日志', menuView: 'discernQueryLog'}
        // {menuIndex: '6', menuName: '对账集成', menuIcon: 'el-icon-loading', subMenu: [
        // {menuIndex: '6-1', menuName: '受票组织(采购方)信息', menuView: 'buyer'},
        //   {menuIndex: '6-1', menuName: '开票组织(销售方)信息', menuView: 'seller'},
        //   {menuIndex: '6-2', menuName: '商品(物料)信息', menuView: 'good'},
        //   {menuIndex: '6-3', menuName: '对账与发票管理', menuView: 'invoice'}]},
        {menuIndex: '7', menuName: '收票管理', menuIcon: 'el-icon-loading', subMenu:
            [{menuIndex: '7-1', menuName: '发票扫描上载', menuView: ''},
              {menuIndex: '7-2', menuName: '发票导入上载', menuView: 'pdfUpSys'},
              {menuIndex: '7-3', menuName: '发票查验', menuView: ''},
              {menuIndex: '7-4', menuName: '发票打印', menuView: ''},
              {menuIndex: '7-5', menuName: '疑票管理', menuView: 'doubtfulInvoice'}]},
        {menuIndex: '8', menuName: '采购入账协同', menuIcon: 'el-icon-loading', subMenu:
            [{menuIndex: '8-1', menuName: '对账管理', menuView: 'invoice'},
              {menuIndex: '8-2', menuName: '直连开票', menuView: ''},
              {menuIndex: '8-3', menuName: '发票关联', menuView: ''},
              {menuIndex: '8-4', menuName: '差异报告', menuView: ''}]},
        {menuIndex: '9', menuName: '报销入账协同', menuIcon: 'el-icon-paperclip', subMenu:
            [{menuIndex: '9-1', menuName: '费用类别管理', menuView: 'businessSet'},
              {menuIndex: '9-2', menuName: '计税设置', menuView: ''},
              {menuIndex: '9-3', menuName: '转出事项管理', menuView: ''}]},
        {menuIndex: '10', menuName: '进项台账管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '10-1', menuName: '专票台账', menuView: 'receiveInvoice'},
              {menuIndex: '10-2', menuName: '客运台账', menuView: 'trafficInvoice'},
              {menuIndex: '10-3', menuName: '费用台账', menuView: 'costInvoice'},
              {menuIndex: '10-4', menuName: '海关缴款书', menuView: ''},
              {menuIndex: '10-5', menuName: '机动车台账', menuView: 'saleCarInvoice'},
              {menuIndex: '10-6', menuName: '不动产', menuView: ''},
              {menuIndex: '10-7', menuName: '进项汇总台账', menuView: 'invoiceStatistics'},
              {menuIndex: '10-8', menuName: '进项发票打印', menuView: ''},
              {menuIndex: '10-9', menuName: '发票复查', menuView: 'reviewInvoice'},
              {menuIndex: '10-10', menuName: '进项台帐导出', menuView: 'exportInvoice'}]},
        {menuIndex: '11', menuName: '集中认证管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '11-1', menuName: '发票勾选认证', menuView: 'certifiedInvoice'},
              {menuIndex: '11-2', menuName: '客运发票申报', menuView: 'cerTraInvoice'},
              {menuIndex: '11-3', menuName: '认证汇总台账', menuView: 'certifiedStatistics'},
              {menuIndex: '11-4', menuName: '认证发票转出', menuView: 'turnOffInvoice'}]},
        {menuIndex: '12', menuName: '销项开票管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '12-1', menuName: '开票平台', menuView: ''},
              {menuIndex: '12-2', menuName: '开票控制台', menuView: ''},
              {menuIndex: '12-3', menuName: '报关单获取', menuView: ''},
              {menuIndex: '12-4', menuName: '开票查询', menuView: ''},
              {menuIndex: '12-5', menuName: '差异查询', menuView: ''},
              {menuIndex: '12-6', menuName: '发票清单报表', menuView: ''},
              {menuIndex: '12-7', menuName: '发票汇总报表', menuView: ''},
              {menuIndex: '12-8', menuName: '销项发票打印', menuView: ''}]},
        {menuIndex: '13', menuName: '增值税核算管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '13-1', menuName: '进项转出确认', menuView: ''},
              {menuIndex: '13-2', menuName: '进项税加计', menuView: ''},
              {menuIndex: '13-3', menuName: '免抵退管理', menuView: ''},
              {menuIndex: '13-4', menuName: '一般退税管理', menuView: ''},
              {menuIndex: '13-5', menuName: '附加税计提', menuView: ''},
              {menuIndex: '13-6', menuName: '印花税维护', menuView: ''}]},
        {menuIndex: '14', menuName: '申报表管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '14-1', menuName: '报表维护', menuView: ''},
              {menuIndex: '14-2', menuName: '报表确认', menuView: ''},
              {menuIndex: '14-3', menuName: '财务报表导入', menuView: ''},
              {menuIndex: '14-4', menuName: '社保费导入', menuView: ''},
              {menuIndex: '14-5', menuName: '印花税报表', menuView: ''}]},
        {menuIndex: '15', menuName: '自动申报管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '15-1', menuName: '一键申报', menuView: ''},
              {menuIndex: '15-2', menuName: '申报进度查看', menuView: ''},
              {menuIndex: '15-3', menuName: '税费缴纳', menuView: ''}]},
        {menuIndex: '16', menuName: '主数据管理', menuIcon: 'el-icon-s-operation', subMenu:
            [{menuIndex: '16-1', menuName: '组织主数据', menuView: 'seller'},
              {menuIndex: '16-2', menuName: '货品主数据', menuView: 'good'},
              {menuIndex: '16-3', menuName: '税收分类设置', menuView: 'taxCodeSet'},
              {menuIndex: '16-4', menuName: '政策管理', menuView: ''},
              {menuIndex: '16-5', menuName: '规则匹配库', menuView: 'rulesStore'},
              {menuIndex: '16-6', menuName: '基础数据设置', menuView: 'baseDataSet'}]},
        {menuIndex: '17', menuName: '系统设置', menuIcon: 'el-icon-s-tools', subMenu:
            [{menuIndex: '17-1', menuName: '基础设置', menuView: ''},
              {menuIndex: '17-2', menuName: '发票查验日志', menuView: 'checkQueryLog'},
              {menuIndex: '17-3', menuName: '发票认证日志', menuView: 'certifiedResult'},
              {menuIndex: '17-4', menuName: '用户管理', menuView: ''},
              {menuIndex: '17-5', menuName: '用户列表', menuView: 'userList'},
              {menuIndex: '17-6', menuName: '组织管理', menuView: 'org'}]}
      ]
    }
  },
  mounted () {
    console.log(this.username)
    console.log(this.operator)
    this.operatorDeal()
  },
  methods: {
    handleOpen (key, keyPath) { // 展开菜单操作
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) { // 合并菜单操作
      console.log(key, keyPath)
    },
    menuLink (obj) { // 打开二级菜单
      this.$store.dispatch('choosePage', obj)
    },
    operatorDeal () { // 操作员权限
      if (this.username !== 'admin' && this.username !== 'cj') {
        console.log('管理员权限')
        let meun = {menuIndex: '5', menuName: '系统设置', menuIcon: 'el-icon-s-tools', subMenu: [{menuIndex: '5-1', menuName: '发票查验日志', menuView: 'checkQueryLog'}, {menuIndex: '5-2', menuName: '发票认证日志', menuView: 'certifiedResult'}]}
        this.$set(this.menuList, 3, meun)
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
  .comTop
    padding 0!important
    height auto
  .el-menu
    border-right 0px
  .navBar
    height 100%
    position relative
    border-right: solid 1px #e6e6e6;
    width 100%
    overflow-x hidden;
    background-color #ffffff !important;
    .companyInfo
      background-color #ffffff
      padding 30px 10px 20px 10px
      .companyLogo
        width 180px
        height 100px
      .companyName
        text-align center
        font-size 19px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        max-width 180px
        display block
        margin 20px 0 10px 0
        color #000000
        line-height normal
      .operator
        text-align center
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        max-width 180px
        display block
        color #000000
        line-height normal
    .smCompanyInfo
      width 64px
      height 64px
      .smCompanyLogo
        width 64px
        height 64px
    .nav-collapse
      position absolute
      margin auto
      bottom 0
      right 0
      height 40px
      width 70px
      line-height: 40px;
      font-size 20px
      background-color #409EFF
      color #fff
      border 0
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width: 200px
    min-height: 400px
</style>
