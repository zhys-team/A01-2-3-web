<template>
  <div>
    <el-row :gutter="0">
      <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">dddd</el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">111</el-col> -->

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="all">
        <!-- <div>
          <div id="printTest">
            <div class="pdf">
              <pdf
                ref="pdf"
                :src="'http://dev.fapiao.com:19080/dzfp-web/pdf/download?request=e5uhf8WETIOMgaa2cCUMttuC98oVDepMIgUcwAROnuYMNqSBA4qLmPBGcPpKhFDZmTU-Y90x7hM_%5EDaJHcjcAdJ'"
              ></pdf>
            </div>
          </div>

          　　　　
          <button v-print="'#printTest'">打印</button>
        </div> -->
        <div class="top">
          <el-form :inline="true">
            <el-form-item label="组织">
              <el-select
                v-model="orgIdSelected"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in orgsSmart"
                  :key="item.orgId"
                  :label="item.orgId | orgNull"
                  :value="item.orgId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发票类型" style="margin-left: 20px">
              <el-select
                v-model="invoiceTypeSelected"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option
                  v-for="item in invoiceTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <div style="float: right">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="dialogFormVisible = true"
              >
                高级查询
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-unlock"
                @click="unCommited()"
              >
                解锁已提交
              </el-button>
              <el-button icon="el-icon-refresh-left" plain @click="reset()">
                重置
              </el-button>
            </div>
          </el-form>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有发票" name="all"></el-tab-pane>
            <el-tab-pane label="已开发票" name="2"></el-tab-pane>
            <el-tab-pane label="待开发票" name="1"></el-tab-pane>
            <el-tab-pane label="异常发票" name="error"></el-tab-pane>
            <el-tab-pane label="待同步" name="issync-1"></el-tab-pane>
            <el-tab-pane label="已同步" name="issync-2"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="query">
          <el-table
            v-loading="invoiceCondition.invoices == null"
            :data="invoiceCondition.invoices"
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="docNum"
              label="单据编号"
              sortable
              width="100"
            >
              <template slot-scope="scope">
                <span
                  style="cursor: pointer"
                  @click="getInvoiceDetail2(scope.row)"
                >
                  {{ scope.row.docNum }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="groupNum"
              label="分组号"
              sortable
              width="100"
            ></el-table-column>

            <el-table-column
              prop="goldtaxCode"
              label="发票代码"
              width="130"
              sortable
            ></el-table-column>

            <el-table-column
              prop="goldtaxNum"
              label="发票号码"
              width="100"
              sortable
            ></el-table-column>

            <el-table-column
              prop="invoiceType"
              label="发票类型"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  <el-tag v-if="scope.row.invoiceType == '3'">电子专票</el-tag>
                  <el-tag v-if="scope.row.invoiceType == '4'" type="success">
                    电子普票
                  </el-tag>
                  <el-tag v-if="scope.row.invoiceType == '5'" type="info">
                    外销发票
                  </el-tag>
                  <el-tag v-if="scope.row.invoiceType == '1'" type="warning">
                    纸质普票
                  </el-tag>
                  <el-tag v-if="scope.row.invoiceType == '2'" type="danger">
                    纸质专票
                  </el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="groupStatus"
              label="发票状态"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.groupStatus == '1'" style="">
                  <el-button type="primary" size="small" round>
                    已提交金税
                  </el-button>
                </div>
                <div v-if="scope.row.groupStatus == '3'">
                  <el-button type="primary" size="small" round>
                    已提交作废
                  </el-button>
                </div>

                <div v-if="scope.row.groupStatus == '0'">
                  <el-button type="info" size="small" round>制单中</el-button>
                </div>

                <div v-if="scope.row.groupStatus == '2'">
                  <el-button type="success" size="small" round>
                    金税已开票
                  </el-button>
                </div>

                <div v-if="scope.row.groupStatus == '9'">
                  <el-button type="success" size="small" round>
                    金税已作废
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="custIdBill"
              label="购方公司编码"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="custName"
              label="购方公司名称"
              width="250"
            ></el-table-column>
            <el-table-column
              prop="zamountWsj"
              label="未税金额"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="zamountSej"
              label="税额"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="zamountHsj"
              label="含税金额"
              width="100"
              sortable
            ></el-table-column>
            <el-table-column
              prop="epdfUrl"
              label="发票地址"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  <a
                    v-if="scope.row.epdfUrl"
                    :href="scope.row.epdfUrl"
                    target="_blank"
                  >
                    <i class="el-icon-link"></i>
                  </a>
                  <span
                    v-if="!scope.row.epdfUrl"
                    :href="scope.row.epdfUrl"
                    target="_blank"
                  ></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="wsjec"
              label="未税金额差"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="hsjec"
              label="含税金额差"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="sec"
              label="税额差"
              width="100"
            ></el-table-column>

            <el-table-column
              prop="zamountHzhs"
              label="行折含税"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="zamountHzws"
              label="行折含税"
              width="100"
            ></el-table-column>

            <el-table-column
              prop="zamountHzse"
              label="行折含税"
              width="100"
            ></el-table-column>

            <el-table-column
              prop="billGdate"
              label="开票时间"
              width="150"
              sortable
            ></el-table-column>
            <el-table-column
              prop="docDate"
              label="单据时间"
              width="150"
              sortable
            ></el-table-column>
            <el-table-column
              prop="orgTaxcode"
              label="销方公司税号"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="orgName"
              label="销方公司名称"
              width="250"
            ></el-table-column>
            <el-table-column
              prop="userName"
              label="开票人"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="checkName"
              label="复核人"
              width="100"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <!-- slot-scope="scope" -->
              <template slot-scope="scope">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="解锁同步"
                    placement="left-start"
                  >
                    <i
                      class="el-icon-refresh"
                      style="color: #1890ff; font-size: 15px"
                      @click="unlock(scope.row)"
                    ></i>
                  </el-tooltip>

                  <i
                    class="el-icon-position"
                    style="color: #1890ff; font-size: 15px; margin-left: 10px"
                    @click="toInvoice(scope.row)"
                  ></i>

                  <i
                    class="el-icon-view"
                    style="color: #1890ff; font-size: 15px; margin-left: 10px"
                    @click="
                      getInvoiceDetail(scope.row.docNum, scope.row.groupNum)
                    "
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title="手工开立发票"
          :visible.sync="invoice.dialog"
          width="30%"
          center
        >
          <span>
            当前发票所在单据{{ invoice.docNum }},所在组{{ invoice.groupNum }} ,
            请确认以下操作！
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="invoice.dialog = false">取 消</el-button>
            <el-button v-if="!lock" type="primary" @click="toInvoiceGroup()">
              开立本组发票
            </el-button>
            <el-button
              v-if="lock"
              type="primary"
              disabled
              @click="toInvoiceGroup()"
            >
              开立本组发票
            </el-button>
            <el-button v-if="!lock" type="primary" @click="toInvoiceDoc()">
              开立整单发票
            </el-button>

            <el-button
              v-if="lock"
              type="primary"
              disabled
              @click="toInvoiceDoc()"
            >
              开立整单发票
            </el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <div>
      <el-pagination
        :current-page="invoiceCondition.pageNum"
        :page-size="invoiceCondition.pageSize"
        background
        layout="prev, pager, next"
        :total="invoiceCondition.rowCount"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div>
      <el-dialog title="发票查询" :visible.sync="dialogFormVisible">
        <el-form :inline="true">
          <el-form-item label="单据编号">
            <el-input
              v-model="invoiceCondition.docNum"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="购方名称">
            <el-input
              v-model="invoiceCondition.custName"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="购方编号">
            <el-input
              v-model="invoiceCondition.custIdBill"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true">
          <el-form-item label="发票号码">
            <el-col :span="10">
              <el-form-item prop="date1">
                <el-input
                  v-model="invoiceCondition.goldtaxNumStart"
                  placeholder=""
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                <el-input
                  v-model="invoiceCondition.goldtaxNumEnd"
                  placeholder=""
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="margin-top: -12px" label="单据时间">
            <el-col :span="10">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="invoiceCondition.billDateStart"
                  type="date"
                  placeholder="起"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                <el-date-picker
                  v-model="invoiceCondition.billDateEnd"
                  placeholder="止"
                  type="date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item style="margin-top: -12px" label="开票时间">
            <el-col :span="10">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="invoiceCondition.billGdateStart"
                  type="date"
                  placeholder="起"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="10">
              <el-form-item prop="date2">
                <el-date-picker
                  v-model="invoiceCondition.billGdateEnd"
                  placeholder="止"
                  type="date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-button
            icon="el-icon-delete"
            plain
            style="position: absolute; right: 100px; bottom: 10px"
            @click="clear()"
          >
            清空
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="position: absolute; right: 10px; bottom: 10px"
            @click="topQuery()"
          >
            查询
          </el-button>
        </el-form>
      </el-dialog>
    </div>

    <!-- 详情页设计 -->
    <transition name="el-fade-in-linear">
      <div
        v-if="showDetail"
        class="invoice"
        @mouseenter="continueShowDetail()"
        @mouseleave="hideDetail"
      >
        <i
          class="el-icon-close"
          style="position: absolute; top: 10px; right: 10px"
          @click="showDetail = false"
        ></i>
        <div class="head">
          <h4
            v-if="invoiceHead != null && invoiceHead.invoiceSplitLines != null"
            style="position: relative"
          >
            <span>单据号:{{ invoiceHead.docNum }}</span>
            <span>整单发票号码:{{ invoiceHead.goldtaxNum }}</span>
            <span>客户名称:{{ invoiceHead.orgName }}</span>
            <span v-if="invoiceHead.custTelephone">
              客户电话:{{ invoiceHead.custTelephone }}
            </span>
            <span v-if="invoiceHead.custMobile">
              客户手机:{{ invoiceHead.custMobile }}
            </span>

            <span style="margin-left: 20px; margin-right: 5px">
              发票代码:
              <el-tag :key="'ssss'" :type="'info'" effect="dark">
                {{ invoiceHead.invoiceSplitLines[0].goldtaxCode }}
              </el-tag>
            </span>
            <span style="margin-right: 0px">
              发票号码:
              <el-tag :key="'ssss'" :type="'success'" effect="dark">
                {{ invoiceHead.invoiceSplitLines[0].goldtaxNum }}
              </el-tag>
              组号:{{ invoiceHead.invoiceSplitLines[0].groupNum }}
            </span>
          </h4>
        </div>
        <div class="body">
          <el-table
            :data="invoiceHead.invoiceSplitLines"
            :show-header="true"
            style="width: 100%"
            show-summary
          >
            <el-table-column prop="docLine" label="行号"></el-table-column>
            <el-table-column prop="itemName" label="商品名称"></el-table-column>
            <el-table-column prop="itemSpec" label="规格型号"></el-table-column>
            <el-table-column prop="unitName" label="单位"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="zpriceHsj" label="单价"></el-table-column>
            <el-table-column
              prop="zamountHsj"
              label="含税金额"
            ></el-table-column>
            <el-table-column prop="taxRate" label="税率"></el-table-column>
            <el-table-column prop="zamountSej" label="税额"></el-table-column>
          </el-table>
          <div
            v-if="invoiceHead != null && invoiceHead.invoiceSplitLines != null"
          >
            <div style="margin-top: 10px"></div>
            <div style="margin-top: 5px"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  // import pdf from 'vue-pdf'
  import {
    getInvoices,
    unlock,
    toInvoice,
    getInvoiceDetail,
    unCommited,
  } from '@/api/invoice.js'
  export default {
    name: 'InvoiceQuery',
    // components: { pdf },
    filters: {
      orgNull: function (value) {
        if (value == null) {
          return '所有组织'
        } else {
          return null
        }
      },
    },
    data() {
      return {
        lock: false,
        invoice: {
          docNum: '',
          groupNum: '',
          isAll: null,
          dialog: false,
        },
        showDetail: false,
        invoiceTypeSelected: null,
        dialogFormVisible: false,
        activeName: '2',
        orgIdSelected: '',
        invoiceHeads: [],
        invoiceHead: {},
        invoiceCondition: {
          billGdateStart: null,
          billGdateEnd: null,
          billDateStart: null,
          billDateEnd: null,
          goldtaxNumStart: null,
          goldtaxNumEnd: null,
          orgId: '',
          rowCount: null,
          pageSize: 15,
          pageNum: 1,
          groupStatus: null,
          goldtaxCode: null,
          issync: null,
          invoiceType: null,
        },
        invoiceTypes: [
          {
            value: 4,
            label: '电子普票',
          },
          {
            value: 3,
            label: '电子专票',
          },
          {
            value: 5,
            label: '外销发票',
          },
          {
            value: 1,
            label: '纸质专票',
          },

          {
            value: 2,
            label: '纸质普票',
          },

          {
            value: null,
            label: '所有票型',
          },
        ],
        timer: null,
      }
    },
    computed: {
      orgs() {
        return this.$store.state.orgs
      },
      org() {
        return this.$store.state.org
      },
      orgsSmart() {
        let a = []
        let mapObj = new Map()
        if (this.$store.state.orgs) {
          this.$store.state.orgs.forEach((item) => {
            if (item.orgId) {
              mapObj.set(item.orgId, item.orgId)
            }
          })

          mapObj.forEach((value, key) => {
            let item = { orgId: null }
            item.orgId = key
            a.push(item)
          })
          let item = { orgId: null }
          item.orgId = null
          a.push(item)
          return a
        } else {
          return []
        }
      },
    },
    watch: {
      invoiceTypeSelected: {
        handler(newVal, oldVal) {
          if (newVal != null) {
            this.invoiceCondition.invoiceType = newVal
            this.topQuery()
          }
        },
        immediate: true,
        deep: true,
      },
      activeName: {
        handler(newVal, oldVal) {
          this.getInvoices(this.invoiceCondition)
        },
      },
      $route: {
        handler(val, oldval) {
          if (this.$store.state.org != null && this.orgIdSelected == '') {
            this.orgIdSelected = this.$store.state.org.orgId
            this.invoiceCondition.orgId = this.orgIdSelected
          }
        },
        // 深度观察监听
        deep: true,
        immediate: true,
      },
      org: {
        handler(newVal, oldVal) {
          if (newVal != null) {
            this.orgIdSelected = this.$store.state.org.orgId
            this.invoiceCondition.orgId = this.orgIdSelected
          }
        },
        immediate: true,
        deep: true,
      },
      orgIdSelected: {
        handler(newVal, oldVal) {
          // alert(newVal)
          if (newVal != null && newVal != '') {
            this.invoiceCondition.orgId = newVal
            this.getInvoices(this.invoiceCondition)
          }
          if (newVal == null) {
            this.invoiceCondition.orgId = newVal
            this.getInvoices(this.invoiceCondition)
          }
        },
        immediate: false,
        deep: true,
      },
    },
    created() {
      // this.invoiceCondition.groupStatus = '2'
      // this.getInvoices(this.invoiceCondition)
      this.topQuery()
    },
    methods: {
      continueShowDetail() {
        this.showDetail = true
        clearTimeout(this.timer)
        this.timer = null
      },
      hideDetail() {
        this.timer = setTimeout(() => {
          this.showDetail = false
          this.invoiceHead.invoiceSplitLines = []
          clearTimeout(this.timer)
        }, 5000)
      },
      //合计
      getInvoiceDetail2(row) {
        this.getInvoiceDetail(row.docNum, row.groupNum)
      },
      async getInvoiceDetail(docNum, groupNum) {
        this.showDetail = true
        clearTimeout(this.timer)
        this.timer = null
        let { data: result } = await getInvoiceDetail(docNum, groupNum)
        if (result.success) {
          // this.$message.success(result.msg)
          this.invoiceHead = result.data
          this.invoiceHead.invoiceSplitLines = result.data.invoiceSplitLines
          console.log(this.invoiceHead)
        } else {
          this.$message.error(result.msg)
        }
        this.hideDetail()
      },
      async toInvoiceGroup() {
        this.invoice.isAll = false
        this.lock = true

        let { data: result } = await toInvoice(this.invoice)
        this.lock = false
        if (result.success) {
          this.$message.success(result.msg)
          this.topQuery()
        } else {
          this.$message.error(result.msg)
        }

        this.invoice.dialog = false
      },
      async toInvoiceDoc() {
        this.invoice.isAll = true
        this.lock = true
        let { data: result } = await toInvoice(this.invoice)
        this.lock = false
        if (result.success) {
          this.$message.success(result.msg)
          this.topQuery()
        } else {
          this.$message.error(result.msg)
        }

        this.invoice.dialog = false
      },
      toInvoice(item) {
        this.invoice.docNum = item.docNum
        this.invoice.groupNum = item.groupNum
        this.invoice.dialog = true
      },
      async getInvoices(condition) {
        // 检测activeName的变化
        this.invoiceCondition.goldtaxCode = null
        this.invoiceCondition.issync = null
        let newVal = this.activeName
        if (newVal == 'all') {
          this.invoiceCondition.groupStatus = null
        } else if (newVal == 'error') {
          this.invoiceCondition.goldtaxCode = '1'
        } else if (newVal.substring(0, 6) == 'issync') {
          this.invoiceCondition.groupStatus = null
          this.invoiceCondition.issync = newVal.substring(7)
        } else {
          this.invoiceCondition.groupStatus = newVal
        }

        this.invoiceCondition.invoices = null
        this.invoiceCondition.orgId = this.orgIdSelected
        let { data: result } = await getInvoices(this.invoiceCondition)
        if (result.success) {
          this.invoiceCondition = result.data
        } else {
          this.$message.error('查询失败!')
        }
      },
      handleCurrentChange(num) {
        // alert(this.invoiceCondition.groupStatus)
        this.invoiceCondition.pageNum = num
        this.getInvoices(this.invoiceCondition)
      },
      handleClick() {},
      topQuery() {
        this.getInvoices(this.invoiceCondition)
        this.dialogFormVisible = false
      },
      async unlock(item) {
        let { data: result } = await unlock(item)
        if (result.success) {
          console.log('==================')
          this.$message.success(result.msg)
          this.topQuery()
        } else {
          this.$message.error(result.msg)
        }
      },
      clear() {
        this.invoiceCondition.docNum = null
        this.invoiceCondition.custName = null
        this.invoiceCondition.custIdBill = null
        this.invoiceCondition.goldtaxNumStart = null
        this.invoiceCondition.goldtaxNumEnd = null
        this.invoiceCondition.billDateStart = null
        this.invoiceCondition.billDateEnd = null
      },
      reset() {
        this.invoiceCondition.invoiceType = null
        this.invoiceCondition = {
          billDateStart: null,
          billDateEnd: null,
          goldtaxNumStart: null,
          goldtaxNumEnd: null,
          orgId: '',
          rowCount: null,
          pageSize: 15,
          pageNum: 1,
          groupStatus: null,
          goldtaxCode: null,
          issync: null,
          invoiceType: null,
        }
        this.invoiceCondition.orgId = this.org.orgId
        this.activeName = 'all'
        this.getInvoices(this.invoiceCondition)
      },
      async unCommited() {
        let { data: result } = await unCommited(this.org.orgId)
        this.$message.info(result.msg)
      },
    },
  }
</script>

<style scoped lang="scss">
  .all {
    padding: 20px;
  }
  .invoice {
    padding: 20px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-right: 5px solid #50bfff;
    border-radius: 5px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    max-height: 100vh;
    overflow: auto;
    // transform: translate(-50%, -50%);

    .head {
      h4 {
        border-left: 5px solid #50bfff;
        padding: 0px 20px;
        opacity: 0.7;
        span {
          margin-right: 20px;
        }
      }
    }
  }
</style>
