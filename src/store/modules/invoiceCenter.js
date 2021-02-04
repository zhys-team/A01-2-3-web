// //下面是我自己写的state
// const state = {
//   invoiceHead: {
//     invoiceMergefLines: null,
//     invoiceOriginalLines: null, //这是保存之后的原始单据号
//     invoiceSplitLines: null,
//   },
//   config: {
//     isMutiLeading: '0',
//     mergeAmt: 1,
//     orgTaxexceed: 1000,
//     mergefType: '3',
//     invoiceList: 'true',
//   },
//   originalHead: null, //这是引入平台的头和体
//   org2: {
//     docNum: null,
//     orgName: null,
//     docDate: null,
//     userName: null,
//     checkName: null,
//   },
//   tabs: {
//     activeName: null,
//   },
//   selection: {
//     invoiceSplitLines: null,
//   },
// }

// const getters = {
//   invoiceHead: (state) => state.invoiceHead,
//   config: (state) => state.config,
//   originalHead: (state) => state.originalHead,
//   org2: (state) => state.org2,
//   tabs: (state) => state.tabs,
//   selection: (state) => state.selection,
// }

// const mutations = {
//   InvoiceHead: (state, invoiceHead) => {
//     state.invoiceHead = invoiceHead
//   },
//   OriginalHead: (state, originalHead) => {
//     state.originalHead = originalHead
//   },
//   Org2: (state, org2) => {
//     state.org2 = org2
//   },
//   Tabs: (state, tabs) => {
//     state.tabs = tabs
//   },
//   Config: (state, config) => {
//     state.config = config
//   },
//   Selection: (state, selection) => {
//     state.selection = selection
//   },
// }

// const actions = {
//   invoiceHead({ commit, state }, data) {
//     commit('InvoiceHead', data)
//   },
// }

// export default { state, mutations, actions, getters }

// // const store = new Vuex.Store({
// //   modules,
// //   getters,
// //   state,
// //   mutations,
// //   actions
// // })

// // export default store
export default {}
