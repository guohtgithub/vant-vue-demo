MyPlugin.install = function(Vue,options){
  // 添加全局方法或属性
  Vue.myGlobalMethod = function(){
    //todo
  }

  // 添加全局资源
  Vue.directive('my-directive',{
    bind(el,binding,vnode,oldVnode){
      // todo
    }
  })

  // 注入组件
  Vue.mixin({
    created:function(){
      // todo
    }
  })

  // 添加实例方法
  Vue.prototype.$myMethod = function(myGlobalMethod){
    // todo
  }
}