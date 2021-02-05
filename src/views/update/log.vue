<template>
  <div>
    <div class="block" style="padding-top: 20px">
      <el-timeline>
        <el-timeline-item timestamp="2020/2/05" placement="top">
          <el-card>
            <p>|-github团队协作流程文档编写和测试------[张琪]</p>
            <p>|-差异报告的实现 </p>
            <p>|-开票汇总的实现 ，开票汇总接口文档编写。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/2/04" placement="top">
          <el-card>
            <p>
              |-发票详情页实现，具体表现为查询页模块分离，方便以后的开发，多组织的处理，分页显示，结构化数据的显示
            </p>
            <p>|-备份前端代码 / 后端代码 到github</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/2/03" placement="top">
          <el-card>
            <p>
              |-网关gateway框架搭建，cookie跨域问题解决，请求跨域问题解决,网关调用服务部署并测通
              ------ [张琪]
            </p>
            <p>|-发票清单设计，网关测试</p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="2020/2/02" placement="top">
          <el-card>
            <p>|-又断更了很多天...</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/27" placement="top">
          <el-card>
            <p>|-把进项的相关页面搬了过来</p>
            <p>|-解决了海亮授权失败的事情</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/26" placement="top">
          <el-card>
            <p>|-之前有段时间没更新了，明天开始更新</p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="2020/1/22" placement="top">
          <el-card>
            <p>|-将A01开票单体服务改造成微服务，并完成前端页面的路由改造</p>
            <p>|-将A02开票单体服务改造成微服务，并完成前端页面的路由改造</p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="2020/1/12" placement="top">
          <el-card>
            <p>|-WEB前端大图预览插件的制作，实现了发票归档的发票预览</p>
            <p>|-WEB前端右键菜单的制作，为以后的扩展功能而准备</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/08" placement="top">
          <el-card>
            <p>
              |-多图圈定完整测试, 更新内容:对于单张发票 不会 圈定
              ，只会旋转;对于多张发票，圈定+识别，对于没识别出来的发票，不会进行图片圈定旋转处理
            </p>
            <p>|-涂鸦维护，红票开不出来，多方面排查后发现对方接口的问题</p>
            <p>|-简化代码，移除错误数据存储模块;</p>
            <p>
              |-导入涂鸦电票测试数据，对新增代码，税额，未税金额月限额控制代码
              进行 测试，发现bug并已经纠正;
            </p>
            <p>
              |-测试中优化了几句代码，最后测试连续开出45张发票，发现发票在存储的时候存在问题;
            </p>
          </el-card>
        </el-timeline-item>

        <el-timeline-item timestamp="2020/1/08" placement="top">
          <el-card>
            <p>
              |-发票档案控制层编写与前端实现，具体表现为前端档案页面设计，前端文件导航编写，与后端对接
            </p>
            <p>|-涂鸦数据备份，以便明天测试</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/07" placement="top">
          <el-card>
            <p>
              |-发票档案数据库设计，考虑到以后的扩展，设计成文件系统适配，即新增表File,共16个字段，以后不仅可以存储pdf文件,还可以存储其他
            </p>
            <p>|-发票下载到本地的功能[张琪]</p>
            <p>|-发票PDF文件转成IMG图片[张琪]</p>
            <p>|-表对应的mapper抒写，与service层，dao层基础功能后端实现</p>
            <p>
              |-发票存储逻辑，简单而言是，据url下载到本地存储，转换成img预览图片存储，将文件信息持久导数据库做档案，方便前端做各种查询
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/06" placement="top">
          <el-card>
            <p>
              |-logo修改，icon修改，版权修改，具体表现为前端代码增加，修改，图片logo去白底
            </p>
            <p>
              |-修改组织为所有组织时图表的显示，具体表现前端处理，后端sql语句限定
            </p>
            <p>|-多图圈定修改，具体是 InputStream流的问题</p>
            <p>
              |-公牛发票开具页面查询串数据 排查后 排除 OMS组织 和
              部署，具体表现为mapper语句增加限定
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/05" placement="top">
          <el-card>
            <p>|-部署的环境判断，比如证书没有就会提示报错[0.5h]</p>
            <p>|-解决了图表显示bug,缓存没有区分组织以及单日子[0.5h]</p>
            <p>|-解决了登录时提示错误bug[0.1h]</p>
            <p>|-解决了部署环境下文件系统日志文件显示异常的bug[0.5h]</p>
            <p>|-公牛性能优化和部署[7h]</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/04" placement="top">
          <el-card>
            <p>|-发票多图圈定,旋转功能实现[4h]</p>
            <p>|-新增视图，对查询进行速度优化，对oracle进行兼容[1h]</p>
            <p>|-中金租赁维护[0.3h]</p>
            <p>
              |-未税限额、税额限制字段前端添加和显示及后端功能实现,待测试[3h]
            </p>
            <p>|-高级查询增加开票日期，还存有bug[1h]</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/03" placement="top">
          <el-card>
            <p>
              |-前端新增所有组织之后的调整,包括首页，包括查询页，使用到了map去重，过滤器等TIPS[3h]
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/29" placement="top">
          <el-card>
            <p>|-取数频率和张数控制</p>
            <p>|-数据库oracle环境切换[张琪]</p>
            <p>|-开票查询时候groupStatus状态 bug 异常处理</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/28" placement="top">
          <el-card>
            <p>|-发票详情页设计和实现</p>
            <p>|-条形图统计，设备信息显示</p>
            <p>|-测试</p>
            <p>|-饼图统计-----------[张琪]</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/25" placement="top">
          <el-card>
            <p>|-近30天发票任务动态统计</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/24" placement="top">
          <el-card>
            <p>|-首页设计优化，新增查询图表，日志与信息与图表分开</p>
            <p>|-测试开票与同步，解决了可能出现的隐患</p>
            <p>|-折扣行处理</p>
            <p>|-重新计算税额处理</p>
            <p>|-首页图标优化</p>
            <p>|-登陆失效死循环BUG,登录界面优化</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/23" placement="top">
          <el-card>
            <p>|-红冲接口/设备查询</p>
            <p>|-手动开票：1对组开票 2对单开票</p>
            <p>|-功能测试:同步BUG修复</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/22" placement="top">
          <el-card>
            <p>|-解锁功能与测试,多开票线路的设计前端实现，后端实现</p>
            <p>|-高级查询bug修护和时间查询功能 -----------[张琪]</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/21" placement="top">
          <el-card>
            <p>|-初步测试，完整逻辑，发现bug,解锁功能测试Bug修护</p>
            <p>|-实现发票解锁功能</p>
            <p>|-解决深拷贝/当回传sap异常时对数据库回滚</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/20" placement="top">
          <el-card>
            <p>|-前端高级查询页面优化美观度</p>
            <p>
              |-
              重新检验代码逻辑，添加测试环境，测试，发现bug，简化重构代码，使思路清晰
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/19" placement="top">
          <el-card>
            <p>|-中坚分组算法的BUG修复</p>
            <p>
              |-
              扩展功能补充，发票结果，行尾差计算，头尾差计算，头发票号拼接统一拦截处理
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/18" placement="top">
          <el-card>
            <p>|-周日: 前端发票查询页面的显示和各种查询的实现</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/17" placement="top">
          <el-card>
            <p>|-周六: 接口的封装和严格控制税差，遇到接口验证的问题</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/16" placement="top">
          <el-card>
            <p>
              |-前端登录逻辑实现 和
              界面优化，前端组织，用户信息重构。解决排版闪现问题。
            </p>
            <p>
              |-
              前端实现组织切换，各种开票控制选项的逻辑控制，开票启动，日志显示；后端重新对加载各种类型数据进行条件完善，优化完善简化代码；
            </p>
            <p>|- 涂鸦智能，公牛归档。</p>
            <p>
              |-
              后端BUG修复，针对用户随意请求开票进行排除，防止多线程泛滥崩溃。修改死循环BUG;修改开票错误逻辑控制.
            </p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/15" placement="top">
          <el-card>
            <p>
              |-前端框架测试美化 ，升级到vue3.0 ,解决页面排版 自适应 不足的问题
              ，解决 标签页 不能 关闭等难题 ，重构代码 。
            </p>
            <p>|-前端页面迁移。优化页面效果。</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style></style>
