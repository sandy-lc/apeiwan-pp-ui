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
}


export let scrollListener = {
  scrollEl: null,
  throttlePullUpScroll: function () {

  },
  /**
   * 滚动绑定
   * @param handle
   * @param {{debounce: number}} params
   * @param {number=} params.debounce
   * @param {HTMLElement} params.scrollEl
   * @param {HTMLElement=} params.contentEl
   */
  bind: function (handle, params) {
    let opts = {
      debounce: 200,
      ...params
    };

    //浏览器视口的高度
    // let windowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //文档的总高度
    // let documentScrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    // 滚动条在Y轴上的滚动距离
    // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    let contentEl = opts.contentEl;
    let scrollEl = opts.scrollEl;
    this.scrollEl = scrollEl;
    // document.addEventListener('mousemove', function () {
    //   scrollEl.style.zIndex = '3'
    // }, false);

    function scrollHandle() {
      // scrollEl.style.zIndex = '3';
      //内容的实际高度
      let contentClientHeight = contentEl ? contentEl.clientHeight : scrollEl.scrollHeight;
      // 滚动条在Y轴上的滚动距离
      let scrollTop = scrollEl.scrollTop;
      if (scrollEl.location) {
        contentClientHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      }
      handle && handle({
        windowClientHeight: scrollEl.clientHeight,
        contentClientHeight,
        isScrollBottom: (scrollTop + scrollEl.clientHeight + 10) >= contentClientHeight,
        scrollTop,
        contentEl,
        scrollEl
      })
    }

    this.throttlePullUpScroll = window.throttle(scrollHandle, opts.debounce);
    scrollEl.addEventListener('scroll', this.throttlePullUpScroll, false);
  },
  remove: function () {
    this.scrollEl && this.scrollEl.removeEventListener('scroll', this.throttlePullUpScroll)
  },
};

export default scrollListener