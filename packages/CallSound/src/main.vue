<template>
  <div
    v-if="list.length"
    class="call-sound"
  >
    <transition-group
      appear
      tag="div"
      @after-enter="switchCallShow"
      @before-leave="callShowNext"
      name="call-sound-animated"
    >
      <div
        v-for="(item,index) in list"
        :key="'animated'+index"
        v-show="index===showIndex"
        class="call-sound_bd"
      >
        <slot :item="item"></slot>
      </div>
    </transition-group>
  </div>

</template>
<script>
import "./assets/style.scss";
export default {
  name: "PpCallSound",
  props: {
    // 滚动列表
    list: {
      type: Array
    },
    showSecond: {
      type: Number,
      default: 2000 // 显示时间控制，单位 ms
    }
  },
  data() {
    return {
      showIndex: 0,
      nextShowIndex: 1
    };
  },
  computed: {
    listTotalRows() {
      return this.list.length;
    }
  },
  methods: {
    switchCallShow() {
      setTimeout(() => {
        this.nextShowIndex += 1;
        this.showIndex = -1;
      }, this.showSecond);
    },
    callShowNext() {
      if (this.nextShowIndex === this.listTotalRows) {
        this.showIndex = this.nextShowIndex = 0;
      } else {
        this.showIndex = this.nextShowIndex;
      }
    }
  }
};
</script>
