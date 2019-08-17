import countDown from './countdown'
countDown.install = function(Vue){
  Vue.component(countDown.name,countDown)
}
export default countDown