<template>
  <div>
    <div class="row search">
      <el-form ref="form" size="mini" :inline="true" label-width="80px">
        <el-form-item label="组织" label-width="50px">
          <el-select v-model="orgId" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in orgs"
              :key="item.orgId"
              :label="item.orgId | orgNull"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-form-item prop="date1" style="width: 90px; margin-right: 0px">
            <el-input
              v-model="condition.goldtaxNumStart"
              placeholder=""
            ></el-input>
          </el-form-item>
          <span>&nbsp;&nbsp; - &nbsp; &nbsp;</span>
          <el-form-item prop="date2" style="width: 90px">
            <el-input
              v-model="condition.goldtaxNumEnd"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="condition.custName"></el-input>
        </el-form-item>
        <el-form-item label="开票日期">
          <el-date-picker
            type="date"
            placeholder="起始日期"
            style="width: 130px"
            v-model="condition.billGdateStart"
          ></el-date-picker>
          <span>&nbsp;&nbsp;- &nbsp; &nbsp;</span>
          <el-date-picker
            type="date"
            placeholder="结束日期"
            style="width: 130px"
            v-model="condition.billGdateEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 30px">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div
      class="content"
      style="margin-top: 0px; padding: 0px 20px; margin-bottom: 0px"
    >
      <Table :table-data="condition.invoices"></Table>
      <!-- <Table :table-data="condition.items"></Table> -->
    </div>
    <div style="height: 60px">
      <div style="float: right; margin-right: 20px">
        <el-pagination
          v-if="condition.rowCount"
          :current-page="condition.pageNum"
          :page-size="condition.pageSize"
          background
          layout="prev, pager, next"
          :total="condition.rowCount"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  // import { getInvoice  List-- } from '@/api/invoiceCenter'
  import { getInvoices } from '@/api/invoice.js' //测试用
  import Table from './Table'
  export default {
    name: 'Descrepancy',
    components: { Table },
    filters: {
      orgNull: function (value) {
        //value是过滤值
        if (value != null) {
          return value
        } else {
          return '所有组织'
        }
      },
    },
    data() {
      return {
        condition: {
          billGdateStart: null,
          billGdateEnd: null,
          goldtaxNumStart: null,
          goldtaxNumEnd: null,
          orgId: this.$root.org.orgId,

          // data: null,
          data: null,
          pageSize: 15,
          pageNum: 1,
          rowCount: 1,
        },
        orgId: this.$root.org.orgId,
      }
    },
    computed: {
      orgs: {
        get() {
          return this.$root.orgs
        },
      },
    },
    watch: {
      orgId: {
        handler(newVal, oldVal) {
          this.condition.orgId = newVal
          this.gainPageData()
        },
      },
    },
    created() {
      this.gainPageData()
    },

    methods: {
      onSubmit() {
        this.gainPageData()
      },
      handleCurrentChange(num) {
        this.condition.pageNum = num
        this.gainPageData()
      },
      async gainPageData() {
        this.condition.items = null
        let { data: result } = await getInvoices(this.condition)
        if (result.success) {
          // this.condition = result.data.items
          this.condition = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
    margin-left: 50px;
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
    //   justify-content: space-between;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  .search {
    margin-top: 20px;
    //   padding-left: 50px;
  }
  a {
    transition: all 0.5s;
    display: block;
  }
  a:hover {
    color: #1890ff;
    text-decoration: underline;
  }
</style>
