<template>
  <div class="invoice-model">
    <!--操作栏-->
    <el-row class="operaBar">
      <el-col :span="6" v-if="tableSetting.isSearch">
        <el-input
          :placeholder="tableSetting.isSearch.placeholder"
          v-model="searchVal"
          class="barSearch"
          @keydown.enter.native="tableSearch"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="tableSearch"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6" class="opTbn">
        <el-button type="primary" icon="el-icon-zoom-in" @click="openSenior">
          高级查询
        </el-button>
        <!--<el-button type="danger" icon="el-icon-delete" @click="removePl">批量删除</el-button>-->
        <el-tooltip
          class="item"
          effect="dark"
          content="重置刷新"
          placement="top-start"
        >
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh"
            @click="refreshTable"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!--表格插件-->
    <base-table
      class="baseTable"
      ref="baseTable"
      :option="tableSetting"
      :httpurl="httpUrl"
      @selectChange="handleSelectionChange"
      @operaFun="handleOpera"
      @dbRowClick="rowDbClick"
    ></base-table>
    <!--图片查看器-->
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="[showUrl]"
    ></el-image-viewer>
    <!--行查看-->
    <row-drawer
      :drawer="drawer"
      :option="rowOption"
      @handleClose="drawerClose"
    ></row-drawer>
    <!--高级搜索-->
    <senior-search
      :sivisible="sivisible"
      :option="sioption"
      @handleClose="closeSenior"
      @handleSearch="seniorSearchSure"
    ></senior-search>
  </div>
</template>

<script>
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  import RowDrawer from '@/base/table/RowDrawer'
  import seniorSearch from '@/base/table/seniorSearch'
  import BaseTable from '@/base/table/table'
  import { deleteInvoice } from '@/api/invoice-heads'
  export default {
    name: 'invoice-model',
    components: {
      BaseTable,
      ElImageViewer,
      RowDrawer,
      seniorSearch,
    },
    props: ['option', 'seniorSearch'],
    data() {
      return {
        tableSetting: this.option,
        httpUrl: this.$ihttp + '/invoiceHeads/page',
        searchVal: '',
        params: {}, // 查询参数
        showViewer: false, // 显示查看器
        showUrl: '', // 需要展示的图片Url
        drawer: false, // 显示发票详情开关
        rowOption: '', // 显示详情发票arr
        sivisible: false, // 显示高级查询弹窗开关
        sioption: this.seniorSearch, // 高级选项弹窗设置
        multipleSelection: [], // 勾选行集合
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      rowDbClick(row) {
        if (
          row.fplx === '10100' ||
          row.fplx === '10101' ||
          row.fplx === '10102' ||
          row.fplx === '10103'
        ) {
          this.rowOption = row
          this.drawer = true
        } else {
          this.$message({
            message: '此票据无详情数据',
            type: 'info',
          })
        }
      },
      tableSearch() {
        let p = this.searchVal.replace(/\s*/g, '')
        let s = JSON.parse(JSON.stringify(this.params))
        s['queryString1'] = p
        // this.params = s
        // 执行searchTable
        this.$refs.baseTable.searchTable(s)
      },
      watchImage(url) {
        // 开启查看器
        this.showUrl = this.$ihttp + url
        this.showViewer = true
      },
      closeViewer() {
        // 关闭查看器
        this.showViewer = false
      },
      drawerClose() {
        // 关闭发票详情
        this.drawer = false
      },
      openSenior() {
        // 打开高级搜索
        this.sivisible = true
      },
      closeSenior() {
        // 关闭高级搜索
        this.sivisible = false
      },
      seniorSearchSure(param) {
        // 确定高级查询
        let _this = this
        _this.searchVal = ''
        let httpPa = param
        _this.params = param
        console.log(httpPa)
        this.$refs.baseTable.searchTable(httpPa)
      },
      async removeInvoice({ fphm, fpdm, bxState, id }) {
        // 移除发票选项
        await this.$confirm(
          '是否删除发票号码：' + fphm + '发票代码：' + fpdm + '的发票？',
          '提示',
          { type: 'warning' }
        )
        // eslint-disable-next-line eqeqeq
        if (bxState == '1') {
          this.$message({
            message: '已报销的发票不能被删除！',
            type: 'info',
          })
          return
        }
        const loading = this.$loading({
          lock: true,
          text: '删除中',
        })
        try {
          deleteInvoice(id)
          this.$refs.baseTable.initTable()
          this.$message({
            message: '删除成功！',
            type: 'success',
          })
        } catch (error) {
          console.log(error)
        } finally {
          loading.close()
        }
        // this.$confirm('是否删除发票号码：' + row.fphm + '发票代码：' + row.fpdm + '的发票？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   // eslint-disable-next-line eqeqeq
        //   if (row.bxState == '1') {
        //     _this.$message({
        //       message: '已报销的发票不能被删除！',
        //       type: 'info'
        //     })
        //     return
        //   }
        //   const loading = this.$loading({
        //     lock: true,
        //     text: '删除中'
        //   })
        //   _this.axios.get(_this.$ihttp + '/invoiceHeads/state/' + row.id).then(
        //     res => {
        //       _this.loading = false
        //       console.log(res)
        //       _this.$refs.baseTable.initTable()
        //       _this.$message({
        //         message: '删除成功！',
        //         type: 'success'
        //       })
        //     }).catch(rev => {
        //     _this.loading = false
        //     _this.$message({
        //       message: '删除失败！',
        //       type: 'error'
        //     })
        //   })
        //   loading.close()
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
      },
      handleOpera(obj) {
        // 其他行操作按钮接口暂时不用自定义
        console.log(obj.type)
        console.log(obj.trIndex)
        console.log(obj.row)
        console.log(obj.data)
        console.log(obj.opIndex)
        switch (obj.type) {
          case 'delete':
            this.removeInvoice(obj.row)
            break
          case 'watch':
            this.watchImage(obj.row.pdfUrl)
            break
        }
      },
      removePl() {
        // 批量删除
        let _this = this
        let selectArr = _this.multipleSelection.map((item) => "'" + item + "'")
        let idarr = selectArr.join(',')
        _this
          .$confirm('是否删除删除所选发票？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            _this.axios
              .post(_this.$ihttp + '/invoiceHeads/1/' + idarr)
              .then((res) => {
                _this.loading = false
                console.log(res)
                _this.$message({
                  message: '删除成功！',
                  type: 'success',
                })
              })
              .catch((rev) => {
                _this.loading = false
                _this.$message({
                  message: '删除失败！',
                  type: 'error',
                })
              })
            _this.$refs.baseTable.initTable()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      refreshTable() {
        // 刷新重置表格
        this.$refs.baseTable.initTable()
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .invoice-model
    height 100%
  .baseTable
    height calc(100% - 50px)
  .operaBar
    padding 0
    margin-bottom 10px
    width  100%
    .opTbn
      text-align right
  .tab-page
    background-color #fff
    padding 8px 10px
    margin-top 10px
</style>
