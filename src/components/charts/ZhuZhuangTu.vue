<template>
  <div class="Echarts">
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
  export default {
    name: 'Echarts',
    mounted() {
      this.myEcharts()
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'))

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '近月开票量统计',
          },
          tooltip: {},
          legend: {
            data: ['量'],
          },
          xAxis: {
            data: ['7', '8', '9', '10', '11', '12'],
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20],
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
