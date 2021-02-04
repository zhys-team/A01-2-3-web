<template>
  <tree-obj
    ref="treeObj"
    :options="treeSetting"
    :itemData="itemInfo"
    @handleNodeClick="nodeClick"
    @handleNodeEdit="nodeEdit"
    @handleNodeAdd="nodeAdd"
    @handleNodeRemove="nodeRemove"
  ></tree-obj>
</template>

<script>
  import treeObj from '@/base/treeObj/treeObj'
  export default {
    name: 'TaxClassify',
    components: { treeObj },
    mounted() {
      this.businessSort()
    },
    data() {
      return {
        treeSetting: {
          treehttpUrl: this.$ihttp + '/rateCode/queryList', // 树请求地址
          treehttpParams: {}, // 树请求参数
          treeTitle: '税收分类树', // 树标题
          sbKey: 'parentId', // 对应关系字段
          props: {
            // 树设置
            label: 'rateName',
            children: 'children',
            isLeaf: 'isLast',
          },
          accordion: true, // 点击当前行是否关闭其他行
          isSearch: { name: 'rateName', placeholder: '请输入税收分类名称' }, // 搜索字段
          detailViews: {
            // 详情视图设置
            input: [
              // input 内容
              {
                label: '税收分类名称',
                placeholder: '',
                pro: 'rateName',
                disabled: true,
              },
              {
                label: '税收分类简称',
                placeholder: '',
                pro: 'jc',
                disabled: true,
              },
              {
                label: '税收分类编码',
                placeholder: '',
                pro: 'code',
                disabled: true,
              },
            ],
            cascader: [
              { label: '默认业务事项', pro: 'businessMatterId', options: [] },
            ], // cascader内容
            // radio: [ // radio内容
            //   {label: '是否最末级', pro: 'isLast', options: [{label: '1', name: '否'}, {label: '0', name: '是'}]}
            // ]
          },
          addRule: {
            rateName: {
              required: true,
              message: '请输入税收分类名称',
              trigger: 'blur',
            },
            jc: {
              required: true,
              message: '请输入税收分类简称',
              trigger: 'blur',
            },
            code: {
              required: true,
              message: '请输入税收分类编码',
              trigger: 'blur',
            },
          },
        },
        itemInfo: {},
        bussinessArr: [],
      }
    },
    methods: {
      businessSort() {
        let _this = this
        _this.axios
          .post(_this.$ihttp + '/businessMatters/queryList', {})
          .then((res) => {
            let arr = _this.sortData(res.data.data)
            _this.treeSetting.detailViews.cascader[0].options = arr
            _this.$store.dispatch('setbussinessData', res.data.data)
            _this.bussinessArr = res.data.data
          })
          .catch((rev) => {
            console.error(rev)
            _this.$message({
              message: '初始费用类别数据失败！',
              type: 'error',
            })
          })
      },
      sortData(arr) {
        let levelOne = arr.filter((item) => {
          item['value'] = item.id
          item['label'] = item.name
          return item.parentId === 0
        })
        levelOne.forEach((item) => {
          if (item.isLast === '1') {
            item['children'] = []
            arr.forEach((jitm) => {
              if (jitm.parentId === item.id) {
                item['children'].push(jitm)
              }
            })
          }
        })
        console.log(levelOne)
        return levelOne
      },
      nodeClick(data, node) {
        console.log(this.$store.state.bussinessData)
        let _this = this
        _this.axios
          .get(_this.$ihttp + '/rateCode/info/' + data.id, {})
          .then((res) => {
            let s = res.data.data
            console.log(s)
            if (s) {
              s['businessMatterId'] = _this.businessCgVal(s.businessMatterId)
              _this.itemInfo = s
            } else {
              _this.$message({
                message: '查询【' + data.name + '】失败！',
                type: 'error',
              })
            }
            _this.$refs.treeObj.itemLoadClose()
          })
          .catch((rev) => {
            // _this.loading = false
            console.error(rev)
            _this.$message({
              message: '查询【' + data.name + '】数据失败！',
              type: 'error',
            })
            _this.$refs.treeObj.itemLoadClose()
          })
      },
      nodeEdit(form) {
        let _this = this
        let param = JSON.parse(JSON.stringify(form))
        let Cid = _this.businessCgArr(param.businessMatterId, 'c')
        let Fid = _this.businessCgArr(param.businessMatterId, 'f')
        param.businessMatterName = _this.bussinessXzVal(Cid)
        param.dl = _this.bussinessXzVal(Fid)
        param.dlId = Fid
        param.businessMatterId = Cid
        param.icon = _this.bussinessIcon(Fid)
        console.log(param)
        _this
          .$confirm(
            '是否修改【' + param.rateName + '】的税收分类类别？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
          .then(() => {
            _this.axios
              .post(_this.$ihttp + '/rateCode/save', param)
              .then((res) => {
                let s = res.data.data
                console.log(s)
                if (s) {
                  _this.$message({
                    message: '修改【' + param.rateName + '】成功！',
                    type: 'success',
                  })
                } else {
                  _this.$message({
                    message: '修改【' + param.rateName + '】失败！',
                    type: 'error',
                  })
                }
              })
              .catch((rev) => {
                console.error(rev)
                _this.$message({
                  message: '修改【' + param.rateName + '】数据失败！',
                  type: 'error',
                })
              })
          })
          .catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消修改',
            })
          })
      },
      nodeAdd(form) {
        let _this = this
        let param = form
        let Cid = _this.businessCgArr(param.businessMatterId, 'c')
        let Fid = _this.businessCgArr(param.businessMatterId, 'f')
        param.businessMatterName = _this.bussinessXzVal(Cid)
        param.dl = _this.bussinessXzVal(Fid)
        param.dlId = Fid
        param.businessMatterId = Cid
        param.icon = _this.bussinessIcon(Fid)
        _this.axios
          .post(_this.$ihttp + '/rateCode/save', param)
          .then((res) => {
            let s = res.data.data
            console.log(s)
            if (s) {
              _this.$message({
                message: '添加【' + param.rateName + '】成功！',
                type: 'success',
              })
              _this.$refs.treeObj.treeRefrsh()
            } else {
              _this.$message({
                message: '添加【' + param.rateName + '】失败！',
                type: 'error',
              })
            }
          })
          .catch((rev) => {
            console.error(rev)
            _this.$message({
              message: '添加【' + param.rateName + '】数据失败！',
              type: 'error',
            })
          })
      },
      nodeRemove(form) {
        let _this = this
        let param = JSON.parse(JSON.stringify(form))
        _this
          .$confirm(
            '是否删除【' + param.rateName + '】的税收分类类别及其子集？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
          .then(() => {
            _this.axios
              .get(_this.$ihttp + '/rateCode/del/' + param.id)
              .then((res) => {
                _this.$message({
                  message: '删除【' + param.rateName + '】成功！',
                  type: 'success',
                })
                _this.$refs.treeObj.treeRefrsh()
              })
              .catch((rev) => {
                console.error(rev)
                _this.$message({
                  message: '删除【' + param.rateName + '】数据失败！',
                  type: 'error',
                })
              })
          })
          .catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      businessCgVal(val) {
        let arr = this.$store.state.bussinessData.filter((item) => {
          return item.id === val
        })
        let result = []
        if (arr.length === 0) {
          result = []
        } else {
          result = [arr[0].parentId, val]
        }
        console.log(result)
        return result
      },
      businessCgArr(arr, type) {
        let result = ''
        if (arr.length !== 0) {
          if (type === 'f') {
            result = arr[0]
          } else {
            result = arr[1]
          }
        }
        return result
      },
      bussinessXzVal(val) {
        let result = this.bussinessArr.find(function (item) {
          return item.id === val
        })
        return result.name
      },
      bussinessIcon(val) {
        let result = this.bussinessArr.find(function (item) {
          return item.id === val
        })
        return result.icon
      },
    },
  }
</script>

<style scoped></style>
