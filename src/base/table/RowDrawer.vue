<template>
  <el-drawer
    :title="'发票详情'"
    :visible.sync="selfDrawer"
    :direction="direction"
    v-loading="loading"
    :before-close="handleClose"
    size="auto">
    <div class="btnForm">
      <div class="fp_all">
        <div class="fp_con">
          <div class="fp_con_title">{{invoiceType(selfOption.fplx)}}</div>
          <div class="fp_con_list m-top-xs">
            <div class="fp_con_list_dtl">
              <span>发票代码:</span>
              <span class="font_color">{{selfOption.fpdm}}</span>
            </div>
            <div class="fp_con_list_dtl">
              <span>发票号码:</span>
              <span class="font_color">{{selfOption.fphm}}</span>
            </div>
            <div class="fp_con_list_dtl">
              <span>开票日期:</span>
              <span class="font_color">{{selfOption.kprq}}</span>
            </div>
            <div class="fp_con_list_dtl">
              <span>校验码:</span>
              <span class="font_color">{{selfOption.jym}}</span>
            </div>
            <div class="fp_con_list_dtl">
              <span>机器编号:</span>
              <span class="font_color">{{selfOption.jqbh}}</span>
            </div>
          </div>
          <div style="clear: both;"></div>
          <!--发票中间内容开始-->
          <div class="fp_con_tab">
            <!--第一大行：购买方、密码区-->
            <div class="fp_tab_tr1">
              <table cellspacing="0">
                <tr>
                  <td rowspan="4" class="smtd">购买方</td>
                  <td class="fttd"><label>名称</label></td>
                  <td class="pttd1 font_color">{{selfOption.spfmc}}</td>
                  <td rowspan="4" class="smtd">密码区</td>
                  <td rowspan="4" class="pttdlas border_btm"><label></label></td>
                </tr>
                <tr>
                  <td class="fttd"><label>纳税人识别号</label></td>
                  <td class="font_color">{{selfOption.spfsbh}}</td>
                </tr>
                <tr>
                  <td class="fttd"><label>地址、电话</label></td>
                  <td class="font_color">{{selfOption.spfdzdh}}</td>
                </tr>
                <tr>
                  <td class="fttd"><label>开户行及账号</label></td>
                  <td class="font_color">{{selfOption.spfyhzh}}</td>
                </tr>
              </table>
            </div>
            <!--第二大行：明细、合计-->
            <div class="fp_tab_tr2">
              <table style="width: 100%;" cellspacing="0">
                <thead>
                <tr>
                  <td>货物或应税劳务、服务名称</td>
                  <td>规格型号</td>
                  <td>单位</td>
                  <td>数量</td>
                  <td>单价</td>
                  <td>金额</td>
                  <td>税率</td>
                  <td>税额</td>
                </tr>
                </thead>
                <tbody id="hwmx">
                <tr v-for="item in invoiceMsg" v-bind:key="item.id">
                  <td class="font_color">{{item.hwmc}}</td>
                  <td class="font_color">{{item.ggxh}}</td>
                  <td class="font_color">{{item.dw}}</td>
                  <td class="numstyle font_color">{{item.sl}}</td>
                  <td class="font_color">{{item.dj}}</td>
                  <td class="numstyle font_color">{{item.je}}</td>
                  <td class="numstyle font_color">{{item.slv}}</td>
                  <td class="numstyle font_color">{{item.se}}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td class="font_c">合计</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="numstyle font_color">{{selfOption.hjje}}</td>
                  <td class="numstyle font_color"></td>
                  <td class="numstyle font_color">{{selfOption.hjse}}</td>
                </tr>
                <tr>
                  <td class="font_c">价税合计（大写）</td>
                  <td colspan="4" class="font_color">&otimes;{{DX(selfOption.kpje)}}</td>
                  <td colspan="3" class="font_color">{{selfOption.kpje}}</td>
                </tr>
                </tfoot>
              </table>
            </div>
            <!--第三大行：销售费、备注-->
            <div class="fp_tab_tr1">
              <table cellspacing="0">
                <tr>
                  <td rowspan="4" class="smtd">销售方</td>
                  <td class="fttd"><label>名称</label></td>
                  <td class="pttd1 font_color">{{selfOption.kpfmc}}</td>
                  <td rowspan="4" class="smtd" >备注</td>
                  <td rowspan="4" class="pttdlas border_btm"><span>{{selfOption.mark}}</span></td>
                </tr>
                <tr>
                  <td class="fttd"><label>纳税人识别号</label></td>
                  <td class="font_color">{{selfOption.kpfsbh}}</td>
                </tr>
                <tr>
                  <td class="fttd"><label>地址、电话</label></td>
                  <td class="font_color">{{selfOption.kpfdzdh}}</td>
                </tr>
                <tr>
                  <td class="fttd"><label>开户行及账号</label></td>
                  <td class="font_color">{{selfOption.kpfyhzh}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'ReceRowDrawer',
  props: [ 'drawer', 'option' ],
  watch: {
    drawer (newValue) {
      this.selfDrawer = newValue
    },
    option: {
      handler (val, oldVal) {
        this.selfOption = JSON.parse(JSON.stringify(val))
        this.getInMsg(val.id)
      },
      deep: true
    }
  },
  data () {
    return {
      direction: 'btt',
      selfDrawer: this.drawer,
      selfOption: this.option,
      invoiceMsg: [],
      loading: false
    }
  },
  methods: {
    handleClose (done) { // 关闭
      done()
      this.close()
    },
    close () { // 关闭
      this.selfDrawer = false
      this.$emit('handleClose')
    },
    DX (n) { // 数字转化成中文大写字母
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return '非法字符串'
      }
      let unit = '千百拾亿千百拾万千百拾元角分'
      let str = ''
      n += '00'
      let p = n.indexOf('.')
      if (p >= 0) {
        n = n.substring(0, p) + n.substr(p + 1, 2)
      }
      unit = unit.substr(unit.length - n.length)
      for (let i = 0; i < n.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
      }
      return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
    },
    getInMsg (mid) { // 获取发票信息
      let _this = this
      _this.loading = true
      _this.axios.get(_this.$ihttp + '/invoiceBodys/lists/' + mid).then(
        res => {
          if (res.data.data) {
            let arr = res.data.data
            if (arr.length < 8) {
              while (arr.length < 8) {
                let item = {
                  hwmc: '',
                  ggxh: '',
                  dw: '',
                  sl: '',
                  dj: '',
                  je: '',
                  slv: '',
                  se: ''
                }
                arr.push(item)
              }
            } else {
              arr = arr.filter((item, index) => {
                return index < 8
              })
            }
            _this.invoiceMsg = arr
          }
          _this.loading = false
        }).catch(rev => {
        _this.loading = false
        _this.$message({
          message: rev.data.message,
          type: 'error'
        })
      })
    },
    invoiceType (val) {
      let result = '未知票据'
      switch (val) {
        case '10100':
          result = '增值税专用发票'
          break
        case '10101':
          result = '增值税普通发票'
          break
        case '10102':
          result = '增值税普通发票电票'
          break
        case '10103':
          result = '增值税普通发票卷票'
          break
      }
      return result
    }
  }
}
</script>

<style scoped>
  .btnForm {
    height:570px;
    max-height:570px;
    overflow-y:auto;
    padding:0 20px;
    padding-bottom:60px;
  }
  .fp_all{
     width: 100%;
     font-size: 13px;
     color: #666;
  }
  .fp_title{
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #6B6B6B;
  }
  .fp_msg{
    background-color: rgba(60, 139, 206, 0.8);
    padding: 6px;
    text-align: right;
  }
  .fp_msg .fp_msg_con{
    float: left;
    font-size: 15px;
    color: #fff;
    margin-right: 25px;
    margin-top: 5px;
  }
  .fp_msg .fp_msg_con span{
    margin: 2px 3px;
  }
  .fp_msg .btn{
    padding: 5px 20px;
  }
  .fp_con{
    width: 100%;
  }
  .fp_con_title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #474fbb;
  }
  .fp_con_list{
    width: 100%;
  }
  .fp_con_list_dtl{
    float: left;
    width: 18%;
  }
  .fp_con_list_dtl1{
    float: left;
    width: 20%;
  }
  .ft_big {
    width: 20%;
  }
  @media print {
    .fp_con_list_dtl:nth-child(4){
      width: 24%;
    }
  }
  .fp_con_list_dtl span{
    margin-right: 3px;
  }
  .fp_con_list_dtl span:nth-child(2){
    color: #474fbb;
  }
  .fp_tab_tr1{
    width: 100%;
  }
  .fp_tab_tr1 table{
    width: 100%;
  }
  .fp_tab_tr1 table tr:first-child,.fp_tab_tr1 table tr:first-child td:nth-child(2),.fp_tab_tr1 table tr:first-child td:nth-child(3){
    border-top: 1px solid #a9a9a9;
  }
  .fp_tab_tr1 table tr:last-child,.fp_tab_tr1 table tr:last-child td:nth-child(1),.fp_tab_tr1 table tr:last-child td:nth-child(2){
    border-bottom: 1px solid #a9a9a9;
  }
  .fp_tab_tr1 table tr td:last-child{
  }
  .fp_tab_tr1 table tr td,.fp_tab_tr2 table tr td{
    padding:2.5px 5px;
  }
  .fp_tab_tr1 table .smtd{
    width: 20px;
    border: 1px solid #a9a9a9;
    white-space:normal!important;
  }
  .fp_tab_tr1 table .fttd{
    width: 120px;
  }
  .fp_tab_tr1 table .fttd label{
    width: 95%;
    text-align-last: justify;
    font-weight: normal;
    margin-bottom: 0px;
    display: inline-block;
  }
  .fp_tab_tr1 table .fttd:after{
    content: ":"
  }
  .fp_tab_tr1 table .pttd1{
    width: calc((100% - 140px) * 0.56);
    width: -moz-calc((100% - 140px) * 0.56);
    width: -webkit-calc((100% - 140px) * 0.56);

  }
  .fp_tab_tr2 {
    width: 100%;
  }
  .fp_tab_tr2 table{
    width: 100%;
  }
  .fp_tab_tr2 table tr td{
    border-left:1px solid #a9a9a9;
    border-top:none;
    border-bottom:none;
  }
  .fp_tab_tr2 table tr td:last-child {
    border-right:1px solid #a9a9a9;
  }
  .fp_tab_tr2 table tfoot tr:nth-child(2) td{
    border-top: 1px solid #a9a9a9;
  }
  .fp_tab_tr2 table thead tr td{
    text-align: center;
  }
  .fp_tab_tr2 table tbody tr td{
    text-align: left;
    height: 22px;
  }
  .fp_tab_tr2 .numstyle{
    text-align: right!important;
  }
  .fp_tab_tr2 .font_c{
    text-align: center!important;
  }
  .fp_tab_tr2 .font_l{
    text-align: left!important;
  }
  .fp_tab_tr2 .font_color,.fp_tab_tr1 .font_color{
    color: #474fbb!important;
  }
  .fa_tbts{
    margin-left: 10px;
  }
  .fa_tbts i{
    margin-left: 10px;
    margin-right: 10px;
  }
  #rerefersh_fp{
    display: none;
  }
  #fp_checkde{
    display: none;
  }
  .fp_tab_tr1 table .pttdlas{
    /* white-space: normal!important; */
    border-bottom: 1px solid #a9a9a9;
    vertical-align: top;
  }
  .fp_tab_tr1 table .pttdlas span{
    word-wrap: break-word;
    word-break:break-all;
    white-space: normal;
    display:block;

  }
  .border_btm{
    border-bottom: 1px solid #a9a9a9!important;
    border-right: 1px solid #a9a9a9!important;
    border-top: 1px solid #a9a9a9!important;
    min-width: 200px;
  }
</style>
