// 去全部空格
export function Trim(str,global){
  let result
  result = str.replace(/(^\s+)|(\s+$)/g,'')
  if(global.toLowerCase() == 'g'){
    result = result.replace(/\s/g,'')
  }
  return result
}

// 前面补零
export function fillPreZero(num,len){
  return (Array(len).join(0) + num).slice(-len);;
}

// pc or mobile
export const toolMethod = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod|iOS/i) ? true : false;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  any: function () {
    return (toolMethod.Android() || toolMethod.BlackBerry() || toolMethod.iOS() || toolMethod.Windows());
  },
  AppClient: function () {
    return toolMethod.AppAndroid() || toolMethod.AppIOS()
  },
  Electron: function () {
    return !!navigator.userAgent.match(/Electron/i);
  },
  Weixin: function () {
    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
  }
}

//设置localStorage
export function setLocalStorage(key, value) {
  if (key) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

//获取localStorage
export function getLocalStorage(key) {
  if (key) {
    return window.localStorage.getItem(key);
  } else {
    return null;
  }
}

//清除localStorage
export function removeLocalStorage(key) {
  if (key) {
    localStorage.removeItem(key);
  }
}

//设置sessionStorage
export function setSessionStorage(key, value) {
  if (key) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }
}

//获取sessionStorage
export function getSessionStorage(key) {
  if (key) {
    return window.sessionStorage.getItem(key);
  } else {
    return null;
  }
}

//清除sessionStorage
export function removeSessionStorage(key) {
  if (key) {
    sessionStorage.removeItem(key);
  }
}
//小于10补0
export function toDouble(n) {
  return n < 10 ? '0' + n : n
}

// 设置Cookie
export function setCookie(name, value) {
  // var Days = 30; //设置cookie有效时间30天
  // var exp = new Date();
  // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
  document.cookie = name + "=" + escape(value) + ";expires=; path=/";
}

// 获取Cookie
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
  }
  return "";
}

// 删除Cookie
export function delCookie(name) {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  let cval = commonMthods.getCookie(name);
  if (cval != null)
    document.cookie = name + "=cval;expires=" + date.toGMTString() + "; path=/";
}

// 图片转Base64
export function uploadfilePromise(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = function (e) {
      resolve(e.target.result)
    }
  })
}

function canvasBase64(img) {
  var canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext("2d")
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL("image/png") // 可选其他值 image/jpeg

  return dataURL
}

export function getNetImageBase64(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()

    img.crossOrigin = "*"
    img.src = src + '?v=' + Math.random()
    img.onload = () => resolve(canvasBase64(img))
    img.onerror = reject
  })
}

// file 路径处理
export function getFileURL(file) {
  if (file === undefined) return

  let getUrl = null

  if (window.createObjectURL != undefined) { // basic
      getUrl = window.createObjectURL(file)
  } else if (window.URL != undefined) { // mozilla(firefox)
      getUrl = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) { // webkit or chrome
      getUrl = window.webkitURL.createObjectURL(file)
  }

  return getUrl
}

// 下载图片
export function downloadURI(dataurl, filename) {
  var a = document.createElement("a")
  a.href = dataurl
  a.setAttribute("download", filename)
  var b = document.createEvent("MouseEvents")
  b.initEvent("click", false, true)
  a.dispatchEvent(b)

  return false
}

// 倒计时处理
export function InitTime(time) {
  let day, hour, minute, second
  if (time > 0) {
      day = parseInt(time / 3600 / 24)
      hour = parseInt(time / 3600 % 24)
      minute = parseInt(time / 60 % 60)
      second = parseInt(time % 60)
      day = day < 10 ? '0' + day : day
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
  } else {
      day = hour = minute = second = '00'
  }
  return [day, hour, minute, second]
}