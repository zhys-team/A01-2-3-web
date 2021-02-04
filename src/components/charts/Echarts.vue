<template>
  <div class="Echarts">
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
          title: {
            text: '本月开票全览',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            data: ['电子普票', '电子专票', '纸质普票', '纸质专票', '外销发票'],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
              ],
            },
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false,
              },
              // show: false,
            },
          ],
          series: [
            {
              name: '电子普票',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210, 56],
            },
            {
              name: '电子专票',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [
                220,
                182,
                191,
                234,
                290,
                330,
                310,
                56,
                820,
                932,
                901,
                934,
                567,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
              ],
            },
            {
              name: '纸质普票',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [
                150,
                232,
                201,
                154,
                190,
                330,
                410,
                56,
                820,
                932,
                901,
                934,
                6,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
              ],
            },
            {
              name: '纸质专票',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [
                320,
                332,
                301,
                334,
                390,
                330,
                320,
                56,
                820,
                932,
                901,
                934,
                45,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
              ],
            },
            {
              name: '外销发票',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                },
              },
              areaStyle: {},
              data: [
                820,
                932,
                901,
                934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                1934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
                1320,
                56,
                820,
                932,
                901,
                934,
                1290,
                1330,
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
