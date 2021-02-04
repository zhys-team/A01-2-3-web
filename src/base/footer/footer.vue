<template>
  <div class="bs-footer">
    <div class="ft-left">© 2020版权所有 | 杭州中航云税科技有限公司</div>
    <div class="ft-right">
      <span class="right-imp">财税智能</span>
      <span>管理专家</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseFooter',
  }
</script>

<style lang="stylus" scoped>
  .bs-footer
    height 20px;
    padding 10px 20px
    background-color #fff
    margin 0 -20px
    line-height 20px
    .ft-left
      float left
      font-size 13px
      color #676a6c
    .ft-right
      float right
      font-size 13px
      color #676a6c
      .right-imp
        font-weight bold
        color #409EFF
</style>
