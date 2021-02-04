<template>
  <div class="more-container">
    <el-row :gutter="0">
      <div>
        <el-form :inline="true">
          <el-form-item label="组织">
            <el-select
              v-model="orgIdSelected"
              placeholder="请选择"
              style="width: 100px"
            >
              <el-option
                v-for="item in orgs"
                :key="item.orgId + '/' + item.orgMachine"
                :label="(item.orgId + '/' + item.orgMachine) | orgNull"
                :value="item.orgId + '/' + item.orgMachine"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="控制选项" style="margin-left: 20px">
            <el-select
              v-model="strictSelected"
              placeholder="请选择"
              style="width: 150px"
            >
              <el-option
                v-for="item in stricts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票类型" style="margin-left: 20px">
            <el-select
              v-model="invoiceTypeSelected"
              placeholder="请选择"
              style="width: 120px"
            >
              <el-option
                v-for="item in invoiceTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="装载发票" style="margin-left: 20px">
            <el-input-number
              v-model="org.limit"
              :min="0"
              :max="10000"
              label=""
            ></el-input-number>
          </el-form-item> -->
          <el-form-item
            v-if="org != null && org.speed != null"
            label="开票频率"
            style="margin-left: 20px"
          >
            <el-input-number
              v-model="org.speed"
              :min="0"
              :max="100"
              label=""
            ></el-input-number>
          </el-form-item>
          <div style="float: right">
            <el-form-item>
              <el-button
                v-if="!control.isInvoicing"
                type="primary"
                icon="el-icon-video-play"
                @click="startInvoice()"
              >
                启动开票
              </el-button>

              <el-button
                v-if="control.isInvoicing"
                type="success"
                icon="el-icon-loading"
                disabled
              >
                正在开票
              </el-button>
              <el-button
                v-if="control.isInvoicing"
                type="error"
                icon="el-icon-video-pause"
                @click="stopInvoice()"
              >
                停止开票
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-video-play" plain>启动作废</el-button>
              <!-- <el-button icon="el-icon-video-pause" plain>停止作废</el-button> -->
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <Loging v-if="radio1 == '日志'"></Loging>
        <div v-if="radio1 == '图'">
          <Yuan2 :statistical-yuanview="statisticalYuanView"></Yuan2>
          <ZheXian
            :statistical-taskview="statisticalTaskView"
            style="margin-top: -15px"
          ></ZheXian>
        </div>

        <el-radio-group v-model="radio1" style="float: right; margin-top: 10px">
          <el-radio-button label="日志"></el-radio-button>
          <el-radio-button label="图">统计图</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <div v-if="org && org.orgName" class="business">
          <span style="font-size: 16px; margin-left: 20px">
            <i class="el-icon-info" style="color: #777"></i>
            信息
          </span>
          <hr style="opacity: 0.2" />
          <div v-if="org" class="content">
            <el-row class="box" style="border-top: 1px solid #e4e7ed">
              <!-- <el-col class="title info" :span="4">盘ID</el-col>
              <el-col class="info" :span="8">{{ org.orgMachineId }}</el-col> -->

              <el-col class="title info" :span="4">公司名称</el-col>
              <el-col class="info" :span="8">{{ org.orgName }}</el-col>
            </el-row>
            <el-row class="box">
              <el-col class="title info" :span="4">公司税号</el-col>
              <el-col class="info" :span="8">{{ org.orgTaxcode }}</el-col>
              <el-col class="title info" :span="4">税控机号</el-col>
              <el-col class="info" :span="8">{{ org.orgMachine }}</el-col>
            </el-row>
            <el-row class="box">
              <el-col
                v-if="org.wxLimit && org.wsSum"
                class="title info"
                :span="4"
              >
                剩余未税额(M)
              </el-col>
              <el-col v-if="org.wxLimit && org.wsSum" class="info" :span="8">
                {{ org.wxLimit - org.wsSum }}
              </el-col>
              <el-col
                v-if="org.seLimit && org.seSum"
                class="title info"
                :span="4"
              >
                剩余税额(M)
              </el-col>
              <el-col v-if="org.seLimit && org.seSum" class="info" :span="8">
                {{ org.seLimit - org.seSum }}
              </el-col>
            </el-row>
            <!-- <el-row class="box">
              <el-col class="title info" :span="4">发票总量</el-col>
              <el-col class="info" :span="8">{{ org.sumNum }}</el-col>
              <el-col class="title info" :span="4">剩余发票</el-col>
              <el-col class="info" :span="8">{{ org.undistributedNum }}</el-col>
            </el-row> -->
          </div>
        </div>
        <div class="chart card">
          <el-row>
            <el-col :span="16">
              <Tiao :statistical-healthview="statisticalHealthView"></Tiao>
            </el-col>
            <el-col :span="8">
              <Yuan :statistical-yuanview="statisticalYuanView"></Yuan>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!-- ============================================================布局参考=========================================================================== -->
    </el-row>

    <div v-show="!websocket.isSupport">
      <el-alert
        class="alert"
        title="日志服务无法启动！！"
        type="error"
        description="你的浏览器版本太低，请下载google,uc等流行浏览器"
        show-icon
        effect="dark"
      ></el-alert>
    </div>
  </div>
</template>

<script>
  import ZheXian from '@/components/charts/ZheXian'
  import Tiao from '@/components/charts/Tiao'
  import Loging from '@/components/home/Loging'
  import Yuan from '@/components/charts/Yuan'
  import Yuan2 from '@/components/charts/Yuan2'
  import {
    getDeviceInfo,
    startInvoice,
    stopInvoice,
    startInvalid,
    stopInvalid,
    saveOrg,
    statisticalTask,
    statisticalHealth,
    statisticalYuan,
  } from '@/api/invoice.js'
  export default {
    name: 'Console',
    components: { Loging, Yuan, Yuan2, ZheXian, Tiao },
    filters: {
      orgNull: function (value) {
        //value是过滤值
        let arr = value.split('/')
        if (arr[0] != 'null') {
          return arr[0] + '/' + arr[1]
        } else {
          return '所有组织'
        }
      },
    },
    data() {
      return {
        radio1: '图',
        session: null,
        control: {
          isInvoicing: false,
          isInvalid: false,
        },
        nodeEnv: process.env.NODE_ENV,
        show: true,
        websocket: {
          isSupport: true,
        },
        stricts: [
          {
            value: true,
            label: '严格控制税差',
          },
          {
            value: false,
            label: '重新计算税额',
          },
        ],
        invoiceTypes: [
          {
            value: 4,
            label: '电子普票',
          },
          {
            value: 3,
            label: '电子专票',
          },
          {
            value: 5,
            label: '外销发票',
          },
          {
            value: 1,
            label: '纸质专票',
          },

          {
            value: 2,
            label: '纸质普票',
          },

          {
            value: null,
            label: '所有票型',
          },
        ],
        invoiceTypeSelected: '',
        strictSelected: '',
        orgIdSelected: '',
        value: '',
        statisticalTaskView: null,
        statisticalHealthView: null,
        statisticalYuanView: null,
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user
      },
      orgs() {
        return this.$store.state.orgs
      },
      org() {
        return this.$store.state.org
      },
    },
    watch: {
      radio1: {
        handler(val, oldval) {
          if (val == '图') {
            this.statisticalTask()
          }
        },
      },
      $route: {
        handler(val, oldval) {
          console.log('1111' + this.$store.state.org)
          if (this.$store.state.org != null) {
            this.orgIdSelected =
              this.$store.state.org.orgId +
              '/' +
              this.$store.state.org.orgMachine
            this.strictSelected = this.$store.state.org.isStrict
            this.invoiceTypeSelected = this.$store.state.org.invoiceType
          }
        },
        // 深度观察监听
        deep: true,
        immediate: true,
      },
      org: {
        handler(newVal, oldVal) {
          if (newVal != null) {
            this.orgIdSelected =
              this.$store.state.org.orgId +
              '/' +
              this.$store.state.org.orgMachine
            this.strictSelected = this.$store.state.org.isStrict
            this.invoiceTypeSelected = this.$store.state.org.invoiceType
          }
        },
      },
      orgIdSelected: {
        handler(newVal, oldVal) {
          console.log(newVal + '=================')
          if (!this.orgs) {
            return
          }
          this.orgs.forEach((item) => {
            let arr = newVal.split('/')
            let orgId = arr[0]
            let orgMachine = arr[1]
            if (item.orgId == orgId && item.orgMachine == orgMachine) {
              this.$store.state.org = item
            }
            if (
              item.orgId == null &&
              orgId == 'null' &&
              item.orgMachine == null &&
              orgMachine == 'null'
            ) {
              this.$store.state.org = item
            }
          })

          this.statisticalTask()
          this.statisticalHealth()
          this.statisticalYuan()
          this.getDeviceInfo()
        },
        immediate: true,
        deep: true,
      },
      strictSelected: {
        handler(newVal, oldVal) {
          console.log(newVal)
          if (this.$store.state.org) {
            if (this.$store.state.org.isStrict != newVal) {
              this.$store.state.org.isStrict = newVal
              this.save()
            } else {
              this.$store.state.org.isStrict = newVal
            }
          }
        },
        immediate: true,
        deep: true,
      },
      invoiceTypeSelected: {
        handler(newVal, oldVal) {
          console.log(newVal)
          if (this.$store.state.org) {
            if (this.$store.state.org.invoiceType != newVal) {
              this.$store.state.org.invoiceType = newVal
              this.save()
            } else {
              this.$store.state.org.invoiceType = newVal
            }
          }
        },
        immediate: true,
        deep: true,
      },
    },

    created() {},
    mounted() {},
    methods: {
      async getDeviceInfo() {
        let { data: result } = await getDeviceInfo(this.$store.state.org)
        if (result.success) {
          this.$store.state.org.remainNum = result.data.remainNum
          this.$store.state.org.undistributedNum = result.data.undistributedNum
          this.$store.state.org.sumNum = result.data.sumNum

          this.$store.state.org.seSum = result.data.seSum
          this.$store.state.org.wsSum = result.data.wsSum
        } else {
          this.$message.error(result.msg)
        }
      },
      async statisticalYuan() {
        let { data: result } = await statisticalYuan(
          this.$store.state.org.orgId,
          300
        )
        if (result.success) {
          this.statisticalYuanView = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async statisticalTask() {
        let { data: result } = await statisticalTask(
          this.$store.state.org.orgId
        )
        if (result.success) {
          this.statisticalTaskView = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async statisticalHealth() {
        let { data: result } = await statisticalHealth(
          this.$store.state.org.orgId,
          'year'
        )
        if (result.success) {
          this.statisticalHealthView = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      establishWebSession() {
        //建立会话
        this.session = new WebSocket(
          'ws://' +
            this.socketUrl +
            '/websocket/' +
            this.$store.state.org.orgId +
            '/' +
            this.$store.state.org.orgMachine
        )
        var session = this.session
        session.onopen = () => {
          this.$message({
            message: '实时日志系统已启动！',
            type: 'success',
          })
          // session.send("anets");
        }

        session.onmessage = (e) => {
          let message = JSON.parse(e.data)
          if (message['type'] == 'log') {
            this.$store.state.logs.push(message.data)
          }

          if (message['type'] == 'download') {
            this.$store.state.progress = message.data.content
          }
        }

        session.onclose = (e) => {
          console.log('会话关闭!')
          // this.$message.error(
          //   '连接服务端发生异常，会话关闭。请检查服务器连接网络并刷新重试！'
          // )
        }
      },
      async startInvoice() {
        this.radio1 = '日志'
        //检查客户端是否支持webSocket
        if (this.session) {
          this.session.close()
        }
        if ('WebSocket' in window) {
          this.establishWebSession()
        } else {
          this.websocket.isSupport = false
        }
        let { data } = await stopInvoice(this.$store.state.org)
        if (data.success) {
          this.control.isInvoicing = true
          let { data } = await startInvoice(this.$store.state.org)
          if (data.success) {
            this.$message.success(data.msg)
          } else {
            this.control.isInvoicing = false
            this.$message.error(data.msg)
          }
        } else {
          this.$message.error(data.msg)
        }
      },
      async stopInvoice() {
        this.control.isInvoicing = false
        let { data } = await stopInvoice(this.$store.state.org)
        if (data.success) {
          this.control.isInvoicing = false
          this.$message.success(data.msg)
        } else {
          this.control.isInvoicing = false
          this.$message.error(data.msg)
        }
      },
      async startInvalid() {
        let { data } = await startInvalid(this.$store.state.org)
        if (data.success) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      },
      async stopInvalid() {
        let { data } = await stopInvalid(this.$store.state.org)
        if (data.success) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      },
      async save() {
        let { data: result } = await saveOrg(this.$store.state.org)
        console.log(result)
        if (result.success) {
          // this.$message.success(result.msg)
        } else {
          this.$message.error(result.msg)
          console.log(result.data)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .more-container {
    ::v-deep {
      .el-card__body {
        > div {
          min-height: 220px;
          padding: 20px;

          > ul {
            > li {
              line-height: 30px;
            }
          }

          > img {
            display: block;
            margin: 40px auto;
            border: 1px solid #dedede;
          }
        }
      }
    }
  }

  .alert {
    position: fixed;
    bottom: 5px;
    right: 0px;
    width: auto;
  }
  .business {
    border-radius: 2px;
    border: 1px solid#EBEEF5;
    padding: 10px 0px;
    .content {
      padding: 5px 20px;
      .box {
        .title {
          background-color: #f7f7f7;
          border-left: 1px solid #e4e7ed;
          border-right: 1px solid #e4e7ed;
        }
        .info {
          padding: 10px 15px;
          color: #777;
        }
        border: 1px solid #e4e7ed;
        border-left: 0px solid #e4e7ed;
        border-top: 0px solid #e4e7ed;
      }
    }
  }
  .business:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .card {
    margin-top: 30px;
    border-radius: 2px;
    border: 1px solid#EBEEF5;
    padding: 10px 0px;
  }
  .card:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 0 6px rgba(0, 0, 0, 0.04);
  }
</style>
