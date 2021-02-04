<template>
  <div class="Echarts">
    <span style="position: absolute">今日任务</span>
    <span style="position: absolute; margin-top: 230px">本月开票全览</span>
    <div
      id="main_ZheXian"
      style="margin-top: 50px; width: 100%; height: 500px"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'ZheXian',
    mounted() {
      this.myEcharts()
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(
          document.getElementById('main_ZheXian')
        )

        // 指定图表的配置项和数据
        var option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false,
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
            ],
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0, show: false },
          grid: { top: '55%' },
          series: [
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            { type: 'line', smooth: true, seriesLayoutBy: 'row' },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '{b}: {@2012} ({d}%)',
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012',
              },
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
