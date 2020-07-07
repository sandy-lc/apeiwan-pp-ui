<template>
    <div v-if="list.length" class="call-sound">
        <transition
                :key="index"
                appear
                @after-enter="switchCallShow"
                @before-leave="callShowNext"
                v-for="(item,index) in list"
                name="call-sound-animated">
            <div v-show="index===showIndex" class="call-sound_bd">
                <span>恭喜</span>
                <p class="nickname hint">{{item.nickname}}</p>
                <span>抽中了</span>
                <span class="hint">{{item.lotteryName}}</span>
            </div>
        </transition>
    </div>

</template>
<script>
  import './assets/style.scss'

  // 显示时间控制，单位 ms
  let SHOW_SECOND = 2000;
  export default {
    name: 'PPCallSound',
    data() {
      return {
        list: [],
        showIndex: -1,
        nextShowIndex: -1,
      }
    },
    created() {
      this.listAsync();
    },
    computed: {
      listTotalRows() {
        return this.list.length
      }
    },
    methods: {
      switchCallShow() {
        setTimeout(() => {
          this.nextShowIndex += 1;
          this.showIndex = -1;
        }, SHOW_SECOND)
      },
      callShowNext() {
        if (this.nextShowIndex === this.listTotalRows) {
          this.showIndex = this.nextShowIndex = 0;
        } else {
          this.showIndex = this.nextShowIndex;
        }
      },
      async listAsync() {
        try {
          this.list [{"userId":2064782,"nickname":"Xwヾ小馨馨❤墨兮","lotteryId":1,"lotteryName":"森林之星(50热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 23:37:18","objectUrl":null},{"userId":1811162,"nickname":"Ry烟味 嘛呀养乐多","lotteryId":1,"lotteryName":"魔力法典-聊天气泡(5天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 23:14:33","objectUrl":null},{"userId":1493142,"nickname":"你有毒～忆琳","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 23:13:24","objectUrl":null},{"userId":1493142,"nickname":"你有毒～忆琳","lotteryId":1,"lotteryName":"宝石迷踪-房间壁纸(60天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 23:13:15","objectUrl":null},{"userId":1945968,"nickname":"小猫挠我手心","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 22:47:01","objectUrl":null},{"userId":1072891,"nickname":"Ry.离渊","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 22:11:08","objectUrl":null},{"userId":1445045,"nickname":"Ry.熊抱❄️软糖糖","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 21:22:17","objectUrl":null},{"userId":623320,"nickname":"xk芥末\uD83C\uDF38钧甯","lotteryId":1,"lotteryName":"森林之星(50热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 21:20:09","objectUrl":null},{"userId":623320,"nickname":"xk芥末\uD83C\uDF38钧甯","lotteryId":1,"lotteryName":"森林之星(50热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 21:20:05","objectUrl":null},{"userId":1320418,"nickname":"Q.大少爷\uD83C\uDF65珊珊","lotteryId":1,"lotteryName":"魔力法典-入场特效(5天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:38:30","objectUrl":null},{"userId":2207068,"nickname":"\uD83E\uDD14刘公子\uD83D\uDC95怼怼","lotteryId":1,"lotteryName":"魔力法典-入场特效(5天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:32:26","objectUrl":null},{"userId":2207068,"nickname":"\uD83E\uDD14刘公子\uD83D\uDC95怼怼","lotteryId":1,"lotteryName":"森林之星(50热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:32:23","objectUrl":null},{"userId":2207068,"nickname":"\uD83E\uDD14刘公子\uD83D\uDC95怼怼","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:32:20","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"永恒之冠(200热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:31:23","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"永恒之冠(200热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:31:22","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"永恒之冠(200热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:31:21","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"魔力法典-个人名牌(5天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:31:18","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"永恒之冠(200热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:30:56","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"魔力法典-座位框(5天)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:30:56","objectUrl":null},{"userId":961042,"nickname":"Y✨月亮❄️琉璃球球","lotteryId":1,"lotteryName":"权力之杖(100热度)","lotteryType":101,"num":1,"pakName":"宝盒抽取","createTime":"2020-07-03 20:30:56","objectUrl":null}];
         
          this.$nextTick(() => {
            if (!this.list.length) return;
            this.nextShowIndex = 0;
            this.callShowNext()
          })
        } catch (e) {
          console.log('错误提示',e)
        }
      }
    }
  }
</script>
