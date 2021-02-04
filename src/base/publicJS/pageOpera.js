export default {
  addPage: (Old, Obj) => { // 页签新增
    // 如果是新页签则新增页签
    // 如果是页签存在 则跳转到页签
    // 返回最新的数组
    let csIndex = '0'
    let isNewPage = true
    let oldL = Old.length
    if (oldL === 0) {
      isNewPage = true
    } else {
      for (let i = 0; i < Old.length; i++) {
        let item = Old[i]
        if (item.menuView === Obj.menuView) {
          csIndex = item.menuView
          isNewPage = false
          break
        }
      }
    }
    let resultArr = Old
    if (isNewPage) {
      resultArr.push(Obj)
      csIndex = Obj.menuView
    }
    let result = {
      arr: resultArr,
      cs: csIndex
    }
    return result
  },
  removePage: (Old, delObj) => { // 页签删除
    // 删除页签
    // 判断数组是否为空，是则返回固定代码
    // 若不为空则跳转前一个的页签
    // 返回最新的数组
    let delIndex = Old.indexOf(delObj)
    let resultArr = Old.filter(function (item, index) {
      return item.menuView !== delObj.menuView
    })
    let newCs = resultArr[delIndex - 1].menuView
    let result = {
      arr: resultArr,
      cs: newCs
    }
    return result
  }
}
