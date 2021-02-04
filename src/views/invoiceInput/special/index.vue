<template>
  <div class="receiveInvoice">
    <invoice-model
      :option="tableSetting"
      :seniorSearch="seniorSearchSet"
    ></invoice-model>
  </div>
</template>

<script>
  import InvoiceModel from '@/pages/invoiceModel/invoiceModel'
  export default {
    components: { InvoiceModel },
    // name: 'receive-invoice',
    name: 'Special',
    data() {
      return {
        tableSetting: {
          // url: 'https://xcx.ft-link.cn/cj/activity-api/page', // 请求路径
          isSearch: {
            searchProp: 'queryString1',
            placeholder: '请输入 发票代码/发票号码/销售方名称',
          }, // 搜索框字段设置。
          checkBox: true, // 是否有选择框  选择回调事件为selectChange
          showOpera: true, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          operaSetting: [
            // 根据type判断是什么类型的事件，type为唯一，color：primary，success，info，warning，danger
            { type: 'watch', color: 'primary', icon: 'el-icon-search' },
            { type: 'delete', color: 'danger', icon: 'el-icon-delete' },
          ],
          tbstyle: 'width: 100%', // 列表的样式
          pageSize: 20, // 初始每页显示数据量
          pageSizes: [20, 50, 100], // 每页显示集合
          th: [
            // 表哥表头设置
            {
              prop: 'fphm', // 字段名
              label: '发票号码', // 显示名称
              width: '120', // 宽度
              isfixed: false, // 是否固定列
              align: 'left', // 是否居中（center），靠左（left），靠右（right）默认靠左
            },
            {
              prop: 'fpdm',
              label: '发票代码',
              width: '150',
              isfixed: false,
            },
            {
              prop: 'kpfmc',
              label: '销方名称',
              width: '260',
              isfixed: false,
            },
            {
              prop: 'kpfsbh',
              label: '销方税号',
              width: '200',
              isfixed: false,
            },
            {
              prop: 'hjje',
              label: '未税金额',
              width: '100',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.hjje) {
                  return '0.00'
                } else {
                  return row.hjje
                }
              },
            },
            {
              prop: 'hjse',
              label: '税额',
              width: '100',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.hjse) {
                  return '0.00'
                } else {
                  return row.hjse
                }
              },
            },
            {
              prop: 'kpje',
              label: '开票金额',
              width: '100',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.kpje) {
                  return '0.00'
                } else {
                  return row.kpje
                }
              },
            },
            {
              prop: 'kprq',
              label: '开票日期',
              width: '120',
              isfixed: false,
            },
            {
              prop: 'createTime',
              label: '收票日期',
              width: '120',
              isfixed: false,
            },
            {
              prop: 'fplx',
              label: '发票类型',
              width: '120',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.fplx) {
                  case '10100':
                    result = '专用发票'
                    break
                  case '10107':
                    result = '通行费电子发票'
                    break
                }
                return result
              },
            },
            // {
            //   prop: 'rzState',
            //   label: '签收状态',
            //   width: '80',
            //   isfixed: false,
            //   formatter: (row, column) => {
            //     let result = ''
            //     switch (row.rzState) {
            //       case '1':
            //       default:
            //         result = '未签收'
            //         break
            //       case '2':
            //       case '3':
            //       case '4':
            //         result = '已签收'
            //         break
            //     }
            //     return result
            //   }
            // },
            {
              prop: 'reimburseNo',
              label: '报销单号',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'bxState',
              label: '核销状态',
              width: '80',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.bxState) {
                  case '0':
                    result = '未核销'
                    break
                  case '1':
                    result = '进行核销或核销完毕'
                    break
                }
                // switch (row.bxState) {
                //   case '1' :
                //   default:
                //     result = '未核销'
                //     break
                //   case '2' :
                //     result = '已️签收'
                //     break
                //   case '3':
                //     result = '已核销'
                //     break
                //   case '4':
                //     result = '已支付'
                //     break
                // }
                return result
              },
            },
            {
              prop: 'rzState',
              label: '认证状态',
              width: '80',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.rzState) {
                  case '1':
                    result = '初始状态'
                    break
                  case '2':
                    result = '待认证'
                    break
                  case '2.5':
                    result = '认证中'
                    break
                  case '3':
                    result = '已认证'
                    break
                  case '3.5':
                    result = '撤销中'
                    break
                  case '4':
                    result = '已转出'
                    break
                }
                return result
              },
            },
            {
              prop: 'kjdkq',
              label: '会计抵扣期',
              width: '100',
              isfixed: false,
            },
            // {
            //   prop: 'jzState',
            //   label: '记账状态',
            //   width: '80',
            //   isfixed: false,
            //   formatter: (row, state) => {
            //     let result = ''
            //     switch (row.jzState) {
            //       case '0':
            //         result = '未记账'
            //         break
            //       case '1':
            //         result = '已记账'
            //         break
            //     }
            //     return result
            //   }
            // },
            {
              prop: 'openId',
              label: '提交人',
              width: '100',
              isfixed: false,
            },
            {
              prop: 'orgId',
              label: '组织',
              width: '100',
              isfixed: false,
            },
            // {
            //   prop: 'procMan',
            //   label: '提交部门',
            //   width: '120',
            //   isfixed: false
            // }
          ], // 表头设置参数
          tableData: [],
          rowStyle: {
            prop: 'isChange',
            value: '0',
            style: 'font-weight:bold;color:#F56C6C',
          }, // 设置特殊行
          httpData: { specialType: 'dl_zptz' }, // 请求初始参数
        },
        seniorSearchSet: {
          // 高级筛选内容设置
          fplx: [{ lable: '专用发票', val: '10100' }], // , {lable: '通行费电子发票', val: '10107'}, {lable: 'chux发票', val: '10107'}
          createTime: { placeholder: '请选择收票日期', type: 'date' },
          kprq: { placeholder: '请选择开票日期', type: 'date' },
          kjTime: { placeholder: '请选择会计抵扣期', type: 'month' },
          bxState: [
            { lable: '全部', val: '' },
            { lable: '未核销', val: '0' },
            { lable: '进行核销或核销完毕', val: '1' },
          ],
          rzState: [
            { lable: '全部', val: '' },
            { lable: '初始状态', val: '1' },
            { lable: '待认证', val: '2' },
            { lable: '认证中', val: '2.5' },
            { lable: '已认证', val: '3' },
            { lable: '撤销中', val: '3.5' },
            { lable: '已转出', val: '4' },
          ],
          // spState: [{lable: '全部', val: ''}, {lable: '未签收', val: '10'}, {lable: '已签收', val: '20'}],
          // jzState: [{lable: '全部', val: ''}, {lable: '未记账', val: '0'}, {lable: '已记账', val: '1'}]
        },
        multipleSelection: [], // 勾选行集合
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .receiveInvoice
    height 100%
</style>
