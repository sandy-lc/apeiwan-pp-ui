<template>
  <div id="app">
    <pp-full-top-head
      scroll-bg-color="14,85,99"
      fixed
      title="宝石迷踪"
      :show-share="true"
    ></pp-full-top-head>
    <PPCallSound
      class="call-sound-test"
      :list="list"
    >
      <template v-slot:default="slotProps">
        <span>恭喜</span>
        <p class="nickname hint">{{slotProps.item.nickname}}</p>
        <span>抽中了</span>
        <span class="hint">{{slotProps.item.lotteryName}}</span>
      </template>
    </PPCallSound>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      list: [
        {
          userId: 2064782,
          nickname: "Xwヾ小馨馨❤墨兮",
          lotteryId: 1,
          lotteryName: "森林之星(50热度)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 23:37:18",
          objectUrl: null
        },
        {
          userId: 1811162,
          nickname: "Ry烟味 嘛呀养乐多",
          lotteryId: 1,
          lotteryName: "魔力法典-聊天气泡(5天)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 23:14:33",
          objectUrl: null
        },
        {
          userId: 1493142,
          nickname: "你有毒～忆琳",
          lotteryId: 1,
          lotteryName: "权力之杖(100热度)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 23:13:24",
          objectUrl: null
        },
        {
          userId: 1493142,
          nickname: "你有毒～忆琳",
          lotteryId: 1,
          lotteryName: "宝石迷踪-房间壁纸(60天)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 23:13:15",
          objectUrl: null
        },
        {
          userId: 1945968,
          nickname: "小猫挠我手心",
          lotteryId: 1,
          lotteryName: "权力之杖(100热度)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 22:47:01",
          objectUrl: null
        },
        {
          userId: 961042,
          nickname: "Y✨月亮❄️琉璃球球",
          lotteryId: 1,
          lotteryName: "永恒之冠(200热度)",
          lotteryType: 101,
          num: 1,
          pakName: "宝盒抽取",
          createTime: "2020-07-03 20:31:23",
          objectUrl: null
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(0, 0, 0);
}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 200%;
  background: pink;
}
.call-sound-test {
  width: 564px;
  height: 40px;
  background: rgba(39, 82, 81, 1);
  border-radius: 20px;
  top: 225px;
}
span {
  flex-shrink: 0;
}

.hint {
  padding: 0 6px;
  color: #ffaddf;
}

.nickname {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
