(function (window, DEVICE) {

  /**
   * todo token问题处理,因为token带有特殊字符 # ，容易导致单页应用路由问题，因此在存储和获取时需处理一下
   */
  window.getToken = function () {
    var getStorageToken = decodeURIComponent(localStorage.getItem('token') || sessionStorage.getItem('token'));
    return ['undefined', 'null'].indexOf(getStorageToken) === -1 ? getStorageToken : ''
  };

  /**
   * jquery extend
   * @type {function(): *}
   */
  window.extend = (function () {
    var isObjFunc = function (name) {
      var toString = Object.prototype.toString
      return function () {
        return toString.call(arguments[0]) === '[object ' + name + ']'
      }
    }
    var isObject = isObjFunc('Object'),
      isArray = isObjFunc('Array'),
      isBoolean = isObjFunc('Boolean')
    return function extend() {
      var index = 0, isDeep = false, obj, copy, destination, source, i
      if (isBoolean(arguments[0])) {
        index = 1
        isDeep = arguments[0]
      }
      for (i = arguments.length - 1; i > index; i--) {
        destination = arguments[i - 1]
        source = arguments[i]
        if (isObject(source) || isArray(source)) {
          for (var property in source) {
            obj = source[property]
            if (isDeep && (isObject(obj) || isArray(obj))) {
              copy = isObject(obj) ? {} : []
              var extended = extend(isDeep, copy, obj)
              destination[property] = extended
            } else {
              destination[property] = source[property]
            }
          }
        } else {
          destination = source
        }
      }
      return destination
    }
  })();

  /**
   * 给 url 添加参数
   * @param {string} url
   * @param {string} stitchingUrlParams
   * @return {*}
   */
  window.addUrlParams = function (url, stitchingUrlParams) {
    var params_prefix = url.indexOf('?') !== -1 ? '&' : '?';
    return url + (stitchingUrlParams ? params_prefix : '') + stitchingUrlParams;
  };

  /**
   * 获取请求的url所有参数(包含search，和 hash)
   * @param url {string=} [window.location.href]
   */
  window.getRequestUrlParam = function (url) {
    var urlHashSearchStr = getUrlHashSearchStr(url);
    var hash_str = urlHashSearchStr.hash_str;
    var search_str = urlHashSearchStr.search_str;
    var hash_str_params_index = hash_str.indexOf('?');
    hash_str = hash_str_params_index !== -1 ? hash_str.substr(hash_str_params_index + 1) + '&' : '';
    var search_str_params_index = search_str.indexOf('?');
    if (search_str_params_index !== -1) {
      search_str = search_str.substr(search_str_params_index + 1);
    }
    var getRequestUrlParams = {};
    if (hash_str_params_index !== -1 || search_str_params_index !== -1) {
      var params_format_url = (hash_str + search_str).split("&");
      for (var i = 0; i < params_format_url.length; i++) {
        var param = params_format_url[i].split("=");
        if (param[0]) {
          var _value = '';
          try {
            _value = decodeURIComponent(param[1]);
          } catch (e) {
            _value = param[1];
          }
          getRequestUrlParams[param[0]] = _value;
        }
      }
    }
    return getRequestUrlParams;
  };

  /**
   * 获取url的hash和search值
   * @param url
   */
  window.getUrlHashSearchStr = function (url) {
    var hash_str = window.location.hash;
    var search_str = window.location.search;
    if (url) {
      var url_hash_index = url.indexOf('#');
      var url_search_index = url.indexOf('?');
      hash_str = url_hash_index !== -1 ? url.substr(url_hash_index) : '';
      if (url_search_index < url_hash_index || (url_search_index !== -1 && url_hash_index === -1)) {
        var length = url_search_index < url_hash_index ? url_hash_index - url_search_index : url.length;
        search_str = url.substr(url_search_index, length);
      } else {
        search_str = '';
      }
    }
    return {
      hash_str: hash_str,
      search_str: search_str
    };
  };

  /**
   * 将JSON对象拼接成GET URL形式参数
   * @param params
   * @returns {string}
   */
  window.getStitchingUrlParams = function (params) {
    var strParams = '';
    for (var keyItem in params) {
      var value = params[keyItem];
      if (value !== '') {
        strParams += keyItem + '=' + encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value) + '&';
      }
    }
    return strParams ? strParams.substr(0, strParams.length - 1) : ""
  };

  /**
   * 格式化非法的正常的url 如 http://xxx.xx.com/?code=abcdefs#/
   * @returns {string}
   */
  window.getHttpUrlFormat = function (url) {
    var url_params = window.getRequestUrlParam(url);
    var urlHashSearchStr = getUrlHashSearchStr(url);
    var hash_str = urlHashSearchStr.hash_str;
    var hash_str_params = hash_str.indexOf('?');
    url = url || window.location.href;
    // url是否有特殊类型的设定,如 http://xxx.xx.com/?code=abcdefs#/order?orderNo=123 需要重定向设置一下
    // 建议在跳转的时候，请采用  window.location.replace 的形式，这样可以删除当前无用的历史记录
    // 有 #/ 并且在之前有 ？号的情况下 就要重新格式化
    if (hash_str && urlHashSearchStr.search_str) {
      var url_params_str = window.getStitchingUrlParams(url_params);
      url_params_str = url_params_str ? (url_params_str.indexOf('?') !== -1 ? '&' : '?') + url_params_str : '';
      return window.location.origin + '/' + hash_str.substr(0, hash_str_params !== -1 ? hash_str_params : hash_str.length) + url_params_str;
    }
    return url;
  };

  /**
   * 获取 hash 类型 url path  路径
   * @param url {string} [url=window.location.href]
   * @returns {*}
   */
  window.getRequestHashPath = function (url) {
    var hash_search = getUrlHashSearchStr(getHttpUrlFormat(url || window.location.href));
    var hash_str = hash_search.hash_str;
    if (hash_str) {
      var params_index = hash_str.indexOf('?');
      return hash_str.substr(0, params_index !== -1 ? params_index : hash_str.length);
    }
    return '';
  };

  /**
   * 获取纯粹的url地址,不要任何参数
   * @param url
   */
  window.getHttpSheerUrl = function (url) {
    var format_url = window.getHttpUrlFormat(url);
    if (format_url.indexOf('?') !== -1) {
      format_url = format_url.substr(0, format_url.indexOf('?'));
    }
    return format_url;
  };

  /**
   * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
   * @param func 执行函数
   * @param wait 时间间隔
   * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
   *                如果你想禁用最后一次执行的话，传递{trailing: false}
   * @returns {Function}
   */
  window.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /**
   * 兼容iphoneX浏览器的滚动隐藏底部效果
   */
  window.iPhoneXScrollHackBind = function () {
    throttle(function () {
      var scale = window.innerWidth / window.screen.width;
      if (window.screen.height - window.innerHeight / scale < 100) {
        html.classList.add('fix-iphonex-bottom');
      } else {
        html.classList.remove('fix-iphonex-bottom');
      }
    }, 200);
  };

  /**
   * 百度事件统计
   * @constructor
   */
  window.baiDuTrackEvent = function (params) {
    if (window._hmt) {
      try {
        _hmt.push(['_trackEvent'].concat(params));
        // eslint-disable-next-line no-empty
      }catch (e) {

      }
    }
  };

  /**
   * iphone 手机底部导航兼容,在滑动时
   */
  if (DEVICE.iphoneX) {
    window.addEventListener('scroll', window.iPhoneXScrollHackBind, false);
  }

}(window, DEVICE));
