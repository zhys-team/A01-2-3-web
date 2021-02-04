<template>
  <div class="timeData">
    <div class="modelTitle">
      <span><i class="el-icon-info"></i> {{titleName}}</span>
    </div>
    <div class="dataTable">
      <div class="nodata" v-if="activities && activities.length === 0">暂无数据</div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          type="primary"
          :timestamp="activity.time">
          {{activity.value}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-data',
  props: {
    timename: String // 日志表名称
  },
  data () {
    return {
      activities: [], // 日志表数据变量
      titleName: this.timename // 日志表名称变量
    }
  },
  methods: {
    setData (arr) {
      this.activities = this.changeCS(arr)
    },
    changeCS (arr) {
      let _this = this
      let newArr = arr.map(item => {
        let timeVal = _this.timestampToTime(item.score)
        return {
          time: timeVal,
          value: item.value
        }
      })
      return newArr
    },
    timestampToTime (time) { // 时间戳时间转换
      let date = new Date(time)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style scoped>
  .timeData{
    height: 100%;
    background-color: #fff;
  }
  .modelTitle{
    padding: 13px 10px;
  }
  .nodata{
    padding: 10px;
    color: #999;
    text-align: center;
  }
  .dataTable{
    overflow: auto;
    height: calc(100% - 48px);
    max-height: calc(100% - 48px);
    padding-top: 10px;
  }
</style>
