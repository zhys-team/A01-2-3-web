<template>
  <div>
    <div class="fp_all" id="To_print">
      <div class="fp_con">
        <div class="fp_con_title" id="fplx1">浙江增值税专用发票</div>
        <div class="fp_con_list m-top-xs">
          <div class="fp_con_list_dtl">
            <span>发票代码:</span>
            <span id="fpdm" class="font_color"></span>
          </div>
          <div class="fp_con_list_dtl">
            <span>发票号码:</span>
            <span id="fphm" class="font_color"></span>
          </div>
          <div class="fp_con_list_dtl">
            <span>开票日期:</span>
            <span id="kprq" class="font_color"></span>
          </div>
          <div class="fp_con_list_dtl">
            <span>校验码:</span>
            <span id="jym" class="font_color"></span>
          </div>
          <div class="fp_con_list_dtl">
            <span>机器编号:</span>
            <span id="jqbm" class="font_color"></span>
          </div>
        </div>
        <div style="clear: both"></div>
        <!--发票中间内容开始-->
        <div class="fp_con_tab">
          <!--第一大行：购买方、密码区-->
          <div class="fp_tab_tr1">
            <table cellspacing="0">
              <tr>
                <td rowspan="4" class="smtd">购买方</td>
                <td class="fttd"><label>名称</label></td>
                <td id="spfmc" class="pttd1 font_color"></td>
                <td rowspan="4" class="smtd">密码区</td>
                <td rowspan="4" class="pttdlas border_btm"><label></label></td>
              </tr>
              <tr>
                <td class="fttd"><label>纳税人识别号</label></td>
                <td id="spfsbh" class="font_color"></td>
              </tr>
              <tr>
                <td class="fttd"><label>地址、电话</label></td>
                <td id="spfdzdh" class="font_color"></td>
              </tr>
              <tr>
                <td class="fttd"><label>开户行及账号</label></td>
                <td id="spfyhzh" class="font_color"></td>
              </tr>
            </table>
          </div>
          <!--第二大行：明细、合计-->
          <div class="fp_tab_tr2">
            <table style="width: 100%" cellspacing="0">
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
                <tr>
                  <td class="font_color"></td>
                  <td class="font_color"></td>
                  <td class="font_color"></td>
                  <td class="numstyle font_color"></td>
                  <td class="font_color"></td>
                  <td class="numstyle font_color"></td>
                  <td class="numstyle font_color"></td>
                  <td class="numstyle font_color"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="font_c">合计</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td id="hjje" class="numstyle font_color"></td>
                  <td id="slv" class="numstyle font_color"></td>
                  <td id="hjse" class="numstyle font_color"></td>
                </tr>
                <tr>
                  <td class="font_c">价税合计（大写）</td>
                  <td id="daxie" colspan="4" class="font_color">
                    &otimes;零圆整
                  </td>
                  <td id="kpje" colspan="3" class="font_color"></td>
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
                <td id="kpfmc" class="pttd1 font_color"></td>
                <td rowspan="4" class="smtd">备注</td>
                <td rowspan="4" class="pttdlas border_btm">
                  <lable id="beizhu"></lable>
                </td>
              </tr>
              <tr>
                <td class="fttd"><label>纳税人识别号</label></td>
                <td class="font_color" id="kpfsbh"></td>
              </tr>
              <tr>
                <td class="fttd"><label>地址、电话</label></td>
                <td class="font_color" id="kpfdzdh"></td>
              </tr>
              <tr>
                <td class="fttd"><label>开户行及账号</label></td>
                <td class="font_color" id="kpfyhzh"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'invoice-demo',
  }
</script>

<style scoped>
  .fp_all {
    width: 100%;
    font-size: 13px;
    color: #666;
  }
  .fp_title {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #6b6b6b;
  }
  .fp_msg {
    background-color: rgba(60, 139, 206, 0.8);
    padding: 6px;
    text-align: right;
  }
  .fp_msg .fp_msg_con {
    float: left;
    font-size: 15px;
    color: #fff;
    margin-right: 25px;
    margin-top: 5px;
  }
  .fp_msg .fp_msg_con span {
    margin: 2px 3px;
  }
  .fp_msg .btn {
    padding: 5px 20px;
  }
  .fp_con {
    width: 100%;
  }
  .fp_con_title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #474fbb;
  }
  .fp_con_list {
    width: 100%;
  }
  .fp_con_list_dtl {
    float: left;
    width: 18%;
  }
  .fp_con_list_dtl1 {
    float: left;
    width: 20%;
  }
  .ft_big {
    width: 20%;
  }
  @media print {
    .fp_con_list_dtl:nth-child(4) {
      width: 24%;
    }
  }
  .fp_con_list_dtl span {
    margin-right: 3px;
  }
  .fp_con_list_dtl span:nth-child(2) {
    color: #474fbb;
  }
  .fp_tab_tr1 {
    width: 100%;
  }
  .fp_tab_tr1 table {
    width: 100%;
  }
  .fp_tab_tr1 table tr:first-child,
  .fp_tab_tr1 table tr:first-child td:nth-child(2),
  .fp_tab_tr1 table tr:first-child td:nth-child(3) {
    border-top: 1px solid #a9a9a9;
  }
  .fp_tab_tr1 table tr:last-child,
  .fp_tab_tr1 table tr:last-child td:nth-child(1),
  .fp_tab_tr1 table tr:last-child td:nth-child(2) {
    border-bottom: 1px solid #a9a9a9;
  }
  .fp_tab_tr1 table tr td:last-child {
  }
  .fp_tab_tr1 table tr td,
  .fp_tab_tr2 table tr td {
    padding: 2.5px 5px;
  }
  .fp_tab_tr1 table .smtd {
    width: 20px;
    border: 1px solid #a9a9a9;
    white-space: normal !important;
  }
  .fp_tab_tr1 table .fttd {
    width: 120px;
  }
  .fp_tab_tr1 table .fttd label {
    width: 95%;
    text-align-last: justify;
    font-weight: normal;
    margin-bottom: 0px;
    display: inline-block;
  }
  .fp_tab_tr1 table .fttd:after {
    content: ':';
  }
  .fp_tab_tr1 table .pttd1 {
    width: calc((100% - 140px) * 0.56);
    width: -moz-calc((100% - 140px) * 0.56);
    width: -webkit-calc((100% - 140px) * 0.56);
  }
  .fp_tab_tr2 {
    width: 100%;
  }
  .fp_tab_tr2 table {
    width: 100%;
  }
  .fp_tab_tr2 table tr td {
    border-left: 1px solid #a9a9a9;
    border-top: none;
    border-bottom: none;
  }
  .fp_tab_tr2 table tr td:last-child {
    border-right: 1px solid #a9a9a9;
  }
  .fp_tab_tr2 table tfoot tr:nth-child(2) td {
    border-top: 1px solid #a9a9a9;
  }
  .fp_tab_tr2 table thead tr td {
    text-align: center;
  }
  .fp_tab_tr2 table tbody tr td {
    text-align: left;
    height: 22px;
  }
  .fp_tab_tr2 .numstyle {
    text-align: right !important;
  }
  .fp_tab_tr2 .font_c {
    text-align: center !important;
  }
  .fp_tab_tr2 .font_l {
    text-align: left !important;
  }
  .fp_tab_tr2 .font_color,
  .fp_tab_tr1 .font_color {
    color: #474fbb !important;
  }
  .fa_tbts {
    margin-left: 10px;
  }
  .fa_tbts i {
    margin-left: 10px;
    margin-right: 10px;
  }
  #rerefersh_fp {
    display: none;
  }
  #fp_checkde {
    display: none;
  }
  .fp_tab_tr1 table .pttdlas {
    /* white-space: normal!important; */
    border-bottom: 1px solid #a9a9a9;
    vertical-align: top;
  }
  .fp_tab_tr1 table .pttdlas lable {
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    display: block;
  }
  .border_btm {
    border-bottom: 1px solid #a9a9a9 !important;
    border-right: 1px solid #a9a9a9 !important;
    border-top: 1px solid #a9a9a9 !important;
    min-width: 200px;
  }
</style>
