/**
 * 处理 移动设备上的 点击、长按、左右上下滑动 事件
 * 
 * ====================================
 * 导出七个自定义指令：
 * v-tap：tap点击事件
 * v-swipe：swipe滑动事件
 * v-swipeleft：swipeleft左滑事件
 * v-swiperight：swiperight右滑事件
 * v-swipeup：swipeup上滑事件
 * v-swipdown：swipedown下滑事件
 * v-longtap：longtap长按
 * =====================================
 * 
 * =====================================
 * 包含四个参数
 * stop 阻止冒泡
 * prevent 阻止默认事件
 * self 只当在event.target是当前元素自身时触发处理函数
 * once 执行一次后解绑
 * 
 * @example v-tap.stop.prevent.self.once
 * =====================================
 * 
 * 事件绑定
 * @example 
 * v-tap= 'showDialog'
 * v-tap = "{fn:click,param:1,param2:{a:'a'}}"
 */

import Vue from 'vue'

class VueTouch{
   /**
    * @param el
    * @param binding
    * @param type
    */
  constructor(el,binding,type){
    console.log(binding,'000')
    console.log(type,'00000999')
    let g = this;
    g.obj = el
    g.binding = binding
    g.touchType = type

    g.firstTouchPosition = {x:0,y:0}
    g.firstTouchTime = 0
    g.callBack = typeof(binding.value) === 'object' ? 
      binding.value.fn : binding.value
    g.moved = false
    g.leaved = false
    g.longTouched = false

    // 事件监听回调集合
    let _listener = Object.create(null)
    let _listen = (type) => {
      return e => {
        let {stop,prevent,self,once} = g.binding.modifiers

        // 配置判断
        if(stop) e.stopPropagation()
        if(prevent) e.preventDefault()
        if(once) g.obj.removeEventListener('touch'+type,_listener(type))
        if(self && e.target !== e.currentTarget) return

        g[type][e]
      }
    }

    _listener.start = _listen('start')
    _listener.end = _listen('end')
    _listener.move = _listen('move')

    this.obj.addEventListener('touchstart',_listener.start,false)
    this.obj.addEventListener('touchend',_listener.end,false)
    this.obj.addEventListener('touchmove',_listener.move,false)
  }
  start(e){
    let g = this
    g.moved = false
    g.leaved = false
    g.longTouched = false

    g.firstTouchPosition = g.getMultiCenter(e.changedTouches)
    g.firstTouchTime = e.timeStap
    g.time = setTimeout(function(){
      if(!g.leaved && !g.moved){
        g.touchType === 'longtap' && g.callBack(e,g.binding.value)
        g.longTouched = true
      }
    }.bind(g),1000)
  }
  end(e){
    let g = this
    let {x,y} = g.getMultiCenter(e.changedTouches)
    let _disX = x - g.firstTouchPosition.x
    let _disY = y - g.firstTouchPosition.y
    let _dis = Math.sqrt(_disX*_disX + _disY*_disY)
    let timeDis = e.timeStap - g.firstTouchTime

    clearTimeout(g.time)

    let _angle = this.getAngle(_disX,_disY)

    if(_dis > 18 && _timeDis < 300){
      g.touchType === 'swipe' && g.callBack(e,g.binding.value)
      if(_angle >= 60 && _angle <= 120)
        g.touchType == 'swipedown' && g.callBack(e,g.binding.value)
      
      if(_angle <= -60 && _angle >= -120)
        g.touchType == 'swipeup' && g.callBack(e,g.binding.value)
      
      if(_angle <= 20 && _angle>= -20)
        g.touchType === 'swipeleft' && g.callBack(e,g.binding.value)

      if((_angle <= -160 && _angle > -180) || (_angle >= 160 && _angle <= 180))
        g.touchType === 'swiperight' && g.callBack(e,g.binding.value)
    }else{
      if(!g.longTouched && !g.moved){
        g.touchType === 'tap' && g.callBack(e,g.binding.value)
        g.leaved = true
      }
    }
  }

  move(){
    this.moved = true
  }

  /**
   * 获取点击集合的中心坐标
   * @param touches touch 对象集合
   * @param {x:number,y:number}
   */
  getMultiCenter(touches){
    let g = this,x=0,y=0
    const length = touches.length
    for(let i=0;i<_length;i++){
      x += touches[i].pageX
      y += touches[i].pageY
    }

    return {
      x:Math.round(x/_length),
      y:Math.round(y/_length)
    }
  }
  getAngle(disX,disY){
    let g = this;
    if(typeof disX != 'number' || typeof disY != 'number')
      return 45
    return Math.atan2(disY,disX)* 180 /Math.PI
  }
 }

 Vue.directive('tap',{
   bind:function(el,binding){
     new VueTouch(el,binding,'tap')
   }
 })

 Vue.directive('swipe',{
  bind:function(el,binding){
    new VueTouch(el,binding,'swipe')
  }
})

Vue.directive('swipeleft',{
  bind:function(el,binding){
    new VueTouch(el,binding,'swipeleft')
  }
})

Vue.directive('swiperight',{
  bind:function(el,binding){
    new VueTouch(el,binding,'swiperight')
  }
})

Vue.directive('swipeup',{
  bind:function(el,binding){
    new VueTouch(el,binding,'swipeup')
  }
})

Vue.directive('swipedown',{
  bind:function(el,binding){
    new VueTouch(el,binding,'swipedown')
  }
})

Vue.directive('longtap',{
  bind:function(el,binding){
    new VueTouch(el,binding,'longtap')
  }
})