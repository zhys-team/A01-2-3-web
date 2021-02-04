<template>
  <el-dialog
    title="高级查询"
    :visible.sync="seniorVisible"
    width="600px"
    :before-close="handleClose"
  >
    <span>
      <el-form ref="seniorFrom" :model="seniorFrom" label-width="100px">
        <el-form-item label="发票号码" prop="fphm" v-if="seniorOption.fphm">
          <el-input
            class="seniorIPT"
            :placeholder="seniorOption.fphm.placeholder"
            v-model="seniorFrom.fphm"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="发票代码" prop="fphm" v-if="seniorOption.fpdm">
          <el-input
            class="seniorIPT"
            :placeholder="seniorOption.fpdm.placeholder"
            v-model="seniorFrom.fpdm"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="发票类型" prop="fplx" v-if="seniorOption.fplx">
          <el-checkbox-group v-model="seniorFrom.fplxArr">
            <el-checkbox
              name="fplx"
              v-for="item in seniorOption.fplx"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开票日期" prop="kprqQ" v-if="seniorOption.kprq">
          <el-date-picker
            class="seniorIPT"
            type="daterange"
            :placeholder="seniorOption.kprq.placeholder"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="seniorFrom.kprqQ"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="收票日期"
          prop="createTimeQ"
          v-if="seniorOption.createTime"
        >
          <el-date-picker
            class="seniorIPT"
            type="daterange"
            :placeholder="seniorOption.createTime.placeholder"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="seniorFrom.createTimeQ"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="会计抵扣期"
          prop="kjTimeS"
          v-if="seniorOption.kjTime"
        >
          <el-date-picker
            class="seniorIPT"
            :type="seniorOption.kjTime.type"
            :placeholder="seniorOption.kjTime.placeholder"
            v-model="seniorFrom.kjTimeS"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="疑票状态" prop="state" v-if="seniorOption.ypState">
          <el-radio-group v-model="seniorFrom.ypState">
            <el-radio
              v-for="item in seniorOption.ypState"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="核销状态"
          prop="bxState"
          v-if="seniorOption.bxState"
        >
          <el-radio-group v-model="seniorFrom.bxState">
            <el-radio
              v-for="item in seniorOption.bxState"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="认证状态"
          prop="rzState"
          v-if="seniorOption.rzState"
        >
          <el-radio-group v-model="seniorFrom.rzState">
            <el-radio
              v-for="item in seniorOption.rzState"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="签收状态"
          prop="spState"
          v-if="seniorOption.spState"
        >
          <el-radio-group v-model="seniorFrom.spState">
            <el-radio
              v-for="item in seniorOption.spState"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="记账状态"
          prop="jzState"
          v-if="seniorOption.jzState"
        >
          <el-radio-group v-model="seniorFrom.jzState">
            <el-radio
              v-for="item in seniorOption.jzState"
              v-bind:key="item.val"
              :label="item.val"
              >{{ item.lable }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在组织" prop="orgId">
          <el-select v-model="seniorFrom.orgId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="refSearch">重 置</el-button>
      <el-button type="primary" @click="sureSerch">查 询</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "senior-search",
  props: ["sivisible", "option"],
  watch: {
    sivisible(newValue) {
      this.seniorVisible = newValue;
    },
  },
  data() {
    return {
      seniorVisible: this.sivisible,
      seniorOption: this.option,
      seniorFrom: {
        fplxArr: [],
        createTimeQ: "",
        kjTimeS: "",
        bxState: "",
        rzState: "",
        spState: "",
        jzState: "",
        ypState: "",
        fphm: "",
        fpdm: "",
        orgId:null
      }, // 提交的from
      options: this.$store.state.orgIdsOptions,
    };
  },
  methods: {
    handleClose(done) {
      done();
      this.closeV();
    },
    closeV() {
      this.seniorVisible = false;
      this.$emit("handleClose");
    },
    sureSerch() {
      let param = this.seniorFrom;
      let createTimeQArr = this.createTimeQChange(param.createTimeQ);
      param.createTimeStart = createTimeQArr.s;
      param.createTimeEnd = createTimeQArr.d;
      let kprqQArr = this.createTimeQChange(param.kprqQ);
      param.kprqStart = kprqQArr.s;
      param.kprqEnd = kprqQArr.d;
      let kjTimesS = this.kjTimeChange(param.kjTimeS);
      param.kjdkq = kjTimesS;
      let fplxNewArr = param.fplxArr.map((item) => {
        return "'" + item + "'";
      });
      param["fplx"] = fplxNewArr.join(",");
      this.$emit("handleSearch", param);
      this.closeV();
    },
    kjTimeChange(val) {
      if (!val || val === "") {
        return "";
      }
      let tsDate = new Date(val);
      let Y = tsDate.getFullYear();
      let M = tsDate.getMonth() + 1;
      let mm = M > 10 ? M : "0" + M;
      let resDate = Y + mm;
      return resDate;
    },
    createTimeQChange(arr) {
      if (!arr || arr.length === 0) {
        return "";
      }
      let tsDate1 = new Date(arr[0]);
      let tsDate2 = new Date(arr[1]);
      let Y1 = tsDate1.getFullYear();
      let M1 = tsDate1.getMonth() + 1;
      let D1 = tsDate1.getDate();
      let Y2 = tsDate2.getFullYear();
      let M2 = tsDate2.getMonth() + 1;
      let D2 = tsDate2.getDate();
      let resDate = {
        s: Y1 + "-" + M1 + "-" + D1,
        d: Y2 + "-" + M2 + "-" + D2,
      };
      return resDate;
    },
    refSearch() {
      this.seniorFrom = {
        fplxArr: [],
        createTimeQ: "",
        kjTimeS: "",
        bxState: "",
        rzState: "",
        spState: "",
        jzState: "",
        kprqQ: "",
      };
      // this.closeV()
    },
  },
};
</script>

<style scoped>
.seniorIPT {
  width: 350px;
}
</style>
