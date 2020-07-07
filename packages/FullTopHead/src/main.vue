<template>
  <div class="pipi-h5-top">
    <div v-if="show" ref="topHead" class="pipi-h5-full-top-head"
        :class="{'pipi-h5-full-top-head_fixed':fixed}">
      <div class="pipi-h5-full-top-head_placeholder">
      </div>
      <div class="pipi-h5-full-top-head_bd">
        <div ref="back" class="pipi-h5-full-top-head_left">
          <slot name="left">
              <div class="pipi-h5-full-top-head_back" @click="goBack"/>
          </slot>
        </div>
        <div class="pipi-h5-full-top-head_center">
          <p v-if="title && opacity>1">{{title}}</p>
          <slot name="center"/>
        </div>
        <div ref="right" class="pipi-h5-full-top-head_right">
          <slot name="right"/>
        </div>
      </div>
    </div>
   <div v-if="!isPiPiApp && outAppShow" class="share-head-down">
        <div class="logo-icon"></div>
        <div class="detail">
            <p class="name">皮皮PiPi</p>
            <p class="remark">随时随地 找人陪你打游戏</p>
        </div>
        <a target="_blank" class="down-btn" href="https://apk.apeiwan.com">下载有礼</a>
    </div>
  </div>
</template>
<script>
import "./assets/style.scss"
import { scrollListener } from "./assets/scrollListener";
import PPJSBridge from '@apeiwan/ppjsbridge'

  const isIphone = /iphone/gi.test(navigator.userAgent);
  const screen = window.screen;
  const isIphoneX = isIphone && (
      (screen.width === 375 && screen.height === 812) // X/XS
      || (screen.width === 414 && screen.height === 896) // XR / XS Max
  );
  document.getElementsByTagName('html')[0].classList.add(!isIphone ? 'full-head-android' : isIphoneX ? 'full-head-iphoneX' : 'full-head-iphone');
  let topHead;
  
  export default {
    name: 'pp-full-top-head',
    props: {
      scrollBgColor: {
        type: String
      },
      bgColor: {
        type: String
      },
      fixed: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      onlyApp: {
        type: Boolean,
        default: true
      },
      outAppShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        opacity: 0,
        show: false,
        isPiPiApp: false
      }
    },
    mounted() {
      this.isPiPiApp = PPJSBridge.isPiPiApp;
      if (this.onlyApp && !PPJSBridge.isPiPiApp) return;
      this.show = true;
      this.$nextTick(() => {
        this.opacity = this.scrollBgColor ? 0 : 1;
        if (this.scrollBgColor) {
          this.bindHeadScroll();
        } else if (this.bgColor) {
          this.$refs.topHead.style.backgroundColor = this.bgColor;
        }
      })
    },
    methods: {
      bindHeadScroll() {
        topHead = this.$refs.topHead;
        scrollListener.bind(this.bindHeadScrollHandle, {
          debounce: 0,
          scrollEl: window,
          contentEl: document
        });
      },

      bindHeadScrollHandle({scrollTop}) {
        const opacity = this.opacity = scrollTop / 100;
        topHead.style.backgroundColor = `rgba(${
            this.scrollBgColor
        },${opacity})`;
      },

      goBack(){
        if (PPJSBridge.isPiPiApp) {
          PPJSBridge.back();
        } else {
          window.history.go(-1);
        }
      },
    }
  }
</script>
