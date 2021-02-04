<template>
  <div id="dashboard">
    <div class="control" style="min-width: 1500px">
      <Head></Head>
    </div>

    <div>
      <Control></Control>

      <div v-if="org" class="merge" style="position: relative">
        <div v-if="org.docNum" class="org" style="">
          <span v-if="org.orgName">开票组织：{{ org.orgName }}</span>
          <span v-if="org.userName">开票人：{{ org.userName }}</span>
          <!-- <span v-if="org.checkName">复核人：{{org.checkName}}</span> -->
          <span v-if="org.docStatus">单据状态：{{ org.docStatus }}</span>
          <span v-if="org.docDate">单据时间：{{ org.docDate }}</span>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="原始单据" name="first">
            <First></First>
          </el-tab-pane>
          <el-tab-pane label="单据合并" name="second">
            <Second></Second>
          </el-tab-pane>
          <el-tab-pane label="开票分组" name="split">
            <Split></Split>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import First from './child/First'
  import Second from './child/Second'
  import Split from './child/Split'

  import Head from './child/Head'
  import Control from './child/Control'
  import { getInvoiceHeadInfo } from '@/api/zhys'
  export default {
    name: 'Leading',
    components: { First, Second, Split, Head, Control },
    // components: { Head },

    computed: {
      activeName() {
        return this.$store.state.tabs.activeName
      },
      org() {
        var invoiceHead = this.$store.state.invoiceHead
        var org = this.$store.state.org2
        if (!org) {
          return
        }
        if (invoiceHead && invoiceHead.docStatus == '0') {
          org.docStatus = '制单中'
        } else if (invoiceHead && invoiceHead.docStatus == '1') {
          org.docStatus = '已提交金税'
        } else if (invoiceHead && invoiceHead.docStatus == '2') {
          org.docStatus = '金税已开票'
        } else if (invoiceHead && invoiceHead.docStatus == '-1') {
          org.docStatus = '待引入'
        } else {
          org.docStatus = null
        }
        return org
      },
    },
    watch: {
      $route: {
        handler(newVal, oldVal) {
          //  alert(1);
          if (newVal.query.docNum) {
            this.gainInvoiceHeadInfo(newVal.query.docNum)
          }
        },
        deep: true,
        immediate: true,
      },
    },

    created() {},
    methods: {
      handleChange(value) {
        console.log(value)
      },
      changeDialog(val) {
        this.show.dialog = val
      },
      async gainInvoiceHeadInfo(docNum) {
        let { data } = await getInvoiceHeadInfo(docNum)
        if (!data) {
          return
        }
        if (data.code == 1) {
          if (!data.data) {
            this.$message.error('没有此单据信息！')
            this.$store.commit('InvoiceHead', {})
          }
          this.$store.commit('InvoiceHead', data.data)
          if (!this.$store.state.originalHead) {
            this.$store.state.originalHead = {}
          }
          this.$store.state.originalHead.docNum = this.$store.state.invoiceHead.originalNos

          this.$store.state.tabs.activeName = 'split'
        } else {
          if (data.msg) {
            this.$message.error(data.msg)
          } else {
            this.$message.error(data)
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  #dashboard {
    color: #777;
    // background-color:#f0f2f5;
    margin: 0px;
    padding: 1px 20px;
    .control {
      background-color: white;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .merge {
      margin-top: 50px;
    }
  }

  .org {
    border-left: 5px solid #1890ff;
    position: absolute;
    padding-left: 10px;
    top: 10px;
    right: 0px;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      margin: 0px 10px;
    }
  }
</style>
