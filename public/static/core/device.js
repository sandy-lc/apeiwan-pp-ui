/**
 * 设备信息
 * @type {string}
 */
(function (window, document) {

  window.DEVICE = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windowsPhone: false,
    iphone: false,
    iphoneX: false,
    ipod: false,
    ipad: false,
    edge: false,
    ie: false,
    isWeiXin: false,
    isWeiXinAndroid: false,
    isWeiXiniOS: false,
    isQQ: false,
    isQQAndroid: false,
    isQQiOS: false,
    isWeiBo: false,
    isWeiBoAndroid: false,
    isWeiBoiOS: false,
    firefox: false,
    macos: false,
    windows: false,
    app: 'browser',
    mode: 'browser',
    cordova: !!(window.cordova || window.phonegap),
    phonegap: !!(window.cordova || window.phonegap),
  };
  var platform = window.navigator.platform;
  var ua = window.navigator.userAgent;
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var windowsPhone = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/) || ua.match(/(Android);?([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var iphoneX = iphone && (
    (screenWidth === 375 && screenHeight === 812) // X/XS
    || (screenWidth === 414 && screenHeight === 896) // XR / XS Max
  );
  var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
  var edge = ua.indexOf('Edge/') >= 0;
  var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
  var macos = platform === 'MacIntel';
  var windows = platform === 'Win32';
  DEVICE.ua = ua;
  DEVICE.ie = ie;
  DEVICE.edge = edge;
  DEVICE.firefox = firefox;
  DEVICE.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || window.navigator.standalone))
    || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  // Windows
  if (windowsPhone) {
    DEVICE.os = 'windows';
    DEVICE.osVersion = windows[2];
    DEVICE.windowsPhone = true;
  }
  // Android
  if (android && !windows) {
    DEVICE.os = 'android';
    DEVICE.osVersion = android[2];
    DEVICE.android = true;
    DEVICE.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    DEVICE.os = 'ios';
    DEVICE.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    DEVICE.osVersion = iphone[2].replace(/_/g, '.');
    DEVICE.iphone = true;
    DEVICE.iphoneX = iphoneX;
  }
  if (ipad) {
    DEVICE.osVersion = ipad[2].replace(/_/g, '.');
    DEVICE.ipad = true;
  }
  if (ipod) {
    DEVICE.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    DEVICE.iphone = true;
  }
  // iOS 8+ changed UA
  if (DEVICE.ios && DEVICE.osVersion && ua.indexOf('Version/') >= 0) {
    if (DEVICE.osVersion.split('.')[0] === '10') {
      DEVICE.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }
  // Desktop
  DEVICE.desktop = !(DEVICE.os || DEVICE.android);
  if (DEVICE.desktop) {
    DEVICE.macos = macos;
    DEVICE.windows = windows;
  }
  DEVICE.isWeiXin = /MicroMessenger/i.test(ua);
  DEVICE.isWeiXinAndroid = DEVICE.isWeiXin && DEVICE.android;
  DEVICE.isWeiXiniOS = DEVICE.isWeiXin && DEVICE.ios;
  DEVICE.isWeiBo = /WeiBo/i.test(ua);
  DEVICE.isWeiBoAndroid = DEVICE.isWeiBo && DEVICE.android;
  DEVICE.isWeiBoiOS = DEVICE.isWeiBo && DEVICE.ios;
  DEVICE.isQQ = / QQ/i.test(ua);
  DEVICE.isQQiOS = DEVICE.isQQ && DEVICE.ios;
  DEVICE.isQQAndroid = DEVICE.isQQ && DEVICE.android;
  DEVICE.isJym = ua.indexOf('jym_mobile') !== -1 || ua.indexOf('JymApp') !== -1; // 交易猫的标识
  DEVICE.isJymiOS = DEVICE.isJym && DEVICE.ios;
  DEVICE.isJymAndroid = DEVICE.isJym && DEVICE.android;
  var classNames = [];
  var html = document.querySelector('html');
  // Pixel Ratio
  DEVICE.pixelRatio = window.devicePixelRatio || 1;
  // Pixel Ratio
  classNames.push('device-pixel-ratio-' + Math.floor(DEVICE.pixelRatio));
  if (DEVICE.pixelRatio >= 2) {
    classNames.push('device-retina');
  }
  if (DEVICE.isWeiXin) {
    DEVICE.app = 'weixin';
    classNames.push('app-weixin');
  }
  if (DEVICE.isQQ) {
    DEVICE.app = 'qq';
    classNames.push('app-qq');
  }
  if (DEVICE.isWeiBo) {
    DEVICE.app = 'weibo';
    classNames.push('app-weibo');
  }
  if (DEVICE.isJym) {
    DEVICE.app = 'jym';
    DEVICE.mode = 'jym';
    classNames.push('app-jym');
    if (DEVICE.iphone) {
      classNames.push(DEVICE.iphoneX ? 'app-jym-iphoneX' : 'app-jym-iphone');
    }
  }
  // OS classes
  if (DEVICE.os) {
    classNames.push(
      'device-' + DEVICE.os,
      'device-' + DEVICE.os + '-' + DEVICE.osVersion.split('.')[0],
      'device-' + DEVICE.os + '-' + DEVICE.osVersion.replace(/\./g, '-')
    );
    if (DEVICE.os === 'ios') {
      var major = parseInt(DEVICE.osVersion.split('.')[0], 10);
      for (var i = major - 1; i >= 6; i -= 1) {
        classNames.push('device-ios-gt-' + i);
      }
      if (DEVICE.iphoneX) {
        classNames.push('device-iphone-x');
      }
    }
  } else if (DEVICE.desktop) {
    classNames.push('device-desktop');
    if (DEVICE.macos) classNames.push('device-macos');
    else if (DEVICE.windows) classNames.push('device-windows');
  }
  // Add html classes
  for (var i = 0; i < classNames.length; i++) {
    html.classList.add(classNames[i]);
  }

  var min_style = document.createElement('style');
  var minScreenHeight = window.screen.height + 'px';
  var minInnerHeight = window.innerHeight + 'px';
  min_style.innerHTML = '.g-inner-full-height {height:' + minInnerHeight + '}  .g-screen-avail-height {height:' + window.screen.availHeight + 'px} .g-screen-full-height {height:' + minScreenHeight + '} .g-min-screen-full-height{min-height:' + minScreenHeight + '}  .g-min-inner-full-height{min-height:' + minInnerHeight + '}';
  document.getElementsByTagName('head').item(0).appendChild(min_style);
})(window, document);
