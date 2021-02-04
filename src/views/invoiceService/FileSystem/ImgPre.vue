<template>
  <div>
    <!-- 使用方法 -->
    <!-- <ImgPre
                  v-if="item.isdir == 0 && item.preview != null"
                  :img="InvoiceImgUrl + '/invoice/' + item.preview"
                  :big-img="InvoiceImgUrl + '/invoice/' + item.preview"
                ></ImgPre> -->
    <img
      id="img"
      :src="img"
      alt=""
      @mouseenter="enterImg()"
      @mousemove="moveImg(img, $event)"
      @mouseleave="leaveImg()"
    />
  </div>
</template>

<script>
  export default {
    props: {
      img: {
        type: String,
        default: null,
      },
      bigImg: {
        type: String,
        default: null,
      },
      zoom: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        image: {
          width: '',
          height: '',
        },
        show: false,
        zoomImg: null,
      }
    },
    watch: {
      img: {
        handler(newVal, oldVal) {
          if (newVal) {
          }
        },
        immediate: true,
      },
    },
    mounted() {
      var a = $('#bigimg')
      if (a.length == 0) {
        console.log('创建了一次')
        $('body').append(
          "<img id='bigimg' style='position:absolute;top:0;left:0' src='" +
            this.bigImg +
            "' alt='' />"
        )
        $('#bigimg').css('display', 'none')
      }

      console.log(a.length)
    },

    methods: {
      enterImg() {
        $('#bigimg')[0].src = this.bigImg
        let w0 = $('#img').css('width')
        let h0 = $('#img').css('height')
        // $('#bigimg').style.src = this.bigImg
        let w = document.getElementById('bigimg').naturalWidth
        let h = document.getElementById('bigimg').naturalHeight

        console.log('img图片大小:w' + w0 + ':h' + h0)
        console.log('原始图片大小:w' + w + ':h' + h)
        if (this.zoom == 0) {
          console.log('不缩放，最大宽度:' + w)
          $('').css('width')
          this.image.width = w
          this.image.height = h
          $('#bigimg').css('width', this.image.width)
          $('#bigimg').css('height', this.image.height)
        } else {
          console.log('缩放' + this.zoom)
          this.image.width = w0 * this.zoom
          this.image.height = h0 * this.zoom
          $('#bigimg').css('width', this.image.width)
          $('#bigimg').css('height', this.image.height)
        }
      },
      moveImg(img, e) {
        //    计算位置
        var clientW = document.body.offsetWidth
        var clientH = document.body.scrollHeight
        var imgW = $('#bigimg').css('width')
        var imgH = $('#bigimg').css('height')
        // console.log(parseInt(imgW))
        // console.log(parseInt(imgH))

        $('#bigimg').css('display', 'block')
        this.zoomImg = img
        console.log('相对于浏览器位置' + e.clientX)
        console.log('相对于文档位置' + e.pageX)
        console.log('浏览器宽' + clientW)
        console.log('计算所处大小' + (clientW - e.clientX))
        console.log('图宽' + parseInt(imgW))
        if (document.body.offsetWidth - e.clientX < parseInt(imgW)) {
          $('#bigimg').css('left', e.pageX - parseInt(imgW) + 'px')
        } else {
          $('#bigimg').css('left', e.clientX + 15 + 'px')
        }

        if (document.body.offsetHeight - e.pageY < parseInt(imgH)) {
          $('#bigimg').css('top', e.pageY - parseInt(imgH) + 'px')
        } else {
          $('#bigimg').css('top', e.pageY + 15 + 'px')
        }

        if (document.body.offsetHeight - e.pageY < parseInt(imgH)) {
          $('#bigimg').css('top', e.pageY - parseInt(imgH) + 'px')
        } else {
          $('#bigimg').css('top', e.pageY + 15 + 'px')
        }

        console.log('==========' + e.clientY + ';parseInt(imgH')
        if (e.clientY < parseInt(imgH)) {
          $('#bigimg').css('top', e.pageY + 15 + 'px')
        } else {
          if (document.body.offsetHeight - e.pageY < parseInt(imgH)) {
            $('#bigimg').css('top', e.pageY - parseInt(imgH) + 'px')
          } else {
            $('#bigimg').css('top', e.pageY + 15 + 'px')
          }
        }
      },
      leaveImg() {
        $('#bigimg').css('display', 'none')
        this.zoomImg = null
        $('#bigimg').css('transition', 'all 0.2s')
      },
    },
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
  img:hover {
    cursor: pointer;
  }

  .bigImg {
    position: absolute;
    max-width: 100%;
    left: 0px;
    top: 0px;
  }
</style>
