<template>
  <div>
    <div>
      <el-table :data="orgs">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="orgId" label="组织号"></el-table-column>
        <el-table-column
          prop="orgName"
          label="组织名称"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="orgTaxcode"
          label="税号"
          width="250"
        ></el-table-column>
        <el-table-column prop="orgMachine" label="盘号"></el-table-column>
        <el-table-column prop="orgMachineId" label="盘Id"></el-table-column>
        <!-- <el-table-column prop="isSkp" label="是否是税控盘"></el-table-column> -->
        <!-- <el-table-column prop="isSap" label="数据源是否是sap端" width="180">
        </el-table-column> -->
        <!-- <el-table-column prop="appId" label="appId"></el-table-column> -->
        <!-- <el-table-column prop="appSecret" label="接口线路">
          <template slot-scope="scope">
            <div class="org" @click="path(scope)">
              <el-tag type="success">线路2</el-tag>
              <i
                style="margin-left: 10px; color: #1890ff"
                class="el-icon-edit"
              ></i>
            </div>
          </template>
        </el-table-column> -->

        <el-table-column prop="userCode" label="开票人账号"></el-table-column>
        <el-table-column prop="password" label="开票人密码"></el-table-column>
        <el-table-column prop="wxLimit" label="未税限额"></el-table-column>
        <el-table-column prop="seLimit" label="税额限制"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot="header">
            <div class="org">
              <span>操作</span>
              <div style="margin-left: 50px">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-circle-plus-outline"
                  @click="addOrg"
                >
                  新增
                </el-button>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
      style="height: 100%; overflow: auto"
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="40%"
    >
      <div class="userz" style="height: 100%; overflow: auto">
        <h3 v-if="org.id == null" style="margin-left: 10px">新增组织</h3>
        <h3 v-if="org.id != null" style="margin-left: 10px">修改组织</h3>
        <div style="padding: 20px">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="组织号">
              <el-input v-model="org.orgId"></el-input>
            </el-form-item>
            <el-form-item label="组织名">
              <el-input v-model="org.orgName"></el-input>
            </el-form-item>
            <el-form-item label="税号">
              <el-input v-model="org.orgTaxcode"></el-input>
            </el-form-item>
            <el-form-item label="盘号">
              <el-input v-model="org.orgMachine"></el-input>
            </el-form-item>
            <el-form-item label="盘Id">
              <el-input v-model="org.orgMachineId"></el-input>
            </el-form-item>
            <el-form-item label="开票员账号">
              <el-input v-model="org.userCode"></el-input>
            </el-form-item>
            <el-form-item label="开票员密码">
              <el-input v-model="org.password"></el-input>
            </el-form-item>

            <el-form-item label="未税限额">
              <el-input v-model="org.wxLimit"></el-input>
            </el-form-item>

            <el-form-item label="税额限制">
              <el-input v-model="org.seLimit"></el-input>
            </el-form-item>

            <el-form-item label="PATH">
              <div v-for="(item, index) in path" :key="item">
                <el-form
                  :key="index"
                  :inline="true"
                  :model="item"
                  class="demo-form-inline"
                >
                  <el-form-item :label="item.name + ':'"></el-form-item>
                  <el-form-item label=" Appid">
                    <el-input v-model="item.appId" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="secret">
                    <el-input
                      v-model="item.appSecret"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-form-item>

            <!-- <el-form-item label="appId">
              <el-input v-model="org.appId"></el-input>
            </el-form-item>

            <el-form-item label="appSecret">
              <el-input v-model="org.appSecret"></el-input>
            </el-form-item> -->
            <el-form-item label="是否是sap数据源" :label-width="300">
              <el-switch
                v-model="org.isSap"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否是税控盘" :label-width="300">
              <el-switch
                v-model="org.isSkp"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="是否严格控制税差" :label-width="300">
              <el-switch
                v-model="org.isStrict"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-form>
          <el-button
            v-if="org.id == null"
            style="float: right"
            type="primary"
            @click="save()"
          >
            新增
          </el-button>

          <el-button
            v-if="org.id != null"
            style="float: right"
            type="primary"
            @click="save()"
          >
            更新
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import { queryOrgsAll, saveOrg, deleteOrg } from '@/api/invoice.js'
  export default {
    data() {
      return {
        orgs: [],
        org: {},
        drawer: false,
        path: [
          {
            invoiceType: '3',
            name: '电专线路',
            appId: '',
            appSecret: '',
            orgId: '',
          },
          {
            invoiceType: '4',
            name: '电普线路',
            appId: '',
            appSecret: '',
            orgId: '',
          },
          {
            invoiceType: '5',
            name: '外销线路',
            appId: '',
            appSecret: '',
            orgId: '',
          },
          {
            invoiceType: '1',
            name: '纸专线路',
            appId: '',
            appSecret: '',
            orgId: '',
          },
          {
            invoiceType: '2',
            name: '纸普线路',
            appId: '',
            appSecret: '',
            orgId: '',
          },
        ],
      }
    },
    beforeMount() {
      this.queryOrgs()
    },
    methods: {
      handleEdit(row) {
        console.log(row)
        this.org = row
        console.log('==================' + this.org.paths)
        if (this.org.paths && this.org.paths.length > 0) {
          this.path = this.org.paths
        } else {
          this.path = [
            {
              invoiceType: '3',
              name: '电专线路',
              appId: '',
              appSecret: '',
              orgId: '',
            },
            {
              invoiceType: '4',
              name: '电普线路',
              appId: '',
              appSecret: '',
              orgId: '',
            },
            {
              invoiceType: '5',
              name: '外销线路',
              appId: '',
              appSecret: '',
              orgId: '',
            },
            {
              invoiceType: '1',
              name: '纸专线路',
              appId: '',
              appSecret: '',
              orgId: '',
            },
            {
              invoiceType: '2',
              name: '纸普线路',
              appId: '',
              appSecret: '',
              orgId: '',
            },
          ]
        }
        this.drawer = true
      },
      async queryOrgs() {
        let { data: result } = await queryOrgsAll()
        console.log(result)
        if (result.success) {
          this.orgs = result.data

          this.$message.success(result.msg)
        } else {
          this.$message.error(result.msg)
          console.log(result.data)
        }
      },
      addOrg() {
        this.drawer = true
      },
      async save() {
        this.path.forEach((item) => {
          item.orgId = this.org.orgId
        })
        this.org.paths = this.path
        let { data: result } = await saveOrg(this.org)
        console.log(result)
        if (result.success) {
          this.$message.success(result.msg)
          this.queryOrgs()
        } else {
          this.$message.error(result.msg)
          console.log(result.data)
        }
      },
      async handleDelete(row) {
        let { data: result } = await deleteOrg(row.id)
        console.log(result)
        if (result.success) {
          this.$message.success(result.msg)
          this.queryOrgs()
        } else {
          this.$message.error(result.msg)
        }
      },
    },
  }
</script>

<style>
  .org {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .el-drawer.rtl {
    overflow: scroll;
  }
</style>
