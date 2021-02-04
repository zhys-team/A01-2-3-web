<template>
  <div class="Echarts">
    <div
      id="main_ZheXian"
      style="margin-top: 50px; width: 90%; height: 330px"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'ZheXian',
    props: {
      statisticalTaskview: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {}
    },

    watch: {
      statisticalTaskview: {
        handler(newVal, oldVal) {
          console.log(newVal)
          if (newVal != null) {
            this.myEcharts()
          }
        },
      },
    },
    mounted() {
      if (this.statisticalTaskview) {
        this.myEcharts()
      }
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
            text: '',
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              let newParams = []
              let tooltipString = []
              newParams = [...params]
              newParams.sort((a, b) => {
                return b.value - a.value
              })
              newParams.forEach((p) => {
                const cont =
                  p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>'
                tooltipString.push(cont)
              })
              return tooltipString.join('')
            },
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
            show: true,
          },
          legend: {
            data: [
              '当日开票量',
              '累计开票量',
              '当日作废量',
              '累计作废量',
              '待开票量',
            ],
            show: true,
          },
          toolbox: {
            show: false,
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
              data: this.statisticalTaskview.days_list,
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
              type: 'bar',
              name: '当日开票量',
              type: 'line',
              smooth: true,
              symbol: 'none', //取消折点圆圈
              data: this.statisticalTaskview.countInvoicedDay_list,
            },
            {
              type: 'bar',
              name: '累计开票量',
              type: 'line',
              symbol: 'none', //取消折点圆圈
              smooth: true,
              data: this.statisticalTaskview.count2InvoiceDay_list,
            },
            {
              type: 'bar',
              name: '当日作废量',
              type: 'line',
              smooth: true,
              symbol: 'none', //取消折点圆圈
              data: this.statisticalTaskview.countInvalidDay_list,
            },
            {
              type: 'bar',
              name: '累计作废量',
              smooth: true,
              symbol: 'none', //取消折点圆圈
              data: this.statisticalTaskview.count9InvoiceDay_list,
            },
            {
              name: '待开票量',
              type: 'line',
              smooth: true,
              symbol: 'none', //取消折点圆圈
              // label: {
              //   normal: {
              //     show: true,
              //     position: 'top',
              //   },
              // },
              data: this.statisticalTaskview.countWaitTaskDay_list,
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
