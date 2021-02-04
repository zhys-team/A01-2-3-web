/**
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/invoiceService',
  },

  {
    path: '/invoiceCenter',
    component: Layout,
    redirect: '/invoiceCenter/Leading',
    name: 'invoiceCenter',
    meta: { title: '集中开票管理', icon: 'feather-alt' },
    children: [
      {
        path: '/invoiceCenter/Leading',
        name: 'Leading',
        component: () => import('@/views/invoiceCenter/Leading'),
        meta: { title: '引入平台', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceCenter/report',
        name: 'Report',
        meta: { title: '报表查询', icon: 'dharmachakra' },
        component: () => import('@/views/invoiceCenter/report/index'), // Parent router-view
        children: [
          {
            path: '/invoiceCenter/report/invoiceQuery',
            name: 'InvoiceQuery',
            component: () =>
              import('@/views/invoiceCenter/report/invoiceQuery'),
            meta: {
              title: '开票查询',
              noKeepAlive: false,
              icon: 'feather-alt',
            },
          },
          {
            path: '/invoiceCenter/report/invoiceList',
            name: 'InvoiceList',
            component: () => import('@/views/invoiceCenter/report/invoiceList'),
            meta: {
              title: '发票清单',
              noKeepAlive: false,
              icon: 'feather-alt',
            },
          },
          {
            path: '/invoiceCenter/report/descrepancy',
            name: 'Descrepancy',
            component: () => import('@/views/invoiceCenter/report/descrepancy'),
            meta: {
              title: '差异报告',
              noKeepAlive: false,
              icon: 'feather-alt',
            },
          },
          {
            path: '/invoiceCenter/report/invoiceSummary',
            name: 'InvoiceSummary',
            component: () =>
              import('@/views/invoiceCenter/report/invoiceSummary'),
            meta: {
              title: '开票汇总',
              noKeepAlive: false,
              icon: 'feather-alt',
            },
          },
        ],
      },
    ],
  },

  {
    path: '/invoiceService',
    component: Layout,
    redirect: '/invoiceService/Console',
    name: 'invoiceService',
    meta: { title: '开票服务管理', icon: 'feather-alt' },
    children: [
      {
        path: '/invoiceService/Console',
        name: 'Console',
        component: () => import('@/views/invoiceService/Console'),
        meta: { title: '控制台', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceService/InvoiceQuery',
        name: 'InvoiceQuery',
        component: () => import('@/views/invoiceService/InvoiceQuery'),
        meta: { title: '发票查询', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceService/fileSystem',
        name: 'FileSystem',
        component: () => import('@/views/invoiceService/FileSystem'),
        meta: { title: '文件系统', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceService/Medical',
        name: 'Medical',
        component: () => import('@/views/invoiceService/Medical'),
        meta: { title: '体检中心', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceService/sets',
        name: 'PersonnelManagement',
        meta: { title: '系统设置', icon: 'dharmachakra' },
        component: () => import('@/views/invoiceService/sets/index'), // Parent router-view
        children: [
          {
            path: '/invoiceService/sets/user',
            name: 'User',
            component: () => import('@/views/invoiceService/sets/Users'),
            meta: {
              title: '用户管理',
              noKeepAlive: false,
              icon: 'user-injured',
            },
          },
          {
            path: '/invoiceService/sets/org',
            name: 'Org',
            component: () => import('@/views/invoiceService/sets/Orgz'),
            meta: { title: '组织管理', noKeepAlive: false, icon: 'dungeon' },
          },
        ],
      },
    ],
  },

  {
    path: '/purchase',
    component: Layout,
    redirect: '/purchase/accountCheck',
    name: 'Purchase',
    meta: { title: '采购收票协同', icon: 'feather-alt' },
    children: [
      {
        path: '/purchase/accountCheck',
        name: 'AccountCheck',
        component: () => import('@/views/purchase/accountCheck'),
        meta: { title: '对账管理', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/purchase/invoiceRelation',
        name: 'InvoiceRelation',
        component: () => import('@/views/purchase/invoiceRelation'),
        meta: { title: '发票关联', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/purchase/directInvoice',
        name: 'DirectInvoice',
        component: () => import('@/views/purchase/directInvoice'),
        meta: { title: '直连开票', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/purchase/descrepancy',
        name: 'Descrepancy2',
        component: () => import('@/views/purchase/descrepancy'),
        meta: { title: '差异报告', noKeepAlive: false, icon: 'feather-alt' },
      },
    ],
  },

  {
    path: '/invoiceInput',
    component: Layout,
    redirect: '/invoiceInput/special',
    name: 'InvoiceInput',
    meta: { title: '进项台账管理', icon: 'feather-alt' },
    children: [
      {
        path: '/invoiceInput/special',
        name: 'Special',
        component: () => import('@/views/invoiceInput/special'),
        meta: { title: '专票台账', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/transport',
        name: 'Transport',
        component: () => import('@/views/invoiceInput/transport'),
        meta: { title: '客运台账', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/expenses',
        name: 'Expenses',
        component: () => import('@/views/invoiceInput/expenses'),
        meta: { title: '费用台账', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/overseas',
        name: 'Overseas',
        component: () => import('@/views/invoiceInput/overseas'),
        meta: { title: '海关缴款书', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/vehicle',
        name: 'Vehicle',
        component: () => import('@/views/invoiceInput/vehicle'),
        meta: { title: '机动车台账', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/invoiceReview',
        name: 'InvoiceReview',
        component: () => import('@/views/invoiceInput/invoiceReview'),
        meta: { title: '发票复查', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/checkLog',
        name: 'CheckLog',
        component: () => import('@/views/invoiceInput/checkLog'),
        meta: {
          title: '发票查验日志',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceInput/doubtful',
        name: 'Doubtful',
        component: () => import('@/views/invoiceInput/doubtful'),
        meta: { title: '疑票处理', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/invoiceInput/inputSummary',
        name: 'InputSummary',
        component: () => import('@/views/invoiceInput/inputSummary'),
        meta: {
          title: '进项台账汇总',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceInput/inputSummaryExport',
        name: 'InputSummaryExport',
        component: () => import('@/views/invoiceInput/inputSummaryExport'),
        meta: {
          title: '进项台账汇总导出',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
    ],
  },

  {
    path: '/invoiceDeduct',
    component: Layout,
    redirect: '/invoiceDeduct/checkCertification',
    name: 'InvoiceDeduct',
    meta: { title: '集中认证管理', icon: 'feather-alt' },
    children: [
      {
        path: '/invoiceDeduct/checkCertification',
        name: 'CheckCertification',
        component: () => import('@/views/invoiceDeduct/checkCertification'),
        meta: {
          title: '发票勾选认证',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceDeduct/declaration',
        name: 'Declaration',
        component: () => import('@/views/invoiceDeduct/declaration'),
        meta: {
          title: '客运发票申报',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceDeduct/deductExport',
        name: 'DeductExport',
        component: () => import('@/views/invoiceDeduct/deductExport'),
        meta: {
          title: '认证发票转出',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceDeduct/deductSummary',
        name: 'DeductSummary',
        component: () => import('@/views/invoiceDeduct/deductSummary'),
        meta: {
          title: '认证汇总台账',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/invoiceDeduct/deductLog',
        name: 'DeductLog',
        component: () => import('@/views/invoiceDeduct/deductLog'),
        meta: {
          title: '发票认证日志',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
    ],
  },

  {
    path: '/taxAccounting',
    component: Layout,
    redirect: '/taxAccounting/inputExportSummary',
    name: 'InvoiceDeduct',
    meta: { title: '增值税核算管理', icon: 'feather-alt' },
    children: [
      {
        path: '/taxAccounting/inputExportSummary',
        name: 'InputExportSummary',
        component: () => import('@/views/taxAccounting/inputExportSummary'),
        meta: {
          title: '进项转出汇总',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/taxAccounting/inputTaxAdd',
        name: 'InputTaxAdd',
        component: () => import('@/views/taxAccounting/inputTaxAdd'),
        meta: {
          title: '进项税加计',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/taxAccounting/noRefund',
        name: 'NoRefund',
        component: () => import('@/views/taxAccounting/noRefund'),
        meta: {
          title: '免抵退管理',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/taxAccounting/taxDrawback',
        name: 'TaxDrawback',
        component: () => import('@/views/taxAccounting/taxDrawback'),
        meta: {
          title: '一般退税管理',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/taxAccounting/extraTax',
        name: 'ExtraTax',
        component: () => import('@/views/taxAccounting/extraTax'),
        meta: {
          title: '附加税计提',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/taxAccounting/stampTax',
        name: 'StampTax',
        component: () => import('@/views/taxAccounting/stampTax'),
        meta: {
          title: '印花税计提',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
    ],
  },

  {
    path: '/declarationForm',
    component: Layout,
    redirect: '/declarationForm/formMaintain',
    name: 'DeclarationForm',
    meta: { title: '申报表管理', icon: 'feather-alt' },
    children: [
      {
        path: '/declarationForm/formMaintain',
        name: 'FormMaintain',
        component: () => import('@/views/declarationForm/formMaintain'),
        meta: { title: '报表维护', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/declarationForm/formConfirm',
        name: 'FormConfirm',
        component: () => import('@/views/declarationForm/formConfirm'),
        meta: { title: '报表确认', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/declarationForm/formFinancialImport',
        name: 'FormFinancialImport',
        component: () => import('@/views/declarationForm/formFinancialImport'),
        meta: {
          title: '财务报表导入',
          noKeepAlive: false,
          icon: 'feather-alt',
        },
      },
      {
        path: '/declarationForm/socialInsuranceFee',
        name: 'SocialInsuranceFee',
        component: () => import('@/views/declarationForm/socialInsuranceFee'),
        meta: { title: '社保费导入', noKeepAlive: false, icon: 'feather-alt' },
      },
      {
        path: '/declarationForm/formStamp',
        name: 'FormStamp',
        component: () => import('@/views/declarationForm/formStamp'),
        meta: { title: '印花税报表', noKeepAlive: false, icon: 'feather-alt' },
      },
    ],
  },

  {
    path: '/systemConfig',
    component: Layout,
    redirect: '/systemConfig/basicData',
    name: 'SystemConfig',
    meta: { title: '系统配置', icon: 'feather-alt' },
    children: [
      {
        path: '/systemConfig/basicData',
        name: 'BasicData',
        meta: { title: '基础数据管理', icon: 'dharmachakra' },
        component: () => import('@/views/systemConfig/basicData/index'), // Parent router-view
        children: [
          {
            path: '/systemConfig/basicData/user',
            name: 'User',
            component: () => import('@/views/systemConfig/basicData/user'),
            meta: {
              title: '用户管理',
              noKeepAlive: false,
              icon: 'user-injured',
            },
          },
          {
            path: '/systemConfig/basicData/org',
            name: 'Org',
            component: () => import('@/views/systemConfig/basicData/org'),
            meta: { title: '组织管理', noKeepAlive: false, icon: 'dungeon' },
          },
          {
            path: '/systemConfig/basicData/permission',
            name: 'Permission',
            component: () =>
              import('@/views/systemConfig/basicData/permission'),
            meta: { title: '权限管理', noKeepAlive: false, icon: 'dungeon' },
          },
        ],
      },
      {
        path: '/systemConfig/sell',
        name: 'Sell',
        meta: { title: '销方主数据管理', icon: 'dharmachakra' },
        component: () => import('@/views/systemConfig/sell/index'), // Parent router-view
        children: [
          {
            path: '/systemConfig/sell/item',
            name: 'Item',
            component: () => import('@/views/systemConfig/sell/item'),
            meta: {
              title: '物料维护',
              noKeepAlive: false,
              icon: 'user-injured',
            },
          },
          {
            path: '/systemConfig/sell/custom',
            name: 'Custom',
            component: () => import('@/views/systemConfig/sell/custom'),
            meta: { title: '客户管理', noKeepAlive: false, icon: 'dungeon' },
          },
          {
            path: '/systemConfig/sell/invoice',
            name: 'Invoice',
            component: () => import('@/views/systemConfig/sell/invoice'),
            meta: { title: '开票配置', noKeepAlive: false, icon: 'dungeon' },
          },
        ],
      },
      {
        path: '/systemConfig/input',
        name: 'Input',
        meta: { title: '进项主数据管理', icon: 'dharmachakra' },
        component: () => import('@/views/systemConfig/input/index'), // Parent router-view
        children: [
          {
            path: '/systemConfig/input/taxPolicy',
            name: 'TaxPolicy',
            component: () => import('@/views/systemConfig/input/taxPolicy'),
            meta: {
              title: '计税政策管理',
              noKeepAlive: false,
              icon: 'user-injured',
            },
          },
          {
            path: '/systemConfig/input/inputRules',
            name: 'InputRules',
            component: () => import('@/views/systemConfig/input/inputRules'),
            meta: {
              title: '收票规则管理',
              noKeepAlive: false,
              icon: 'dungeon',
            },
          },
          {
            path: '/systemConfig/input/expenseCategory',
            name: 'ExpenseCategory',
            component: () =>
              import('@/views/systemConfig/input/expenseCategory'),
            meta: {
              title: '费用类别设置',
              noKeepAlive: false,
              icon: 'dungeon',
            },
          },
          {
            path: '/systemConfig/input/taxClassify',
            name: 'TaxClassify',
            component: () => import('@/views/systemConfig/input/taxClassify'),
            meta: {
              title: '税收分类设置',
              noKeepAlive: false,
              icon: 'dungeon',
            },
          },
        ],
      },
    ],
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },

  {
    path: '/update',
    component: Layout,
    redirect: '/update/log',
    name: 'PersonnelManagement',
    meta: { title: '更新日志', icon: 'feather-alt' },
    children: [
      {
        path: '/update/log',
        name: 'User',
        component: () => import('@/views/update/log'),
        meta: { title: '更新日志', noKeepAlive: false, icon: 'feather-alt' },
      },
    ],
  },
]

const router = new VueRouter({
  base: routerMode === 'history' ? publicPath : '',
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === 'history' ? publicPath : '',
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
