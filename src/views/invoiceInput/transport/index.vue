<template>
  <div class="trafficInvoice">
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
    //  name: 'traffic-invoice',
    name: 'Transport',
    data() {
      return {
        tableSetting: {
          // url: 'https://xcx.ft-link.cn/cj/activity-api/page', // 请求路径
          isSearch: {
            searchProp: 'queryString1',
            placeholder: '请输入 发票代码/发票号码',
          }, // 搜索框字段设置。
          checkBox: true, // 是否有选择框  选择回调事件为selectChange
          checkBoxFixed: true, // 选择框列是否固定
          showOpera: true, // 是否有操作列（编辑、删除）
          operaFixed: true, // 是否固定操作列（编辑、删除）
          operaSetting: [
            // 根据type判断是什么类型的事件，type为唯一，color：primary，success，info，warning，danger
            { type: 'watch', color: 'primary', icon: 'el-icon-search' },
            { type: 'delete', color: 'danger', icon: 'el-icon-delete' },
          ],
          rowStyle: {
            prop: 'isChange',
            value: '0',
            style: 'font-weight:bold;color:#F56C6C',
          }, // 设置特殊行
          tbstyle: 'width: 100%', // 列表的样式
          isShowSum: false, // 是否显示总计
          showPagination: true, // 是否显示分页
          currentPage: 1, // 当前页码
          pageSizes: [20, 50, 100], // 每页显示集合
          pageSize: 20, // 当前 每页显示数量
          total: 1, // 总数据
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
              prop: 'name',
              label: '乘客姓名/销方名称',
              width: '180',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                if (row.name) {
                  result = row.name
                } else {
                  result = row.kpfmc
                }
                return result
              },
            },
            {
              prop: 'fplx',
              label: '出行类型',
              width: '120',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.fplx) {
                  case '10503':
                    result = '火车票'
                    break
                  case '10505':
                    result = '汽车票'
                    break
                  case '10506':
                    result = '飞机票'
                    break
                  case '10507':
                    result = '过路过桥费'
                    break
                  case '10102':
                    result = '客运类电子普票'
                    break
                }
                if (row.isChange === '0') {
                  return result + '(已修改)'
                } else {
                  return result
                }
              },
            },
            {
              prop: 'dkje',
              label: '抵扣金额',
              width: '100',
              isfixed: false,
              align: 'right',
              formatter: (row, column) => {
                if (!row.dkje) {
                  return '0.00'
                } else {
                  return row.dkje.toFixed(2)
                }
              },
            },
            // {
            //   prop: 'hjse',
            //   label: '税额',
            //   width: '100',
            //   isfixed: false,
            //   align: 'right',
            //   formatter: (row, column) => {
            //     if (!row.hjse) {
            //       return '0.00'
            //     } else {
            //       return row.hjse
            //     }
            //   }
            // },
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
              label: '票据日期',
              width: '110',
              isfixed: false,
            },
            {
              prop: 'createTime',
              label: '收票时间',
              width: '110',
              isfixed: false,
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
                return result
              },
            },
            {
              prop: 'rzState',
              label: '申报状态',
              width: '80',
              isfixed: false,
              formatter: (row, state) => {
                let result = ''
                switch (row.rzState) {
                  case '1':
                    result = '初始状态'
                    break
                  case '2':
                    result = '待申报'
                    break
                  case '3':
                    result = '已申报'
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
          httpData: { specialType: 'dl_kyfp' }, // 请求初始参数
        },
        seniorSearchSet: {
          // 高级筛选内容设置
          fplx: [
            { lable: '火车票', val: '10503' },
            { lable: '汽车票', val: '10505' },
            { lable: '飞机票', val: '10506' },
            { lable: '客运类电子普票', val: '10102' },
          ],
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
            { lable: '待申报', val: '2' },
            { lable: '已申报', val: '3' },
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
  .trafficInvoice
    height 100%
</style>
