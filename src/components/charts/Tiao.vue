<template>
  <div class="Echarts">
    <div id="main_tiao" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script>
  export default {
    name: 'Echarts',
    props: {
      statisticalHealthview: {
        type: Object,
        default: null,
      },
    },
    watch: {
      statisticalHealthview: {
        handler(newVal, oldVal) {
          console.log(newVal)
          if (newVal != null) {
            console.log('图形接收到数据' + newVal)
            this.myEcharts()
          }
        },
      },
    },
    mounted() {
      if (this.statisticalHealthview) {
        this.myEcharts()
      }
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main_tiao'))

        // 指定图表的配置项和数据
        var option = {
          // color: [
          //   '#76da91',
          //   '#63b2ee',
          //   '#f17aba',

          //   '#7cd6cf',

          //   '#91c7ae',
          //   '#749f83',
          //   '#ca8622',
          // ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            data: ['已完成', '总任务'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: ['开票', '作废', '同步', '打印'],
          },
          series: [
            {
              name: '已完成',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'right',
                normal: {
                  show: false,
                  formatter: function (params) {
                    if (params.value > 0) {
                      return params.value
                    } else {
                      return ''
                    }
                  },
                },
              },
              data: this.statisticalHealthview['已完成'],
            },
            {
              name: '总任务',
              type: 'bar',
              stack: '总量',
              label: {
                show: false,
                position: 'right',
                normal: {
                  show: false,
                  formatter: function (params) {
                    if (params.value > 0) {
                      return params.value
                    } else {
                      return ''
                    }
                  },
                },
              },
              data: this.statisticalHealthview['总任务'],
            },
          ],
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      },
    },
  }
</script>

<style></style>
