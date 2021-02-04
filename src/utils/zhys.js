import { Message } from 'element-ui'

let toMerge = (sortDataArrayCr, orderChoose) => {
  //    console.log(eval(`function parse(){console.log("test");}`));

  if (!sortDataArrayCr || sortDataArrayCr.length <= 0) {
    Message.error('原始单据没有数据！')
    retrun
  }
  if (!orderChoose) {
    Message.error('请选择合并方式！')
    return
  }
  Message.info('正在进行合并运算，请稍后...')
  //排序
  var sortDataArray = sortarrayOne(sortDataArrayCr)
  // 单据合并后的结果
  let OneHbArray = []
  if (orderChoose == '1') {
    var item = JSON.parse(JSON.stringify(sortDataArray[0]))
    item.itemNameOrg = sortDataArray[0].itemName //物料名
    item.itemNumOrg = sortDataArray[0].itemNum //物料编号
    item.itemSpecOrg = sortDataArray[0].itemSpec //物料规格
    item.taxCatecodeOrg = sortDataArray[0].taxCatecode //税收分类编码
    item.unitNameOrg = sortDataArray[0].unitName //计量单位名称
    item.quantityOrg = sortDataArray[0].quantity //数量

    for (var i = 1; i <= sortDataArray.length; i++) {
      //         如果  第1个物料名 等于 第2个物料名， 物料规格 = 第2个物料规格 ，计量单位 = 第2个计量单位 ， 税率 = 第 2个税率 ，税收分类编码 = 第2个税收分类 编码    就判定为相同物料
      if (
        !!sortDataArray[i] &&
        item.itemName == sortDataArray[i].itemName &&
        item.itemSpec == sortDataArray[i].itemSpec &&
        item.unitName == sortDataArray[i].unitName &&
        item.taxRate == sortDataArray[i].taxRate &&
        item.taxCatecode == sortDataArray[i].taxCatecode
      ) {
        item.quantity = math
          .parser()
          .eval(item.quantity + '+' + sortDataArray[i].quantity)
          .toFixed(2)
        item.zamountHsj = math
          .parser()
          .eval(item.zamountHsj + '+' + sortDataArray[i].zamountHsj)
          .toFixed(2)
        item.zamountWsj = math
          .parser()
          .eval(item.zamountWsj + '+' + sortDataArray[i].zamountWsj)
          .toFixed(2) //未税净金额 相加
        item.zamountSej = math
          .parser()
          .eval(item.zamountSej + '+' + sortDataArray[i].zamountSej)
          .toFixed(2) //净税额 相加
        item.zamountHzhs = math
          .parser()
          .eval(item.zamountHzhs + '+' + sortDataArray[i].zamountHzhs)
          .toFixed(2) //以前的另一个含税金额
        item.zamountHzws = math
          .parser()
          .eval(item.zamountHzws + '+' + sortDataArray[i].zamountHzws)
          .toFixed(2) //以前的另一个未税金额
        item.zamountHzse = math
          .parser()
          .eval(item.zamountHzse + '+' + sortDataArray[i].zamountHzse)
          .toFixed(2) //以前的另一个税额
        item.zamountHsy = math
          .parser()
          .eval(item.zamountHsy + '+' + sortDataArray[i].zamountHsy)
          .toFixed(2) //含税原金额 相加
        item.zamountWsy = math
          .parser()
          .eval(item.zamountWsy + '+' + sortDataArray[i].zamountWsy)
          .toFixed(2) //未税原金额 相加
        item.zamountSey = math
          .parser()
          .eval(item.zamountSey + '+' + sortDataArray[i].zamountSey)
          .toFixed(2)
        if (!item.quantity || item.quantity == 0) {
          //如果数量 为0
          item.zpriceHsj = math
            .parser()
            .eval(item.zpriceHsj + '*1')
            .toFixed(8)
          item.zpriceWsj = math
            .parser()
            .eval(item.zpriceWsj + '*1')
            .toFixed(8) //未税净单价为未始单据的含税净单价
        } else {
          //不为0重算 单价
          item.zpriceHsj = math
            .parser()
            .eval(item.zamountHsj + '/' + item.quantity)
            .toFixed(8) //重算含税净单价
          item.zpriceWsj = math
            .parser()
            .eval(item.zamountWsj + '/' + item.quantity)
            .toFixed(8) //重算未税净单价
        }
        item.quantityOrg = item.quantity
      } else {
        item.docLine = OneHbArray.length + 1
        var a = item.itemName || item.itemSpec || item.unitName
        if (a) {
          item.docLine = OneHbArray.length + 1
          OneHbArray.push(item)
        }
        if (!!sortDataArray[i]) {
          item = sortDataArray[i]
          item.itemNameOrg = sortDataArray[i].itemName
          item.itemNumOrg = sortDataArray[i].itemNum
          item.itemSpecOrg = sortDataArray[i].itemSpec
          item.unitNameOrg = sortDataArray[i].unitName
          item.taxCatecodeOrg = sortDataArray[i].taxCatecode
          item.quantityOrg = sortDataArray[i].quantity
        }
      }
    }
  } else if (orderChoose == '2') {
    var item = JSON.parse(JSON.stringify(sortDataArray[0]))
    item.itemNameOrg = sortDataArray[0].itemName
    item.itemNumOrg = sortDataArray[0].itemNum
    item.itemSpecOrg = sortDataArray[0].itemSpec
    item.taxCatecodeOrg = sortDataArray[0].taxCatecode
    item.unitNameOrg = sortDataArray[0].unitName
    item.quantityOrg = sortDataArray[0].quantity
    for (var i = 1; i <= sortDataArray.length; i++) {
      if (
        !!sortDataArray[i] &&
        item.itemName == sortDataArray[i].itemName &&
        item.itemSpec == sortDataArray[i].itemSpec &&
        item.unitName == sortDataArray[i].unitName &&
        item.taxRate == sortDataArray[i].taxRate &&
        item.taxCatecode == sortDataArray[i].taxCatecode &&
        item.zpriceHsj == sortDataArray[i].zpriceHsj
      ) {
        item.quantity = math
          .parser()
          .eval(item.quantity + '+' + sortDataArray[i].quantity)
          .toFixed(2)
        item.zamountHsj = math
          .parser()
          .eval(item.zamountHsj + '+' + sortDataArray[i].zamountHsj)
          .toFixed(2)
        item.zamountWsj = math
          .parser()
          .eval(item.zamountWsj + '+' + sortDataArray[i].zamountWsj)
          .toFixed(2)
        item.zamountSej = math
          .parser()
          .eval(item.zamountSej + '+' + sortDataArray[i].zamountSej)
          .toFixed(2)
        item.zamountHzhs = math
          .parser()
          .eval(item.zamountHzhs + '+' + sortDataArray[i].zamountHzhs)
          .toFixed(2)
        item.zamountHzws = math
          .parser()
          .eval(item.zamountHzws + '+' + sortDataArray[i].zamountHzws)
          .toFixed(2)
        item.zamountHzse = math
          .parser()
          .eval(item.zamountHzse + '+' + sortDataArray[i].zamountHzse)
          .toFixed(2)
        item.zamountHsy = math
          .parser()
          .eval(item.zamountHsy + '+' + sortDataArray[i].zamountHsy)
          .toFixed(2)
        item.zamountWsy = math
          .parser()
          .eval(item.zamountWsy + '+' + sortDataArray[i].zamountWsy)
          .toFixed(2)
        item.zamountSey = math
          .parser()
          .eval(item.zamountSey + '+' + sortDataArray[i].zamountSey)
          .toFixed(2)
        if (!item.quantity || item.quantity == 0) {
          item.zpriceHsj = math
            .parser()
            .eval(item.zpriceHsj + '*1')
            .toFixed(8)
          item.zpriceWsj = math
            .parser()
            .eval(item.zpriceWsj + '*1')
            .toFixed(8)
        } else {
          item.zpriceHsj = math
            .parser()
            .eval(item.zamountHsj + '/' + item.quantity)
            .toFixed(8)
          item.zpriceWsj = math
            .parser()
            .eval(item.zamountWsj + '/' + item.quantity)
            .toFixed(8)
        }
        item.quantityOrg = item.quantity
      } else {
        item.docLine = OneHbArray.length + 1
        var a = item.itemName || item.itemSpec || item.unitName
        if (a) {
          item.docLine = OneHbArray.length + 1
          OneHbArray.push(item)
        }
        if (!!sortDataArray[i]) {
          item = sortDataArray[i]
          item.itemNameOrg = sortDataArray[i].itemName
          item.itemNumOrg = sortDataArray[i].itemNum
          item.itemSpecOrg = sortDataArray[i].itemSpec
          item.unitNameOrg = sortDataArray[i].unitName
          item.taxCatecodeOrg = sortDataArray[i].taxCatecode
          item.quantityOrg = sortDataArray[i].quantity
        }
      }
    }
  } else {
    //当前行
    var item = JSON.parse(JSON.stringify(sortDataArray[0]))
    item.itemNameOrg = sortDataArray[0].itemName
    item.itemNumOrg = sortDataArray[0].itemNum
    item.itemSpecOrg = sortDataArray[0].itemSpec
    item.taxCatecodeOrg = sortDataArray[0].taxCatecode
    item.unitNameOrg = sortDataArray[0].unitName
    item.quantityOrg = sortDataArray[0].quantity

    for (var i = 1; i <= sortDataArray.length; i++) {
      var a = item.itemName && item.itemSpec && item.unitName
      if (
        !!sortDataArray[i] &&
        !a &&
        item.itemName == sortDataArray[i].itemName &&
        item.itemSpec == sortDataArray[i].itemSpec &&
        item.unitName == sortDataArray[i].unitName &&
        item.taxRate == sortDataArray[i].taxRate &&
        item.taxCatecode == sortDataArray[i].taxCatecode &&
        item.zpriceHsj == sortDataArray[i].zpriceHsj
      ) {
        //合并空行
        console.log('我没有合并了')
      } else {
        var a = item.itemName || item.itemSpec || item.unitName
        if (a) {
          //不合并
          item.docLine = OneHbArray.length + 1
          OneHbArray.push(item)
        }

        if (!!sortDataArray[i]) {
          item = sortDataArray[i]
          item.itemNameOrg = sortDataArray[i].itemName
          item.itemNumOrg = sortDataArray[i].itemNum
          item.itemSpecOrg = sortDataArray[i].itemSpec
          item.unitNameOrg = sortDataArray[i].unitName
          item.taxCatecodeOrg = sortDataArray[i].taxCatecode
          item.quantityOrg = sortDataArray[i].quantity
        }
      }
    }
    //OneHbArray = sortDataArray;
  }
  return OneHbArray
}

// isQdlist是否清单开票
// mergeAmt,gsMaxMoeny 拼单金额和发票限额，可为空
var garray = []
var groupA = {
  bigGroup: [],
  smallGroup: [],
}
var sxMoney = null
var nq = 0
var groupSortArray = []

let toSplitLine = (
  OneHbArray,
  goldtaxCode,
  goldtaxNum,
  mergeAmt,
  gsMaxMoeny,
  isQdlist
) => {
  if (!OneHbArray || OneHbArray.length == 0) {
    Message.error('请先配置一次合并数据')
    return
  }
  groupA = {
    bigGroup: [],
    smallGroup: [],
  }
  Message.info('正在进行分组运算，请稍后...')
  garray = []
  var getoneHbArray1 = OneHbArray.slice(0)
  var getoneHbArray = getoneHbArray1.slice(0)

  let kpGroupArray = []
  var sxMoney1 = parseFloat(mergeAmt) * 10000 //页面设置开票金额
  var sxMoney2 = parseFloat(gsMaxMoeny)
  sxMoney = gsMaxMoeny > sxMoney1 ? gsMaxMoeny : sxMoney1
  if (!sxMoney) {
    sxMoney = 10000
  }
  var n = 0 //组号
  var isfuzhu = 'Z' //判断含税金额是否是负数：Z：正数，F：负数

  var n = 0 //组号
  var isfuzhu = 'Z' //判断含税金额是否是负数：Z：正数，F：负数
  for (var i = 0; i < getoneHbArray.length; i++) {
    var groupTaxRate = getoneHbArray[i].taxRate
    if (!groupTaxRate || groupTaxRate == 0) {
      sxMoney = gsMaxMoeny > sxMoney1 ? gsMaxMoeny : sxMoney1
      if (!sxMoney) {
        sxMoney = 10000
      }
      sxMoney = parseFloat(sxMoney - 0.01)
    }
    //计算金额/单价/数量
    var oneHsjMoney = parseFloat(getoneHbArray[i].zamountHsj)
    var oneWsjMoney = parseFloat(getoneHbArray[i].zamountWsj) //一次合并含税净金额
    var oneSejMoney = parseFloat(getoneHbArray[i].zamountSej) //一次合并含税净金额
    if (oneHsjMoney < 0) {
      isfuzhu = 'F'
      //含税金额取绝对值
      oneHsjMoney = Math.abs(oneHsjMoney)
      oneWsjMoney = Math.abs(oneWsjMoney)
      oneSejMoney = Math.abs(oneSejMoney)
    }
    var groupHsjPrice = 0
    if (!getoneHbArray[i].zpriceHsj || getoneHbArray[i].zpriceHsj == 0) {
      groupHsjPrice = oneHsjMoney > sxMoney ? sxMoney : oneHsjMoney
    } else if (parseFloat(getoneHbArray[i].zpriceHsj) < 0) {
      groupHsjPrice = Math.abs(
        parseFloat(getoneHbArray[i].zpriceHsj).toFixed(8)
      )
    } else {
      groupHsjPrice = parseFloat(getoneHbArray[i].zpriceHsj).toFixed(8) //开票分组含税净单价
    }

    var groupHsjQuantity = 1 //数量
    var thisysdjquantity = 1
    if (!getoneHbArray[i].quantity || getoneHbArray[i].quantity == 0) {
      groupHsjQuantity = 1 //开票分组数量
      thisysdjquantity = 0 //等于0，赋值为0
    } else if (parseFloat(getoneHbArray[i].quantity) < 0) {
      //若单价为负数 则取绝对值
      groupHsjQuantity = Math.abs(
        parseFloat(getoneHbArray[i].quantity).toFixed(8)
      )
    } else {
      groupHsjQuantity = parseFloat(getoneHbArray[i].quantity).toFixed(8) //开票分组数量
      thisysdjquantity = 1 //大于0，赋值为1
    }
    var groupWsjPrice = parseFloat(getoneHbArray[i].zpriceWsj).toFixed(8) //开票分组未税净单价
    var groupHsyPrice = parseFloat(getoneHbArray[i].zpriceHsy).toFixed(8) //开票分组未税原单价
    var groupWsyPrice = parseFloat(getoneHbArray[i].zpriceWsy).toFixed(8) //开票分组未税原单价
    var groupNum = parseInt(sxMoney / groupHsjPrice)
    if (groupNum == 0) {
      //防止以上情况出现
      groupNum = 1
    }
    var HsjgroupMoney = math
      .parser()
      .eval(groupNum + '*' + groupHsjPrice)
      .toFixed(2) //开票分组含税净金额
    var WsjgroupMoney = math
      .parser()
      .eval(groupNum + '*' + groupWsjPrice)
      .toFixed(2) //开票分组未税净金额

    var HsygroupMoney = math
      .parser()
      .eval(groupNum + '*' + groupHsyPrice)
      .toFixed(2)
    var WsygroupMoney = math
      .parser()
      .eval(groupNum + '*' + groupWsyPrice)
      .toFixed(2) //开票分组未税原金额

    var YseMoney = math
      .parser()
      .eval(HsygroupMoney + '-' + WsygroupMoney)
      .toFixed(2) //开票分组原税额
    var JseMoney = math
      .parser()
      .eval(HsjgroupMoney + '-' + WsjgroupMoney)
      .toFixed(2) //开票分组净税额
    if (!getoneHbArray[i].quantity || !getoneHbArray[i].zpriceHsj) {
      console.log('重算开票分组净税额')
      JseMoney = math
        .parser()
        .eval(HsjgroupMoney + '*' + groupTaxRate + '/(1+' + groupTaxRate + ')')
        .toFixed(2)
      console.log(JseMoney)
      console.log('重算分组未税净金额')
      WsjgroupMoney = math
        .parser()
        .eval(HsjgroupMoney + '-' + JseMoney)
        .toFixed(2)
      console.log(WsjgroupMoney)
    }

    var groupStRowsJd = oneHsjMoney / HsjgroupMoney
    var groupStRows = parseInt(oneHsjMoney / HsjgroupMoney)

    //是否是整除
    var pointIndex = String(groupStRowsJd).indexOf('.') + 1 //获取小数点的位置
    var pointCount = String(groupStRowsJd).length - pointIndex //获取小数点后的个数
    //末行余额数据处理（除于限制金额余下金额）
    var groupLastNum = 1
    if (groupNum > 1) {
      groupLastNum = math
        .parser()
        .eval(groupHsjQuantity + '-' + groupNum + '*' + groupStRows)
        .toFixed(0)
    }
    var groupLastHsjMoney = math
      .parser()
      .eval(oneHsjMoney + '-' + HsjgroupMoney + '*' + groupStRows)
      .toFixed(2)
    var groupLastWsjMoney = math
      .parser()
      .eval(oneWsjMoney + '-' + WsjgroupMoney + '*' + groupStRows)
      .toFixed(2)
    var groupLastHsyMoney = math
      .parser()
      .eval(
        getoneHbArray[i].zamountHsy + '-' + HsygroupMoney + '*' + groupStRows
      )
      .toFixed(2)
    var groupLastWsyMoney = math
      .parser()
      .eval(
        getoneHbArray[i].zamountWsy + '-' + WsygroupMoney + '*' + groupStRows
      )
      .toFixed(2)
    var groupLastJseMoney = math
      .parser()
      .eval(oneSejMoney + '-' + JseMoney + '*' + groupStRows)
      .toFixed(2) //最后组净税额
    var groupLastYseMoney = math
      .parser()
      .eval(getoneHbArray[i].zamountSey + '-' + YseMoney + '*' + groupStRows)
      .toFixed(2) //最后组原税额
    var groupLastHsjPrice = math
      .parser()
      .eval(groupLastHsjMoney + '/' + groupLastNum)
      .toFixed(8) //没用
    var groupLastWsjPrice = math
      .parser()
      .eval(groupLastWsjMoney + '/' + groupLastNum)
      .toFixed(8) //没用
    var groupLastHsyPrice = math
      .parser()
      .eval(groupLastHsyMoney + '/' + groupLastNum)
      .toFixed(8) //没用
    var groupLastWsyPrice = math
      .parser()
      .eval(groupLastWsyMoney + '/' + groupLastNum)
      .toFixed(8) //没用
    if (!getoneHbArray[i].quantity || !getoneHbArray[i].zpriceHsj) {
      console.log('重算开票最后组净税额')
      groupLastJseMoney = math
        .parser()
        .eval(
          groupLastHsjMoney + '*' + groupTaxRate + '/(1+' + groupTaxRate + ')'
        )
        .toFixed(2) ////由于金额和数量为空 需要重算开票最后组净税额
      console.log(groupLastJseMoney)
      console.log('重算开票最后组净不含税金额')
      groupLastWsjMoney = math
        .parser()
        .eval(groupLastHsjMoney + '-' + groupLastJseMoney)
        .toFixed(2) ////由于金额和数量为空 需要重算最后组未税净金额
      console.log(groupLastWsjMoney)
    }
    if (groupStRows == 0) {
      let groupItem = JSON.parse(JSON.stringify(getoneHbArray[i]))
      if (groupItem.zamountHsj < 0) {
        groupItem.zamountHsj = oneHsjMoney
        groupItem.zamountWsj = oneWsjMoney
        groupItem.zamountSej = oneSejMoney
      }
      groupA.smallGroup.push(groupItem) //放入small组 用于最优算法
      continue
    }
    var groupShowNum = math
      .parser()
      .eval(
        groupNum +
          '*' +
          groupHsjPrice +
          '/' +
          oneHsjMoney +
          '*' +
          groupHsjQuantity
      )
      .toFixed(8)
    for (var j = 0; j < groupStRows; j++) {
      //循环分组数
      let groupItem = JSON.parse(JSON.stringify(getoneHbArray[i]))
      groupItem.goldtaxCode = goldtaxCode
      groupItem.goldtaxNum = goldtaxNum
      groupItem.zamountHsj = HsjgroupMoney //分组后含税金额
      groupItem.zamountWsj = WsjgroupMoney //分组后未税金额
      groupItem.zamountHsy = HsygroupMoney //分组后原含税金额
      groupItem.zamountWsy = WsygroupMoney //分组后原未税金额
      groupItem.zamountSej = JseMoney //分组后净税额
      groupItem.zamountSey = YseMoney //分组后原税额
      //分组后数量
      if (
        (!getoneHbArray[i].zpriceHsj ||
          getoneHbArray[i].zpriceHsj == 0 ||
          groupHsjQuantity > sxMoney) &&
        thisysdjquantity == 1
      ) {
        groupItem.quantity = groupShowNum
      } else {
        groupItem.quantity = groupNum
        groupItem.zpriceHsj = groupHsjPrice
      }

      //如果是负数则所有值均加"-"号
      if (isfuzhu == 'F') {
        if (HsjgroupMoney != 0) {
          groupItem.zamountHsj = '-' + HsjgroupMoney //分组后含税金额
        }
        if (WsjgroupMoney != 0) {
          groupItem.zamountWsj = '-' + WsjgroupMoney //分组后未税金额
        }
        if (HsygroupMoney != 0) {
          groupItem.zamountHsy = '-' + HsygroupMoney //分组后原含税金额
        }
        if (WsygroupMoney != 0) {
          groupItem.zamountWsy = '-' + WsygroupMoney //分组后原未税金额
        }
        if (JseMoney != 0) {
          groupItem.zamountSej = '-' + JseMoney //分组后净税额
        }
        if (YseMoney != 0) {
          groupItem.zamountSey = '-' + YseMoney //分组后原税额
        }
        if (groupNum != 0) {
          if (
            (!getoneHbArray[i].zpriceHsj ||
              getoneHbArray[i].zpriceHsj == 0 ||
              groupHsjQuantity > sxMoney) &&
            thisysdjquantity == 1
          ) {
            groupItem.quantity = '-' + groupShowNum //分组后数量
          } else {
            groupItem.quantity = '-' + groupNum
          }
          //groupItem.quantity = "-"+groupNum; //分组后数量
        }
      }
      if (thisysdjquantity == 0) {
        groupItem.quantity = 0
      }
      groupItem.groupStatus = '0'
      n++
      groupItem.groupNum = 100 + n //分配组号
      groupItem.docLine = 1 //因为一组就一个组号，所以行数一直是"1"；
      kpGroupArray.push(groupItem)
      groupA.bigGroup.push(groupItem)
    }
    if (pointIndex > 0) {
      let groupItemLast = JSON.parse(JSON.stringify(getoneHbArray[i]))
      console.log('这个数字是小数，有' + pointCount + '位小数')
      groupItemLast.goldtaxCode = goldtaxCode //不重要
      groupItemLast.goldtaxNum = goldtaxNum //不重要
      groupItemLast.zamountHsj = groupLastHsjMoney
      groupItemLast.zamountWsj = groupLastWsjMoney
      groupItemLast.zamountHsy = groupLastHsyMoney //重新赋值含税原金额
      groupItemLast.zamountWsy = groupLastWsyMoney //重新赋值未税原金额

      //重新赋值数量
      var groupLastShowNum = math
        .parser()
        .eval(groupHsjQuantity + '-' + groupShowNum + '*' + groupStRows)
        .toFixed(8)
      if (
        (!getoneHbArray[i].zpriceHsj ||
          getoneHbArray[i].zpriceHsj == 0 ||
          groupHsjQuantity > sxMoney) &&
        thisysdjquantity == 1
      ) {
        groupItemLast.quantity = groupLastShowNum
      } else {
        groupItemLast.quantity = groupLastNum
        groupItemLast.zpriceHsj = groupHsjPrice
      }
      if (thisysdjquantity == 0) {
        groupItemLast.quantity = 0
      }
      groupItemLast.zamountSej = groupLastJseMoney
      groupItemLast.zamountSey = groupLastYseMoney
      groupItemLast.groupStatus = '0'
      groupA.smallGroup.push(groupItemLast)
    }
    //n++;
  }

  // ---
  groupA.smallGroup = groupSort(groupA.smallGroup)
  if (groupA.smallGroup.length != 0) {
    //如果small集合不为空
    goodCalc(groupA.smallGroup, n, isQdlist) //计算小集合最优
  } else {
    console.warn('不调用最优算法')
  }
  console.log('groupA:')
  console.log(groupA)
  console.log('garray:')
  console.log(garray)
  if (!garray || garray.length == 0) {
    console.warn('最优算法返回集合为空')
  } else {
    var docLin = 0 //序号（每组重置）
    var groupN = garray[0].groupNum //取第一组组号作为标准
    for (var q in garray) {
      //含税金额为负数 则将金额数量变为负数
      if (isfuzhu == 'F') {
        if (garray[q].zamountHsj != 0) {
          garray[q].zamountHsj = '-' + garray[q].zamountHsj
        }
        if (garray[q].zamountSej != 0) {
          garray[q].zamountSej = '-' + garray[q].zamountSej
        }
        if (garray[q].zamountHsy != 0) {
          garray[q].zamountHsy = '-' + garray[q].zamountHsy
        }
        if (garray[q].zamountWsj != 0) {
          garray[q].zamountWsj = '-' + garray[q].zamountWsj
        }
        if (garray[q].zamountWsy != 0) {
          garray[q].zamountWsy = '-' + garray[q].zamountWsy
        }

        if (garray[q].quantity > 0) {
          garray[q].quantity = '-' + garray[q].quantity
        }
        if (garray[q].quantity < 0) {
          garray[q].quantity = garray[q].quantity
        }
      }
      if (groupN == garray[q].groupNum) {
        docLin++
        garray[q].docLine = docLin //行数赋值
      } else {
        //不一致
        groupN = garray[q].groupNum
        docLin = 0 //行数重置为0
        docLin++
        garray[q].docLine = docLin //行数赋值
      }

      garray[q].groupStatus = '0'

      kpGroupArray.push(garray[q])
    }
  }
  groupSortArray = []
  groupSortArray = kpGroupArray //全局变量方便调用

  // tabcalSum("#table3","#tab-3sumList");//计算合计
  //layer.closeAll('loading');
  // tabChoosess("#ttab3");//打开选项卡
  //switchDocState();
  garray = [] //重置为空

  return groupSortArray
}

let goodCalc = (array, num, isQdlist) => {
  garray = []
  nq = 101 + parseInt(num)
  console.log('最优计算')
  aa(array, isQdlist)
  console.log('最优计算结束')
  groupNumSort(garray)
}

let aa = (array, isQdlist) => {
  // var isQdlist = $("#invoiceList")[0].checked;
  console.log('处理媛:')
  console.log('处理媛:' + array)
  var array1 = array.slice(0)
  console.log('处理媛1:')
  console.log('处理媛:' + array1)
  console.log('数组长度:' + array.length)
  if (array.length > 1) {
    console.log('数组长度---:' + array.length)
    var maxMoney = 0
    for (var i = 0; i < array.length; i++) {
      //从前面加
      var lsArray = []
      maxMoney += parseFloat(array[i].zamountHsj)
      if (maxMoney < sxMoney) {
        array[i].groupNum = nq
        garray.push(array[i])
        //array1.splice(i,1);
        array1[i] = null
        if (getLength(array1) == 0) {
          console.log('>>>>>>>>>>>6')
          console.log(garray)
          return
        }
        maxMoney += parseFloat(array[array.length - i - (i + 1)].zamountHsj)
        if (maxMoney < sxMoney) {
          array[array.length - i - 1].groupNum = nq
          garray.push(array[array.length - i - 1])
          lsArray.push(array[array.length - i - 1])
          //array1.splice(array.length-i-(i+2),1);
          array1[array.length - i - 1] = null
          if ((i + 1) % 4 == 0 && !isQdlist) {
            console.log('-----清单开票自动分组-----')
            console.log('-----组号-----')
            console.log(nq)
            nq++
            aa(getNewArr(array1), isQdlist)
            return
          }
          if (getLength(array1) == 0) {
            console.log('>>>>>>>>>>>5')
            console.log(garray)
            return
          }
          continue
        } else {
          nq++
          lsArray = []
          aa(getNewArr(array1), isQdlist)
          return
        }
      } else {
        maxMoney -= parseFloat(array[i].zamountHsj)
        maxMoney += parseFloat(array[array.length - i - 1].zamountHsj)
        if (maxMoney < sxMoney) {
          array[array.length - i - 1].groupNum = nq
          garray.push(array[array.length - i - 1])
          //array1.splice(array.length-i-(i+1),1);
          array1[array.length - i - 1] = null
          if ((i + 1) % 4 == 0 && !isQdlist) {
            //lsArray.length != 0 &&
            console.log('-----清单开票自动分组-----')
            console.log('-----组号-----')
            console.log(nq)
            nq++
            aa(getNewArr(array1), isQdlist)
            return
          }
          if (getLength(array1) == 0) {
            console.log('>>>>>>>>>>>4')
            console.log(garray)
            return
          }
          continue
        } else {
          //如果超出 则到此即为一个分组
          nq++
          lsArray = []
          aa(getNewArr(array1), isQdlist)
          return
        }
      }
    }
    console.log('>>>>>>>>>>>1')
    console.log(garray)
  } else if (array.length == 1) {
    console.log('====================array.length:' + array.length)
    array[0].groupNum = nq
    garray.push(array[0])
    array1.splice(0, 1)
    console.log('>>>>>>>>>>>2')
    console.log(garray)
    return
  } else if (array.length < 1) {
    // alert(1)
    //console.log(">>>>>>>>>>>3");
    console.log('==============3')
    console.log(garray)
    return
  }
}

let getNewArr = (oldarr) => {
  var newarr = []
  if (oldarr && oldarr.length > 0) {
    for (var i = 0; i < oldarr.length; i++) {
      if (oldarr[i] != null) {
        newarr.push(oldarr[i])
      }
    }
  }
  return newarr
}
//组号排序
let groupNumSort = (array) => {
  console.log(array)
  var a = array.sort(function (a, b) {
    console.log('组号排序:a' + a)
    console.log('组号排序:b' + b)
    console.log('组号排序:a' + a)

    var value1 = a.groupNum,
      value2 = b.groupNum
    console.log('组号排序value1:' + value1)
    console.log('组号排序value2:' + value2)
    return value1 - value2
  })
  return a
}

//分组排序
let groupSort = (array) => {
  var a = array.sort(function (a, b) {
    var value1 = a.zamountHsj,
      value2 = b.zamountHsj
    return value2 - value1
  })
  return a
}
//排序运算
let sortarrayOne = (array) => {
  var a = array.sort((a, b) => {
    var value1 = a.itemName,
      value2 = b.itemName
    if (value1 === value2) {
      //如果物料名相同
      if (b.itemSpec === a.itemSpec) {
        //如果物料规格相同
        if (b.unitName === a.unitName) {
          //如果物料规格相同
          if (b.taxRate === a.taxRate) {
            //税率
            return b.taxCatecode - a.taxCatecode
          }
          return b.taxRate - a.taxRate
        }
        return b.unitName - a.unitName
      }
      return b.itemSpec - a.itemSpec
    }
    //用本地特定的顺序来比较两个字符串。
    return value2.localeCompare(value1)
  })
  return a
}

let getLength = (arr) => {
  var l = 0
  if (arr && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != null) {
        l++
      }
    }
    return l
  } else {
    return 0
  }
}
export { toMerge, toSplitLine }
