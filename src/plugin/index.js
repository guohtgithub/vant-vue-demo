import testPanel from './panel.vue'
import testToast from './toast.vue'
import upload from './ajax-upload.vue'
let test = {}
test.install = function (Vue, options) {
  Vue.prototype.$msg = 'Hello I am test.js'
  Vue.prototype.$myMethod = function (arr) {
    if (arr.length < 0) {
      return false
    } else {
      arr = arr.join('连接你我')
      return arr
    }
  }
  Vue.component(testPanel.name, testPanel) // testPanel.name 组件的name属性
  Vue.component(testToast.name, testToast) // testPanel.name 组件的name属性
  Vue.component(upload.name, upload) // upload.name 组件的name属性
}
export default test