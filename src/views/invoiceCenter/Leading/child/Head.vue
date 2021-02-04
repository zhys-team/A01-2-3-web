<template>
  <div>
    <ul>
      <li @click="show.dialog = true">引入开票数据</li>
      <li @click="merge()">单据合并</li>
      <li @click="splitLine()">开票分组</li>
      <li @click="subInvoice()">提交开票</li>
      <li @click="cancelCommit()">撤销提交</li>
      <li @click="abolishAll()">整单作废</li>
      <li @click="replayAll()">整单重开</li>
      <li @click="cancelAbolishAll()">撤销整单作废</li>
      <li @click="abolishGroups()">分组作废</li>
      <li @click="cancelAbolishGroups()">撤销分组作废</li>
      <!-- <li @click="replayGroup()">分组重开</li> -->
      <li @click="del()">删除</li>
    </ul>

    <Dialog :show="show.dialog" @change="changeDialog"></Dialog>
  </div>
</template>

<script>
  import { toMerge, toSplitLine } from '@/utils/zhys'
  import {
    delLeadingInvoice,
    insertInvoice,
    toSubmit,
    toCancelCommit,
    toAbolishAll,
    toAbolishGroup,
    toCancelAbolishAll,
    toCancelAbolishGroup,
  } from '@/api/zhys'
  import Dialog from './Dialog'
  export default {
    components: { Dialog },
    data() {
      return {
        show: {
          dialog: false,
        },
      }
    },
    methods: {
      changeDialog(val) {
        this.show.dialog = val
      },
      async merge() {
        //单据合并

        if (
          !this.$store.state.invoiceHead ||
          !this.$store.state.invoiceHead.invoiceOriginalLines ||
          this.$store.state.invoiceHead.invoiceOriginalLines.length <= 0
        ) {
          this.$message.error('请先引入开票数据！！')
          return
        }
        //获取原始单据表数据的全部元素
        var sortDataArrayCr = this.$store.state.invoiceHead.invoiceOriginalLines.slice(
          0
        )
        //获取合并方式
        var orderChoose = this.$store.state.invoiceHead.mergefType
        //执行单据合并逻辑
        let result = toMerge(sortDataArrayCr, orderChoose)
        //保存数据
        this.$store.state.invoiceHead.invoiceMergefLines = result
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
          saveData[name] = this.$store.state.invoiceHead[name]
        }
        // console.log("检验保存的数据");
        // console.log(JSON.stringify(saveData));
        let { data: msg } = await insertInvoice(saveData)

        this.handleResult(msg, '单据合并成功!', 'second')
        // 清除分组数据
        this.$store.state.invoiceHead.invoiceSplitLines = null
      },
      async del() {
        if (
          this.$store.state.invoiceHead != null &&
          this.$store.state.invoiceHead.docNum
        ) {
          await delLeadingInvoice(this.$store.state.invoiceHead.docNum)
          //  清空数据
          this.$store.commit('InvoiceHead', {})
          this.$store.commit('Org', {})
          this.$message.success('删除成功，可以重新引入了！')
        } else {
          this.$message.error('请先引入开票数据！！')
        }
      },
      async splitLine() {
        if (
          !this.$store.state.invoiceHead.invoiceMergefLines ||
          this.$store.state.invoiceHead.invoiceMergefLines.length <= 0
        ) {
          this.$message.error('请先完成单据合并！！')
          return
        }

        // 检测税收分类编码是否为空，为空不能进行开票分组
        let isExistNull = false
        let invoiceMergefLines = this.$store.state.invoiceHead
          .invoiceMergefLines
        for (var i = 0; i < invoiceMergefLines.length; i++) {
          if (!invoiceMergefLines[i].taxCatecode) {
            isExistNull = true
          }
        }
        if (isExistNull) {
          this.$message.error('税收分类编码为空，不能进行开票分组！！')
          return
        }

        console.log('开票分组-算法执行')
        console.log(invoiceMergefLines)
        let splines = toSplitLine(
          invoiceMergefLines,
          this.$store.state.invoiceHead.goldtaxCode,
          this.$store.state.invoiceHead.goldtaxNum,
          this.$store.state.invoiceHead.mergeAmt,
          this.$store.state.invoiceHead.orgTaxexceed,
          this.$store.state.invoiceHead.invoiceList
        )
        console.log('开票分组-保存数据')
        //保存数据 -----------------------------------------------
        this.$store.state.invoiceHead.invoiceSplitLines = splines
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
          saveData[name] = this.$store.state.invoiceHead[name]
        }
        // console.log("检验保存的数据");
        // console.log(JSON.stringify(saveData));
        let { data: msg } = await insertInvoice(saveData)
        this.handleResult(msg, '单据分组成功!', 'split')
      },
      async subInvoice() {
        //红票校验
        var val = this.$store.state.invoiceHead.invoiceRedReqm //选中的值
        if (val == '11') {
          var hong = this.$store.state.invoiceHead.invoiceRedXxbm
          if (!hong) {
            this.$message.error('购方红字需要填写红字申请单号！')
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
          var lanCode = this.$store.state.invoiceHead.invoiceRedFpdm
          var lanNum = this.$store.state.invoiceHead.invoiceRedFphm
          if (!lanCode || !lanNum) {
            this.$message.error('销方红字需要填写蓝字发票号码和代码！')
            return
          }
        } else {
        }
        //  非空检验
        if (
          !this.$store.state.invoiceHead.invoiceOriginalLines ||
          this.$store.state.invoiceHead.invoiceOriginalLines.length <= 0
        ) {
          this.$message.error('请先引入发票数据！')
          return
        }
        if (
          !this.$store.state.invoiceHead.invoiceMergefLines ||
          this.$store.state.invoiceHead.invoiceMergefLines.length <= 0
        ) {
          this.$message.error('请先进行单据合并！')
          return
        }
        if (
          !this.$store.state.invoiceHead.invoiceSplitLines ||
          this.$store.state.invoiceHead.invoiceSplitLines.length <= 0
        ) {
          this.$message.error('请先进行开票分组！')
          return
        }
        // 提交数据
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
          saveData[name] = this.$store.state.invoiceHead[name]
        }

        let { data: msg } = await toSubmit(saveData)
        this.handleResult(msg, '提交成功', 'split')
      },
      async cancelCommit() {
        if (
          !this.$store.state.invoiceHead ||
          !this.$store.state.invoiceHead.invoiceSplitLines ||
          this.$store.state.invoiceHead.invoiceSplitLines.length <= 0
        ) {
          this.$message.error('尚未分组，无需撤销，但可以删除！')
          return
        }

        if (
          this.$store.state.invoiceHead.docStatus == 2 ||
          this.$store.state.invoiceHead == 9
        ) {
          this.$message.error('金税已经开票或已经作废，不能撤销！')
          return
        }
        let { data: msg } = await toCancelCommit(
          this.$store.state.invoiceHead.docNum
        )
        this.handleResult(msg, '撤销成功', 'split')
      },
      handleResult(result, successMsg, activeName) {
        var msg = result
        if (msg.code != 1) {
          this.$message.error('Error:' + msg.msg)
        } else {
          if (msg.data.success == false) {
            this.$message.error('Error:' + msg.data.msg)
          } else {
            // 保存后返回的数据
            this.$store.commit('InvoiceHead', msg.data.data)
            this.$store.state.invoiceHead.originalNos =
              "'" + this.$store.state.originalHead.docNum + "'"
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
            this.$store.commit('Org', org)
            // 切换页签
            this.$store.state.tabs.activeName = activeName
            this.$message.success(successMsg)
          }
        }
      },
      async abolishAll() {
        // 检查数据，整单作废，只针对组状态和单据状态都为2的操作
        let invoiceHead = this.$store.state.invoiceHead
        if (!invoiceHead || !invoiceHead.docStatus) {
          this.$message.error('请先引入单据！')
          return
        }
        if (invoiceHead.docStatus != 2) {
          this.$message.error('只有金税已经开票状态才能进行作废操作！')
          return
        }
        let splitLines = invoiceHead.invoiceSplitLines
        var isOpend = true
        for (var i = 0; i < splitLines.length; i++) {
          if (splitLines[i].groupStatus != 2) {
            isOpend = false
            break
          }
        }
        if (!isOpend) {
          this.$message.error(
            '有部分组并未完成开票或已经是作废状态，不能进行整单作废操作！'
          )
          return
        }
        // 整单作废了
        let { data } = await toAbolishAll(invoiceHead.docNum)
        this.handleResult(data, '提交整单作废成功', 'split')
      },
      async cancelAbolishAll() {
        let invoiceHead = this.$store.state.invoiceHead
        if (!invoiceHead || !invoiceHead.docStatus) {
          this.$message.error('请先引入单据！')
          return
        }
        if (invoiceHead.docStatus != 3) {
          this.$message.error('只有金税已经作废状态才能进行撤销操作！')
          return
        }

        let splitLines = invoiceHead.invoiceSplitLines
        var isAllAbolished = true
        for (var i = 0; i < splitLines.length; i++) {
          if (splitLines[i].groupStatus != 3) {
            isAllAbolished = false
            break
          }
        }
        if (!isAllAbolished) {
          this.$message.error(
            '有部分组并未是作废状态，不能进行整单撤销作废操作！'
          )
          return
        }

        // 整单作废了
        let { data } = await toCancelAbolishAll(invoiceHead.docNum)
        this.handleResult(data, '撤销整单作废成功', 'split')
      },
      async replayAll() {
        //检测金税是否已经开票
        let invoiceHead = this.$store.state.invoiceHead
        if (!invoiceHead || !invoiceHead.docStatus) {
          this.$message.error('请先引入单据！')
          return
        }

        if (
          !invoiceHead.invoiceSplitLines ||
          invoiceHead.invoiceSplitLines.length <= 0
        ) {
          this.$message.error('此单据没有分组数据，异常单据，不支持重开！')
          return
        }

        //判断 单据 状态 是9 ，组状态都为 9
        if (invoiceHead.docStatus != 9) {
          this.$message.error('此单据不是作废状态，不能重开')
          return
        } else {
          let isExistNotZuofei = false
          for (var i = 0; i < invoiceHead.invoiceSplitLines.length; i++) {
            if (invoiceHead.groupStatus != 9) {
              isExistNotZuofei = true
              break
            }
          }

          if (isExistNotZuofei) {
            this.$message.error(
              '此单据分组数据尚未作废，不能执行整单作废状态！'
            )
            return
          }
        }

        let splitLines = invoiceHead.invoiceSplitLines
        var isOpend = true
        for (var i = 0; i < splitLines.length; i++) {
          if (splitLines[i].groupStatus != 2) {
            isOpend = false
            break
          }
        }

        if (!isOpend) {
          this.$message.error('有部分组并未是已经开票状态，不能进行重开操作！')
          return
        }

        // 清空发票代码和发票号码
        this.$store.state.invoiceHead.goldtaxCode = ''
        this.$store.state.invoiceHead.goldtaxNum = ''

        this.$store.state.invoiceHead.billDate = ''
        this.$store.state.invoiceHead.billGdate = ''
        this.$store.state.invoiceHead.cancelDate = ''
        this.$store.state.invoiceHead.cancelGdate = ''
        this.$store.state.invoiceHead.invoiceRedXxbm = ''
        this.$store.state.invoiceHead.invoiceRedFpdm = ''
        this.$store.state.invoiceHead.invoiceRedFphm = ''

        this.$store.state.invoiceHead.invoiceMergefLines = []
        this.$store.state.invoiceHead.invoiceSplitLines = []

        // 让单据状态变成0，单据号码置为null
        this.$store.state.invoiceHead.docStatus = 0
        this.$store.state.invoiceHead.docNum = null

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
          saveData[name] = this.$store.state.invoiceHead[name]
        }

        // 保存生成新的单据号
        let { data: msg } = await insertInvoice(saveData)

        this.handleResult(msg, '单据合并成功!', 'second')
      },
      replayGroup() {},
      async abolishGroups() {
        if (this.$store.state.selection.isAllSelected) {
          this.$message.error('全选的话 请你选择整单作废！')
          return
        }
        //校验选取
        let selection = this.$store.state.selection.invoiceSplitLines
        if (!selection || selection.length <= 0) {
          this.$message.error('你尚未选中行！')
          return
        }
        let isAllOpened = true
        for (var i = 0; i < selection.length; i++) {
          if (selection[i].groupStatus != 2) {
            iisAllOpened = false
            break
          }
        }
        if (!isAllOpened) {
          this.$message.error('所选区域存在尚未完成开票的组！')
          return
        }

        //  分组作废
        for (var i = 0; i < selection.length; i++) {
          let { data } = await toAbolishGroup(
            selection[i].docNum,
            selection[i].groupNum
          )
          this.handleResult(
            data,
            '单据号:' +
              selection[i].docNum +
              ',组号:' +
              selection[i].groupNum +
              '作废成功',
            'split'
          )
        }
      },
      async cancelAbolishGroups() {
        if (this.$store.state.selection.isAllSelected) {
          this.$message.error('全选的话 请你选择撤销整单作废！')
          return
        }
        //校验选取
        let selection = this.$store.state.selection.invoiceSplitLines
        if (!selection || selection.length <= 0) {
          this.$message.error('你尚未选中行！')
          return
        }
        var isAllAbolished = true
        for (var i = 0; i < selection.length; i++) {
          if (selection[i].groupStatus != 3) {
            isAllAbolished = false
            break
          }
        }
        if (!isAllAbolished) {
          this.$message.error('所选区域存在未提交作废的组！')
          return
        }

        //  分组撤销
        for (var i = 0; i < selection.length; i++) {
          let { data } = await toCancelAbolishGroup(
            selection[i].docNum,
            selection[i].groupNum
          )
          this.handleResult(
            data,
            '单据号:' +
              selection[i].docNum +
              ',组号:' +
              selection[i].groupNum +
              '撤销成功',
            'split'
          )
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  ul {
    height: 40px;
    line-height: 40px;
    list-style: none;
    display: flex;
    flex-direction: row;
    // background-color: red;
    font-size: 14px;
    li {
      padding: 0px 20px;
      cursor: default;
    }
  }
</style>
