<template>
  <div>
    <el-dialog
      width="80%"
      title="引入开票数据"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <div class="row">
        <div class="item" style="width: 25%">
          <span class="title">销方组织：</span>
          <div class="box">
            <el-select
              v-model="org"
              style="width: 100%"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in orgs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="item" style="width: 25%">
          <span class="title">销方全称：</span>
          <div class="box">
            <el-input v-model="query.createdBy" placeholder=""></el-input>
          </div>
        </div>

        <div class="item" style="width: 25%">
          <span class="title">制单人：</span>
          <div class="box">
            <el-input v-model="query.createdBy" placeholder=""></el-input>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: 15px; position: relative">
        <div class="item" style="width: 25%">
          <span class="title">应收客户名称：</span>
          <div class="box">
            <el-select
              v-model="query.custTaxcode"
              style="width: 100%"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="item" style="width: 25%; position: absolute; left: 400px">
          <span class="title">应收单据日期：</span>
          <div class="box">
            <el-date-picker
              v-model="value2"
              value-format="yyyy-MM-dd"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>

        <div class="item" style="width: 30%; position: absolute; left: 900px">
          <span class="title">应收单据编码：</span>
          <div
            class="box"
            style="
              display: flex;
              flex-decration: row;
              align-items: center;
              justify-content: space-between;
            "
          >
            <el-input
              v-model="query.docNum1"
              size="small"
              placeholder=""
            ></el-input>
            <span style="margin: 0 20px">至</span>
            <el-input
              v-model="query.docNum2"
              size="small"
              placeholder=""
            ></el-input>
          </div>
        </div>

        <div
          style="
            display: flex;
            flex-decration: row;
            position: absolute;
            right: 0px;
          "
        >
          <el-button icon="el-icon-search" circle @click="search()"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delOriginal()"
          ></el-button>
        </div>
      </div>

      <!-- 用户确认按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="triggerFather(false)">取 消</el-button>
        <el-button type="primary" @click="leadinSystem()">引入平台</el-button>
        <el-button type="warning" plain @click="bulk()">批量提交</el-button>
      </div>

      <el-table
        ref="multipleTable"
        v-loading="isLoading"
        :data="originalHeads"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="docNum"
          label="应收单据"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="custName"
          label="应收客户名称"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="docDate"
          label="应收日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="zamountHswc"
          label="含税净金额"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="zamountWswc"
          label="未税净金额"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="zamountSewc"
          label="净税额"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createdBy"
          label="制单人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="invoiceType"
          label="发票类型"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="kpfdzdh"
          label="客户订单号"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>

      <div style="position: absolute; left: 10px; bottom: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="showDrawer"
      direction="rtl"
      size="30%"
      :with-header="false"
    >
      <div style="margin: 20px 15px">
        注意：最终结果请进入
        <a
          href="/#/list"
          target="_blank"
          style="color: #1890ff; text-decoration: underline"
        >
          开票查询
        </a>
        查看
      </div>
      <el-table :data="tasks">
        <el-table-column
          property="originalHead.docNum"
          label="源单据编号"
          width="150"
        ></el-table-column>
        <el-table-column property="msg" label="进度"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getOriginalHead,
    getOriginalBody,
    insertInvoice,
    customerList,
    toDelOriginal,
    toSubmit,
  } from '@/api/zhys'
  import { toMerge, toSplitLine } from '@/utils/zhys'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showDrawer: false,
        query: {
          createdBy: '',
          custTaxcode: '',
          docDateEnd: '',
          docDateStart: '',
          docNum1: '',
          docNum2: '',
        },
        queryCondition: {},
        isLoading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        value2: '',
        options: [],
        page: {
          total: null,
          currentPage: 1,
          pageSize: 8,
        },
        originalHeads: [],
        originalHead: null,
        originalBodys: [],
        selection: [],
        originalNos: '',
        tasks: [],
        orgs: [
          {
            value: '1000',
            label: '1000',
          },
          {
            value: '2000',
            label: '2000',
          },
        ],
        org: '2000',
      }
    },
    computed: {
      dialogFormVisible() {
        return this.$props.show
      },
    },
    watch: {
      show: {
        handler(newVal, oldVal) {
          if (newVal) {
            for (var name in this.query) {
              this.query[name] = ''
            }
            this.queryCondition = {}
            this.value2 = null

            this.gainOriginalHead(
              this.page.currentPage,
              this.page.pageSize,
              this.queryCondition
            )
          }
        },
        deep: true,
        immediate: true,
      },
      value2: {
        handler(newVal, oldVal) {
          if (newVal) {
            console.log(JSON.stringify(newVal[0]))
            this.query.docDateStart = JSON.stringify(newVal[0])
            this.query.docDateEnd = JSON.stringify(newVal[1])
          } else {
            this.query.docDateStart = ''
            this.query.docDateEnd = ''
            this.queryCondition.docDateStart = ''
            this.queryCondition.docDateEnd = ''
          }
        },
        deep: true,
      },
      query: {
        handler(newVal, oldVal) {
          this.queryCondition = {}
          for (var name in newVal) {
            if (newVal[name]) {
              this.queryCondition[name] = newVal[name]
            }
          }
        },
        deep: true,
      },
    },
    created() {
      this.queryCustomList()
    },

    methods: {
      async gainOriginalHead(pageNum, pageSize, datas) {
        this.isLoading = true
        let { data } = await getOriginalHead(pageNum, pageSize, datas)
        if (!data) {
          return
        }
        if (data.code == 1) {
          console.log('import success!')
          // this.$message.error(data.msg);
          this.originalHeads = data.data.rows
          this.page.total = data.data.total
          this.page.currentPage = pageNum
          console.log(this.page)
        } else {
          if (data.msg) {
            this.$message.error(data.msg)
          } else {
            this.$message.error(data)
          }
        }
        console.log(data)
        this.isLoading = false
      },
      triggerFather(val) {
        this.$emit('change', val)
      },
      handleClose() {
        this.triggerFather(false)
      },
      pageChange(val) {
        this.page.currentPage = val
        this.gainOriginalHead(
          this.page.currentPage,
          this.page.pageSize,
          this.queryCondition
        )
      },
      async leadinSystem() {
        if (this.selection == null || this.selection.length == 0) {
          this.$message.error('你尚未选中引入的行！')
        } else if (this.selection.length == 1) {
          let { data } = await getOriginalBody(
            "'" + this.selection[0].docNum + "'"
          )
          this.originalHead = this.selection[0]
          if (data.code == 1) {
            // this.$message.error(data.msg);
            this.originalBodys = data.data

            // 显示在原始单据中，清空单据合并和分组数据
            this.$store.commit('OriginalHead', this.originalHead)
            this.$store.state.invoiceHead.originalBodys = this.originalBodys

            //保存原始单据到原始单据表中
            var invoiceHead = JSON.parse(
              JSON.stringify(this.$store.state.invoiceHead)
            )
            for (var name in this.originalHead) {
              invoiceHead[name] = this.originalHead[name]
            }

            invoiceHead.docNum = null
            invoiceHead.originalNos = "'" + this.originalHead.docNum + "'"
            invoiceHead.invoiceOriginalLines = this.originalBodys

            // console.log(JSON.stringify(this.$store.state.invoiceHead));
            let { data: msg } = await insertInvoice(invoiceHead)
            if (msg.code != 1) {
              this.$message.error('Error:' + msg.msg)
            } else {
              if (msg.data.success == false) {
                this.$message.error('Error:' + msg.data.msg)
              } else {
                // 保存后返回的数据
                this.$store.commit('InvoiceHead', msg.data.data)
                this.$store.state.invoiceHead.originalNos =
                  "'" + this.originalHead.docNum + "'"
                var org = {
                  docNum: null,
                  orgName: null,
                  docDate: null,
                  userName: null,
                  checkName: null,
                }
                for (var name in org) {
                  org[name] = msg.data[name]
                }
                // 清除单据分组和合并的数据
                this.$store.state.invoiceHead.invoiceMergefLines = []
                this.$store.state.invoiceHead.invoiceSplitLines = []
                this.$store.commit('Org', org)
                this.$store.state.tabs.activeName = 'first'
                this.triggerFather(false)
                this.$message.success('引入单据成功!')
              }
            }
            //保存

            // console.log(JSON.stringify(invoiceHead));
          } else {
            if (data.msg) {
              this.$message.error(data.msg)
            } else {
              this.$message.error(data)
            }
          }
        } else {
          // ==||---判断引入的数据是否相同
          if (this.$store.state.config.isMutiLeading != '1') {
            this.$message.error(
              '当前系统配置不允许多单引入,既是客户相同。如有必要，请自行去系统配置修改！'
            )
            return
          }

          var n = 0
          for (var i = 0; i < this.selection.length; i++) {
            if (
              this.selection[i].custTaxcode == this.selection[0].custTaxcode
            ) {
              n++
            }
          }
          if (n != this.selection.length) {
            this.$message.error('请选择相同的应收客户,再引入平台！')
            this.triggerFather(false)
            return
          }

          this.originalHead = JSON.parse(JSON.stringify(this.selection[0]))

          for (var i = 0; i < this.selection.length; i++) {
            let { data } = await getOriginalBody(
              "'" + this.selection[i].docNum + "'"
            )

            this.handlerOriginalBodys(data, i)
          }

          // 重新定义行号
          var docLine = 1001
          for (var i = 0; i < this.originalBodys.length; i++) {
            this.originalBodys[i].docLine = docLine + i
          }

          this.originalHead.docNum = this.originalNos
          //保存原始单据到原始单据表中
          var invoiceHead = JSON.parse(
            JSON.stringify(this.$store.state.invoiceHead)
          )
          for (var name in this.originalHead) {
            invoiceHead[name] = this.originalHead[name]
          }

          invoiceHead.docNum = null
          invoiceHead.originalBodys = null
          invoiceHead.originalNos = this.originalNos
          invoiceHead.invoiceOriginalLines = this.originalBodys

          // console.log(JSON.stringify(this.$store.state.invoiceHead));
          let { data: msg } = await insertInvoice(invoiceHead)
          if (msg.code != 1) {
            this.$message.error('Error:' + msg.msg)
          } else {
            if (msg.data.success == false) {
              this.$message.error('Error:' + msg.data.msg)
            } else {
              // 保存后返回的数据
              this.$store.commit('InvoiceHead', msg.data.data)
              this.$store.state.invoiceHead.originalNos = this.originalNos
              var org = {
                docNum: null,
                orgName: null,
                docDate: null,
                userName: null,
                checkName: null,
              }
              for (var name in org) {
                org[name] = msg.data[name]
              }
              // 清除单据分组和合并的数据
              this.$store.state.invoiceHead.invoiceMergefLines = []
              this.$store.state.invoiceHead.invoiceSplitLines = []
              this.$store.commit('Org', org)
              this.$store.state.tabs.activeName = 'first'
              this.triggerFather(false)
              this.$message.success('引入单据成功!')
            }
          }
        }
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      handlerOriginalBodys(data, i) {
        if (data.code == 1) {
          // this.$message.error(data.msg);
          if (i == 0) {
            this.originalBodys = []
          }
          this.originalBodys = this.originalBodys.concat(data.data)

          // 显示在原始单据中，清空单据合并和分组数据
          this.$store.commit('OriginalHead', this.originalHead)
          this.$store.state.invoiceHead.originalBodys = this.originalBodys

          if (i == 0) {
            this.originalNos = "'" + this.selection[i].docNum + "'"
          } else {
            this.originalNos += ",'" + this.selection[i].docNum + "'"
          }

          //保存

          // console.log(JSON.stringify(invoiceHead));
        } else {
          if (data.msg) {
            this.$message.error(data.msg)
          } else {
            this.$message.error(data)
          }
        }
      },
      async queryCustomList() {
        let { data } = await customerList()
        if (data.data && data.data.length > 0) {
          this.options = []
          for (var i = 0; i < data.data.length; i++) {
            var item = {
              value: '',
              label: '',
            }
            item.value = data.data[i].taxNo
            item.label = data.data[i].customerName
            this.options.push(item)
          }
        }
      },
      search() {
        this.gainOriginalHead(
          this.page.currentPage,
          this.page.pageSize,
          this.queryCondition
        )
      },
      async delOriginal() {
        if (!this.selection || this.selection.length <= 0) {
          this.$message.error('请选择要删除的单据！')
          return
        }

        for (var i = 0; i < this.selection.length; i++) {
          var item = this.selection[i]
          let { data } = await toDelOriginal(item.docNum)
          if (data.data.success) {
            this.$message.success('删除源单据号:' + item.docNum + '成功!')
            this.gainOriginalHead(
              this.page.currentPage,
              this.page.pageSize,
              this.queryCondition
            )
          } else {
            this.$message.error(data.data.msg)
          }
        }
      },
      async autoSubmitItem(item) {
        // 引入平台操作=====================================================================
        item.msg = '正在引入平台'
        let { data } = await getOriginalBody(
          "'" + item.originalHead.docNum + "'"
        )
        if (data.code == 1) {
          // this.$message.error(data.msg);
          item.originalBodys = data.data
          //保存原始单据到原始单据表中
          var invoiceHead = JSON.parse(
            JSON.stringify(this.$store.state.invoiceHead)
          )
          for (var name in item.originalHead) {
            invoiceHead[name] = item.originalHead[name]
          }
          invoiceHead.docNum = null
          invoiceHead.originalNos = "'" + item.originalHead.docNum + "'"
          invoiceHead.invoiceOriginalLines = item.originalBodys

          // console.log(JSON.stringify(this.$store.state.invoiceHead));
          let { data: msg } = await insertInvoice(invoiceHead)
          if (msg.code != 1) {
            item.msg = 'Error:' + msg.msg
          } else {
            if (msg.data.success == false) {
              item.msg = 'Error:' + msg.data.msg
            } else {
              // 保存后返回的数据
              item.invoiceHead = msg.data.data
              item.invoiceHead.originalNos =
                "'" + item.originalHead.docNum + "'"

              item.msg = '引入平台完成'
            }
          }
          //保存

          // console.log(JSON.stringify(invoiceHead));
        } else {
          if (data.msg) {
            item.msg = data.msg
          } else {
            item.msg = data
          }
        }

        // 正在进行单据合并=====================================================================
        item.msg = '正在进行单据合并'
        if (
          !item.invoiceHead ||
          !item.invoiceHead.invoiceOriginalLines ||
          item.invoiceHead.invoiceOriginalLines.length <= 0
        ) {
          item.msg = '开票数据有误,已终止'
          return
        }
        //获取原始单据表数据的全部元素
        var sortDataArrayCr = item.invoiceHead.invoiceOriginalLines.slice(0)
        //获取合并方式
        var orderChoose = this.$store.state.config.mergefType
        //执行单据合并逻辑
        let result = toMerge(sortDataArrayCr, orderChoose)
        //保存数据
        item.invoiceHead.invoiceMergefLines = result
        var saveData = {
          custIdBill: null,
          custName: null,
          invoiceType: null,
          custTaxcode: null,
          custTelephone: null,
          mergefType: null,
          mergeAmt: null,
          custAddress: null,
          custBankname: null,
          custBankaccount: null,
          zamountHswc: null,
          zamountWswc: null,
          zamountSewc: null,
          checkName: null,
          payeeName: null,
          billRemark: null,
          invoiceOriginalLines: [],
          invoiceMergefLines: [],
          invoiceSplitLines: [],
          docNum: null,
          originalNos: null,
        }

        for (var name in saveData) {
          saveData[name] = item.invoiceHead[name]
        }
        // console.log("检验保存的数据");
        // console.log(JSON.stringify(saveData));
        let { data: msg } = await insertInvoice(saveData)
        if (msg.code != 1) {
          item.msg = 'Error:' + msg.msg
        } else {
          if (msg.data.success == false) {
            item.msg = 'Error:' + msg.data.msg
          } else {
            // 保存后返回的数据
            item.invoiceHead = msg.data.data
            item.invoiceHead.originalNos = "'" + item.originalHead.docNum + "'"
            item.msg = '单据合并成功'
          }
        }

        // 开票分组===============================================================
        item.msg = '正在进行开票分组'
        if (
          !item.invoiceHead.invoiceMergefLines ||
          item.invoiceHead.invoiceMergefLines.length <= 0
        ) {
          item.msg = '单据合并数据异常'
          return
        }

        // 检测税收分类编码是否为空，为空不能进行开票分组
        let isExistNull = false
        let invoiceMergefLines = item.invoiceHead.invoiceMergefLines
        for (var i = 0; i < invoiceMergefLines.length; i++) {
          if (!invoiceMergefLines[i].taxCatecode) {
            isExistNull = true
          }
        }
        if (isExistNull) {
          item.msg = '税收分类编码为空，不能进行开票分组！！'
          return
        }

        let splines = toSplitLine(
          invoiceMergefLines,
          item.invoiceHead.goldtaxCode,
          item.invoiceHead.goldtaxNum,
          this.$store.state.config.mergeAmt,
          this.$store.state.config.orgTaxexceed,
          this.$store.state.config.invoiceList
        )
        //保存数据
        item.invoiceHead.invoiceSplitLines = splines
        saveData = {
          custIdBill: null,
          custName: null,
          invoiceType: null,
          custTaxcode: null,
          custTelephone: null,
          mergefType: null,
          mergeAmt: null,
          custAddress: null,
          custBankname: null,
          custBankaccount: null,
          zamountHswc: null,
          zamountWswc: null,
          zamountSewc: null,
          checkName: null,
          payeeName: null,
          billRemark: null,
          invoiceOriginalLines: [],
          invoiceMergefLines: [],
          invoiceSplitLines: [],
          docNum: null,
          originalNos: null,
        }

        for (var name in saveData) {
          saveData[name] = item.invoiceHead[name]
        }
        // console.log("检验保存的数据");
        // console.log(JSON.stringify(saveData));
        let { data: msg1 } = await insertInvoice(saveData)
        if (msg1.code != 1) {
          item.msg = 'Error:' + msg1.msg
        } else {
          if (msg1.data.success == false) {
            item.msg = 'Error:' + msg1.data.msg
          } else {
            // 保存后返回的数据
            item.invoiceHead = msg1.data.data
            item.invoiceHead.originalNos = "'" + item.originalHead.docNum + "'"
            item.msg = '开票分组成功'
          }
        }

        // 正在进行提交=================================================================
        //红票校验
        var val = item.invoiceHead.invoiceRedReqm //选中的值
        if (val == '11') {
          var hong = item.invoiceHead.invoiceRedXxbm
          if (!hong) {
            item.msg = '购方红字需要填写红字申请单号'
            return
          }
        } else if (
          val == '21' ||
          val == '22' ||
          val == '121' ||
          val == '122' ||
          val == '123' ||
          val == '124'
        ) {
          var lanCode = item.invoiceHead.invoiceRedFpdm
          var lanNum = item.invoiceHead.invoiceRedFphm
          if (!lanCode || !lanNum) {
            item.msg = '销方红字需要填写蓝字发票号码和代码'
            return
          }
        } else {
        }
        //  非空检验
        if (
          !item.invoiceHead.invoiceOriginalLines ||
          item.invoiceHead.invoiceOriginalLines.length <= 0
        ) {
          item.msg = '发票数据有误'
          return
        }
        if (
          !item.invoiceHead.invoiceMergefLines ||
          item.invoiceHead.invoiceMergefLines.length <= 0
        ) {
          item.msg = '单据合并数据有误'
          return
        }
        if (
          !item.invoiceHead.invoiceSplitLines ||
          item.invoiceHead.invoiceSplitLines.length <= 0
        ) {
          item.msg = '开票分组数据有误'
          return
        }
        // 提交数据
        saveData = {
          custIdBill: null,
          custName: null,
          invoiceType: null,
          custTaxcode: null,
          custTelephone: null,
          mergefType: null,
          mergeAmt: null,
          custAddress: null,
          custBankname: null,
          custBankaccount: null,
          zamountHswc: null,
          zamountWswc: null,
          zamountSewc: null,
          checkName: null,
          payeeName: null,
          billRemark: null,
          invoiceOriginalLines: [],
          invoiceMergefLines: [],
          invoiceSplitLines: [],
          docNum: null,
          originalNos: null,
        }

        for (var name in saveData) {
          saveData[name] = item.invoiceHead[name]
        }

        let { data: msg2 } = await toSubmit(saveData)
        if (msg2.code != 1) {
          item.msg = 'Error:' + msg2.msg
        } else {
          if (msg2.data.success == false) {
            item.msg = 'Error:' + msg2.data.msg
          } else {
            // 保存后返回的数据
            item.invoiceHead = msg2.data.data
            item.invoiceHead.originalNos = "'" + item.originalHead.docNum + "'"
            item.msg = '提交成功'
            this.$message.success(
              '源单据:' + item.originalHead.docNum + '提交成功'
            )
          }
        }
      },
      bulk() {
        this.$alert(
          '批量合并方式:' +
            this.$store.state.config.mergefType +
            '<br>' +
            '批量拆分金额:' +
            this.$store.state.config.mergeAmt +
            '<br>' +
            '批量发票限额:' +
            this.$store.state.config.orgTaxexceed +
            '<br>' +
            '是否采用默认清单开票:' +
            (this.$store.state.config.invoiceList == 'false' ? '否' : '是') +
            '<br><br>如需要，请进入' +
            "<a style='color: #1890ff; text-decoration: underline;' href='/#/config'>系统配置</a>" +
            '修改',
          '确认计算基础',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定执行',

            callback: (action) => {
              if (action == 'confirm') {
                // 匹配数据
                if (!this.selection || this.selection.length <= 0) {
                  this.$message.error('你尚未选中行！😟')
                  return
                }
                this.$message.success(
                  '批量提交成功，请进入任务队列查看进度！😄'
                )
                this.tasksBulk()
              } else {
                this.$message.info('用户放弃了操作')
              }
            },
          }
        )
      },
      tasksBulk() {
        this.tasks = []
        for (var i = 0; i < this.selection.length; i++) {
          var item = {
            originalHead: null,
            originalBodys: null,
            invoiceHead: null,
            msg: '排队中',
          }
          item.originalHead = this.selection[i]
          this.tasks.push(item)
        }
        // 打开任务队列框
        this.showDrawer = true
        // 执行
        for (var i = 0; i < this.tasks.length; i++) {
          this.autoSubmitItem(this.tasks[i])
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    // background-color: green;

    .item {
      // background-color: red;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .title {
        text-align: right;
        min-width: 110px;
      }
      .box {
        width: 100% !important;
      }
    }
  }
</style>
