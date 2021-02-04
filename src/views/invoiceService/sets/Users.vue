<template>
  <div>
    <div class="content">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="no" label="姓名" width="180"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180"
        ></el-table-column>

        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="businesses" label="所属组织">
          <template slot-scope="scope">
            {{ scope.row.businesses }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot="header">
            <div class="add">
              <span>操作</span>
              <div style="margin-left: 100px">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-circle-plus-outline"
                  @click="addUser"
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

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="userz">
        <h3 v-if="user.id == null">新增用户</h3>
        <h3 v-if="user.id != null">修改用户</h3>
        <div style="padding: 20px">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="姓名">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="user.no"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="所属组织">
              <div style="margin-top: 5px">
                <el-tree
                  v-if="tree.length > 0"
                  ref="tree"
                  :data="tree"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                  @check-change="change"
                ></el-tree>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            v-if="user.id == null"
            style="float: right"
            type="primary"
            @click="save()"
          >
            新增
          </el-button>

          <el-button
            v-if="user.id != null"
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
  import {
    deleteUser,
    queryUsers,
    saveUser,
    queryOrgsAll,
  } from '@/api/invoice.js'
  export default {
    data() {
      return {
        users: null,
        drawer: false,
        user: {
          id: null,
          name: null,
          password: null,
          no: null,
          businesses: [],
        },
        props: {
          label: 'name',
          children: 'zones',
        },
        tree: [
          {
            id: -1,
            label: '所有组织',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
      }
    },
    created() {
      this.getUsers()
    },
    methods: {
      handleEdit(row) {
        console.log(row)
        this.user = row
        this.drawer = true
        this.getOrgs()
      },
      async handleDelete(row) {
        let { data: result } = await deleteUser(row.id)
        console.log(result)
        if (result.success) {
          this.$message.success(result.msg)
          this.getUsers()
        } else {
          this.$message.error(result.msg)
        }
      },
      async getUsers() {
        let { data: result } = await queryUsers()
        console.log(result)
        if (result.success) {
          this.users = result.data
        } else {
          this.$message.error(result.msg)
          console.log(result.data)
        }
      },
      async addUser() {
        this.drawer = true
        this.getOrgs()
      },
      change() {
        let res = this.$refs.tree.getCheckedNodes()
        this.user.businesses = []
        res.forEach((item) => {
          if (item.id != -1) {
            this.user.businesses.push(item.id)
          }
        })
        console.log(this.user.businesses)
      },
      async save() {
        let { data: result } = await saveUser(this.user)
        console.log(result)
        if (result.success) {
          this.$message.success(result.msg)
          this.getUsers()
        } else {
          this.$message.error(result.msg)
          console.log(result.data)
        }
      },
      async getOrgs() {
        let { data: result } = await queryOrgsAll()
        console.log(result)
        if (!result.success) {
          this.$message.error('查询组织失败')
          console.log(result.data)
          return
        }
        this.tree[0].children = []
        for (var i = 0; i < result.data.length; i++) {
          console.log(result.data[i])
          let item = {
            id: result.data[i].orgId,
            label: result.data[i].orgId,
          }
          this.tree[0].children.unshift(item)
        }
        console.log(this.tree)
      },
    },
  }
</script>

<style scoped>
  .add {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .userz {
    padding: 10px;
  }
</style>
