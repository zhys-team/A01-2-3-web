<template>
  <div>
    <el-tabs type="border-card" style="border: 0px solid !important">
      <el-tab-pane style="border: 0px solid">
        <span slot="label">购方及控制系统</span>
        <div class="groups">
          <div :span="12" class="group" style="padding-right: 50px">
            <div class="item">
              <span class="title">开票客户：</span>
              <div class="box">
                <el-input
                  v-model="invoiceHead.custName"
                  size="small"
                  placeholder=""
                >
                  <template slot="prepend">
                    {{ invoiceHead.custIdBill }}
                  </template>
                </el-input>
              </div>
            </div>
            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">开票客户税号：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.custTaxcode"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">开票客户电话：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.custTelephone"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="item">
                <span class="title">开票客户地址：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.custAddress"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">开票客户银行：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.custBankname"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">开票客户账号：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.custBankaccount"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>
          </div>

          <div class="group" style="padding-left: 50px">
            <div class="row" style="margin-top: 0px">
              <div class="item" style="width: 48%">
                <span class="title">合并方式：</span>
                <div class="box">
                  <el-select
                    v-model="invoiceHead.mergefType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options.mergefTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">金额拆分：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.mergeAmt"
                    size="small"
                    placeholder=""
                  >
                    <template slot="append">万元</template>
                  </el-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">金税发票代码：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.goldtaxCode"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">金税发票号码：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.goldtaxNum"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="item" style="width: 30%">
                <span class="title" style="width: 250px">含税净金额尾差：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.zamountHswc"
                    size="small"
                    :disabled="true"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 30%">
                <span class="title" style="width: 300px">
                  不含税净金额尾差：
                </span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.zamountWswc"
                    size="small"
                    :disabled="true"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 30%">
                <span class="title" style="width: 250px">净税额尾差：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.zamountSewc"
                    size="small"
                    :disabled="true"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="item" style="width: 30%">
                <span class="title">清单开票：</span>
                <div class="box">
                  <el-checkbox v-model="listInvocie"></el-checkbox>
                </div>
              </div>
              <div class="item" style="width: 30%">
                <span class="title">是否红字：</span>
                <div class="box">
                  <el-cascader
                    v-model="isRedValue"
                    :options="options.isRedOptions"
                    :props="{ expandTrigger: 'hover' }"
                  ></el-cascader>
                </div>
              </div>
              <div class="item" style="width: 30%">
                <span class="title">发票类型：</span>
                <div class="box">
                  <el-select
                    v-model="invoiceHead.invoiceType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options.invoiceTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">红字及备注</span>
        <div class="groups">
          <div :span="12" class="group" style="padding-right: 50px">
            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">提交开票日期：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.billDate"
                    size="small"
                    placeholder=""
                    disabled
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">金税开票日期：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.billGdate"
                    size="small"
                    placeholder=""
                    disabled
                  ></el-input>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">提交作废日期：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.cancelDate"
                    size="small"
                    placeholder=""
                    disabled
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">金税作废日期：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.cancelGdate"
                    size="small"
                    placeholder=""
                    disabled
                  ></el-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="item" style="width: 48%">
                <span class="title">收款人：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.payeeName"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
              <div class="item" style="width: 48%">
                <span class="title">复核人：</span>
                <div class="box">
                  <el-input
                    v-model="invoiceHead.checkName"
                    size="small"
                    placeholder=""
                  ></el-input>
                </div>
              </div>
            </div>
          </div>

          <div
            :span="12"
            class="group"
            style="padding-right: 50px; display: flex; flex-decration: row"
          >
            <div class="left" style="width: 50%">
              <div class="row">
                <div class="item">
                  <span class="title">红字申请单号：</span>
                  <div class="box">
                    <el-input
                      v-model="invoiceHead.invoiceRedXxbm"
                      size="small"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">蓝字发票代码：</span>
                  <div class="box">
                    <el-input
                      v-model="invoiceHead.invoiceRedFpdm"
                      size="small"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <span class="title">蓝字发票号码：</span>
                  <div class="box">
                    <el-input
                      v-model="invoiceHead.invoiceRedFphm"
                      size="small"
                      placeholder=""
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="right"
              style="width: 50%; padding-left: 30px; padding-top: 15px"
            >
              <span style="font-size: 14px">开票备注:</span>
              <el-input
                v-model="invoiceHead.billRemark"
                style="margin-top: 5px"
                type="textarea"
                :rows="4"
                placeholder="如有备注，请输入"
              ></el-input>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listInvocie: false, //清单开票
        isRedValue: ['X', '21'],
        options: {
          isRedOptions: [
            {
              value: 'X',
              label: '是',
              children: [
                {
                  value: '11',
                  label: '客户已抵扣（购方红字）',
                },
                {
                  value: '21',
                  label: '发票有误，客户拒绝',
                },
                {
                  value: '22',
                  label: '发票有误，尚未交付',
                },
                {
                  value: '121',
                  label: '客户无法认证',
                },
                {
                  value: '122',
                  label: '税号认证不符',
                },
                {
                  value: '123',
                  label: '发票代码或号码认证不符',
                },
                {
                  value: '124',
                  label: '所供商品不属于扣税项目范围',
                },
              ],
            },
            {
              value: 'Y',
              label: '否',
            },
          ],
          invoiceTypeOptions: [
            {
              value: '1',
              label: '专用发票',
            },
            {
              value: '2',
              label: '普通发票',
            },
            {
              value: '4',
              label: '电子发票',
            },
            {
              value: '5',
              label: '外销发票',
            },
            {
              value: '9',
              label: '空白发票',
            },
          ],
          mergefTypeOptions: [
            {
              value: '1',
              label: '相同物料合并',
            },
            {
              value: '2',
              label: '相同物料+单价合并',
            },
            {
              value: '3',
              label: '不合并',
            },
          ],
        },
      }
    },
    computed: {
      invoiceHead() {
        return this.$store.state.invoiceHead
      },
    },
    watch: {
      invoiceHead: {
        handler(newVal, oldVal) {
          if (!this.$store.state.invoiceHead) {
            return
          }
          if (!this.$store.state.invoiceHead.mergefType) {
            this.$store.state.invoiceHead.mergefType = this.$store.state.config.mergefType
          }

          if (!this.$store.state.invoiceHead.orgTaxexceed) {
            this.$store.state.invoiceHead.orgTaxexceed = this.$store.state.config.orgTaxexceed
          }

          if (
            this.$store.state.invoiceHead.invoiceList &&
            this.$store.state.invoiceHead.invoiceList == 1
          ) {
            this.listInvocie = true
          } else if (
            this.$store.state.config.invoiceList == 'true' ||
            this.$store.state.config.invoiceList == true
          ) {
            // 不存在就取默认配置
            this.listInvocie = true
          } else {
            this.listInvocie = false
          }

          if (this.$store.state.invoiceHead.invoiceRed == 'Y') {
            this.isRedValue = ['Y']
          } else {
            this.isRedValue = [
              'X',
              this.$store.state.invoiceHead.invoiceRedReqm,
            ]
          }
        },
        deep: true,
        immediate: true,
      },
      listInvocie: {
        handler(newVal, oldVal) {
          if (newVal) {
            this.$store.state.invoiceHead.invoiceList = 1
          } else {
            this.$store.state.invoiceHead.invoiceList = 0
          }
        },
      },
      isRedValue: {
        handler(newVal, oldVal) {
          if (!newVal) {
            return
          }
          if (newVal.length == 1) {
            this.$store.state.invoiceHead.invoiceRedReqm = ''
            this.$store.state.invoiceHead.invoiceRed = newVal[0]
          }
          if (newVal.length == 2) {
            this.$store.state.invoiceHead.invoiceRedReqm = newVal[1]
            this.$store.state.invoiceHead.invoiceRed = newVal[0]
          }
        },
        deep: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .border-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .groups {
    display: flex;
    flex-direction: row;
    .group {
      width: 50%;
      padding: 0px 5px;
      // border: 1px dotted #fb7299;

      .row {
        margin-top: 15px;
      }
    }
  }

  .item {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .title {
      min-width: 110px;
    }
    .box {
      width: 100% !important;
    }
  }

  .label {
    height: 32px;
    line-height: 32px;
    min-width: 100px;
    text-align: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .col {
    display: flex;
    flex-direction: column;
  }
</style>
