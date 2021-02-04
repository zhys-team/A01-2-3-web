<template>
  <div class="Echarts">
    <div id="main_yuan" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script>
  export default {
    name: 'Yuan',
    mounted() {
      this.myEcharts()
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main_yuan'))

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '',
            subtext: '',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: [
              'rose1',
              'rose2',
              'rose3',
              'rose4',
              'rose5',
              'rose6',
              'rose7',
              'rose8',
            ],
            show: false,
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: false, readOnly: false },
              magicType: {
                show: false,
                type: ['pie', 'funnel'],
              },
              restore: { show: false },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: '组织',
              type: 'pie',
              radius: [20, 110],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                },
              },
              data: [
                { value: 10, name: 'rose1' },
                { value: 5, name: 'rose2' },
                { value: 15, name: 'rose3' },
                { value: 25, name: 'rose4' },
                { value: 20, name: 'rose5' },
                { value: 35, name: 'rose6' },
                { value: 30, name: 'rose7' },
                { value: 40, name: 'rose8' },
              ],
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
