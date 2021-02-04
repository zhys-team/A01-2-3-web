<template>
  <div class="Echarts">
    <div id="main_yuan2" style="width: 90%; height: 200px"></div>
  </div>
</template>

<script>
  export default {
    name: 'Yuan',
    props: {
      statisticalYuanview: {
        type: Object,
        default: null,
      },
    },
    watch: {
      statisticalYuanview: {
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
      if (this.statisticalYuanview) {
        this.myEcharts()
      }
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main_yuan2'))

        // 指定图表的配置项和数据
        var option = {
          legend: {
            show: false,
          },
          tooltip: {},
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015'],
              ['待开票', this.statisticalYuanview['1']],
              ['已开票', this.statisticalYuanview[2]],
              ['待作废', this.statisticalYuanview[3]],
              ['已作废', this.statisticalYuanview[9]],
            ],
          },
          series: [
            {
              type: 'pie',
              radius: 60,
              center: ['50%', '50%'],
              encode: {
                itemName: 'product',
                value: '2012',
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
