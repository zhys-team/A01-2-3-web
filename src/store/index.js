import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

let state = {
  // a02本来想模块化的，但是莫名其妙遇到问题，算了=====================================
  invoiceHead: {
    invoiceMergefLines: null,
    invoiceOriginalLines: null, //这是保存之后的原始单据号
    invoiceSplitLines: null,
  },
  config: {
    isMutiLeading: '0',
    mergeAmt: 1,
    orgTaxexceed: 1000,
    mergefType: '3',
    invoiceList: 'true',
  },
  originalHead: null, //这是引入平台的头和体
  org2: {
    docNum: null,
    orgName: null,
    docDate: null,
    userName: null,
    checkName: null,
  },
  tabs: {
    activeName: null,
  },
  selection: {
    invoiceSplitLines: null,
  },

  // a01==========================================================================
  progress: 100,
  counter: 0,
  views: {
    console: '控制台',
    teach: '教程',
    org: '组织管理',
    users: '用户管理',
  },
  pages: {
    editableTabsValue: '', //当前标签的name值
    editableTabs: [],
  },
  business: {
    orgId: '2000',
    orgMachine: '00',
  },
  logs: [],
  org: null,
  orgs: null,
}
let mutations = {
  // a02
  InvoiceHead: (state, invoiceHead) => {
    state.invoiceHead = invoiceHead
  },
  OriginalHead: (state, originalHead) => {
    state.originalHead = originalHead
  },
  Org2: (state, org2) => {
    state.org2 = org2
  },
  Tabs: (state, tabs) => {
    state.tabs = tabs
  },
  Config: (state, config) => {
    state.config = config
  },
  Selection: (state, selection) => {
    state.selection = selection
  },

  // a01
  setPages(state, pages) {
    state.pages = pages
  },
  setOrgs(state, orgs) {
    state.orgs = orgs
  },
  setOrg(state, org) {
    state.org = org
  },
}

const store = new Vuex.Store({
  modules,
  state,
  mutations,
})
// Vue.prototype.$store = store
export default store
