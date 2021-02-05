<template>
  <div class="all">
    <div class="top">
      <div>
        <el-form :inline="true">
          <el-form-item label="组织" label-width="50px">
            <el-select
              v-model="orgId"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option
                v-for="item in orgs"
                :key="item.orgId"
                :label="item.orgId | orgNull"
                :value="item.orgId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择统计月份" style="margin-left: 20px">
            <el-date-picker
              v-model="month"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :picker-options="pickerOptions"
              @change="confirmMouths"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content" v-for="(item, index) in items">
      <div class="head">
        <h3>组织:{{ item.orgId }}</h3>
      </div>
      <div>
        <el-table :data="item.summary" border :fit="true" style="width: 100%">
          <el-table-column
            prop="month"
            label="月份"
            width="120"
          ></el-table-column>
          <el-table-column prop="type" label="业务类型" width="120">
            <template slot-scope="scope">
              <ul>
                <li v-for="(item, index) in scope.row.data">
                  {{ item.type }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="se" label="销项税额" width="120">
            <template slot-scope="scope">
              <ul>
                <li v-for="(item, index) in scope.row.data">
                  {{ item.sej }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="wsj" label="未税金额" width="120">
            <template slot-scope="scope">
              <ul>
                <li v-for="(item, index) in scope.row.data">
                  {{ item.wsj }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="hsj" label="含税金额" width="120">
            <template slot-scope="scope">
              <ul>
                <li v-for="(item, index) in scope.row.data">
                  {{ item.hsj }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="pieces" label="发票张数">
            <template slot-scope="scope">
              <ul>
                <li v-for="(item, index) in scope.row.data">
                  {{ item.pieces }}
                </li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { getInvoiceSummary } from '@/api/invoiceCenter'
  export default {
    name: 'InvoiceSummary',
    data() {
      return {
        items: [
          {
            orgId: 2000,
            summary: [
              {
                month: '2020-02',
                data: [
                  { type: '内销', hsj: 222, wsj: 3333, sej: 444, pieces: 10 },
                  { type: '外销', hsj: 1111, wsj: 8888, sej: 999, pieces: 10 },
                  { type: '红字', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                  { type: '合计', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                ],
              },
              {
                month: '2020-03',
                data: [
                  { type: '内销', hsj: 12, wsj: 3333, sej: 444, pieces: 10 },
                  { type: '外销', hsj: 13, wsj: 8888, sej: 999, pieces: 10 },
                  { type: '红字', hsj: 14, wsj: 2133, sej: 2344, pieces: 10 },
                  { type: '合计', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                ],
              },
            ],
          },
          {
            orgId: 3000,
            summary: [
              {
                month: '2020-02',
                data: [
                  { type: '内销', hsj: 222, wsj: 3333, sej: 444, pieces: 10 },
                  { type: '外销', hsj: 1111, wsj: 8888, sej: 999, pieces: 10 },
                  { type: '红字', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                  { type: '合计', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                ],
              },
              {
                month: '2020-03',
                data: [
                  { type: '内销', hsj: 12, wsj: 3333, sej: 444, pieces: 10 },
                  { type: '外销', hsj: 13, wsj: 8888, sej: 999, pieces: 10 },
                  { type: '红字', hsj: 14, wsj: 2133, sej: 2344, pieces: 10 },
                  { type: '合计', hsj: 5222, wsj: 2133, sej: 2344, pieces: 10 },
                ],
              },
            ],
          },
        ],
        condition: {
          monthStart: '',
          mouthEnd: '',
          orgId: this.$root.org.orgId,
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [new Date(), new Date()])
              },
            },
            {
              text: '今年至今',
              onClick(picker) {
                const end = new Date()
                const start = new Date(new Date().getFullYear(), 0)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近六个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 6)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        month: [new Date().toUTCString(), new Date().toUTCString()],

        orgId: this.$root.org.orgId,
      }
    },
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
    computed: {
      items: {
        get() {
          return this.condition.items
        },
      },
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
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth()
      this.condition.monthStart = Y + '-' + (M + 1)
      this.condition.mouthEnd = Y + '-' + (M + 1)
      this.gainPageData()
    },
    methods: {
      confirmMouths(val) {
        console.log(val)
        if (!val || val === '') {
        } else {
          let date = new Date(val[0])
          let Y = date.getFullYear()
          let M = date.getMonth()
          let date1 = new Date(val[1])
          let Y1 = date1.getFullYear()
          let M1 = date1.getMonth()
          this.condition.monthStart = Y + '-' + (M + 1)
          this.condition.mouthEnd = Y1 + '-' + (M1 + 1)
        }
        this.gainPageData()
      },
      async gainPageData() {
        this.condition.items = null
        let { data: result } = await getInvoiceSummary(this.condition)
        if (result.success) {
          // this.condition = result.data.items
          this.condition = result.data
          this.items = this.condition.items
        } else {
          this.$message.error(result.msg)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .all {
    padding: 10px 20px;
  }

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    li {
    }
  }
  .content {
    .head {
      h3 {
        border-left: 5px solid #1890ff;
        padding-left: 20px;
        color: #1890ff;
        opacity: 0.8;
      }
    }
  }
</style>
