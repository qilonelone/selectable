const isFunction = (arg) => {
  return Object.prototype.toString.call(arg) === '[object Function]'
}
export default (Vue) => {
  let areaSelect
  let isMouseDown
  let reactArea = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  }
  const over = (ele, bindingValue, timeout = 0) => {
    if (!isMouseDown) return
    isMouseDown = false
    let selList = ele.getElementsByClassName(bindingValue.className)
    let _l = areaSelect.offsetLeft
    let _t = areaSelect.offsetTop
    let _w = areaSelect.offsetWidth
    let _h = areaSelect.offsetHeight
    let selectedIndexs = []
    for (let i = 0; i < selList.length; i++) {
      let sl = selList[i].offsetWidth + selList[i].offsetLeft
      let st = selList[i].offsetHeight + selList[i].offsetTop
      if (sl > _l && st > _t && selList[i].offsetLeft < _l + _w && selList[i].offsetTop < _t + _h) {
        selectedIndexs.push(i)
      }
    }
    setTimeout(() => {
      areaSelect.style.cssText = 'display:none'
      if (isFunction(bindingValue.overSelect)) {
        bindingValue.overSelect(selectedIndexs)
      }
      selectedIndexs = []
    }, timeout)
  }
  const listener = (ele, binding) => {
    ele.addEventListener('mousedown', (e) => {
      isMouseDown = true
      reactArea.startX = e.layerX
      reactArea.startY = e.layerY
    })
    ele.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return
      // return false
      reactArea.endX = e.layerX
      reactArea.endY = e.layerY
      let widthValue = Math.abs(reactArea.startX - reactArea.endX)
      let heightValue = Math.abs(reactArea.startY - reactArea.endY)
      let leftValue = Math.min(reactArea.startX, reactArea.endX)
      let topValue = Math.min(reactArea.startY, reactArea.endY)
      areaSelect.style.cssText = `display:block;left:${leftValue}px;top:${topValue}px;width:${widthValue}px;height:${heightValue}px;position:absolute;opacity:0.4;border:1px solid #000;background:#000;pointer-events:none`
    }, true)
    ele.addEventListener('mouseup', (e) => {
      over(ele, binding.value)
    })
    ele.addEventListener('mouseleave', (e) => {
      over(ele, binding.value, 500)
    })
  }
  const init = (ele) => {
    ele.style.cssText = 'position:relative;user-select:none;'
    areaSelect = document.createElement('div')
    ele.append(areaSelect)
  }
  Vue.directive('selectable', {
    inserted: listener,
    updated: listener,
    bind: init
  })
}
