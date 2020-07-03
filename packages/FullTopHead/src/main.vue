<template>
    <div v-if="show" ref="topHead" class="pipi-h5-full-top-head"
         :class="{'pipi-h5-full-top-head_fixed':fixed,'right-tools':giftEntry}">
        <div class="pipi-h5-full-top-head_placeholder">
        </div>
        <div class="pipi-h5-full-top-head_bd">
            <div v-if="!giftEntry" ref="back" class="pipi-h5-full-top-head_left">
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
</template>
<script>
import "./assets/style.scss"
  import { scrollListener } from "./assets/scrollListener";

  const isIphone = /iphone/gi.test(navigator.userAgent);
  const screen = window.screen;
  const isIphoneX = isIphone && (
      (screen.width === 375 && screen.height === 812) // X/XS
      || (screen.width === 414 && screen.height === 896) // XR / XS Max
  );
  document.getElementsByTagName('html')[0].classList.add(!isIphone ? 'full-head-android' : isIphoneX ? 'full-head-iphoneX' : 'full-head-iphone');
  let topHead;
  const params = window.getRequestUrlParam();

  const { PPJSBridge, DEVICE } = window;
  export default {
    name: 'PPFullTopHead',
    props: {
      scrollBgRgbColor: {
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
      }
    },
    data() {
      return {
        opacity: 0,
        show: true,
        giftEntry: params.source && DEVICE.ios && PPJSBridge.isPiPiApp
      }
    },
    mounted() {
      if (this.onlyApp && !PPJSBridge.isPiPiApp) return;
      this.show = true;
      this.$nextTick(() => {
        this.opacity = this.scrollBgRgbColor ? 0 : 1;
        if (DEVICE.ios && params.source && PPJSBridge.isPiPiApp) {
          this.$refs.topHead.style.width = this.$refs.right.clientWidth + 'px';
        } else {
          if (this.scrollBgRgbColor) {
            this.bindHeadScroll();
          } else if (this.bgColor) {
            this.$refs.topHead.style.backgroundColor = this.bgColor;
          }
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
            this.scrollBgRgbColor
        },${opacity})`;
      },

      goBack(){
        if (PPJSBridge.isPiPiApp) {
          PPJSBridge.back();
        } else {
          window.history.go(-1);
        }
      }
    }
  }
</script>
