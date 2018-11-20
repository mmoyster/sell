<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratings-header">
        <div class="left">
          <div class="score">{{seller.score}}</div>
          <div class="score-text">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="foodScore">
            <span class="text">食物味道</span>
            <div class="star-container">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <div class="star-container">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <choose :selectedType="selectedType" :ratings="ratings" @typeSelect="changeType" @haveText="textHave" ref="choose" v-if="ratings.length>0"></choose>
      <ul class="ratings-list">
        <li class="ratings-item border-1px" v-for="rating in ratings" :key="rating.index" v-show="showRating(rating.rateType,rating.text)">
          <div class="user">
            <span class="avatar"><img :src="rating.avatar" width="28px" height="28px" alt="用户头像" /></span>
            <div class="message">
              <div class="name">{{rating.username}}</div>
              <div class="star-container">
                <star :size="24" :score="rating.score"></star>
                <span class="serviceTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
            </div>
          </div>
          <div class="text">{{rating.text}}</div>
          <div class="recommend">
            <span class="icon-thumb_up" v-show="rating.rateType===0"></span>
            <span class="icon-thumb_down" v-show="rating.rateType===1"></span>
            <ul class="recommend-list">
              <li class="recommend-item" v-for="item in rating.recommend" :key="item.index">{{item}}</li>
            </ul>
          </div>
          <div class="time">{{transformDate(rating.rateTime)}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import star from '../star/star';
import split from '../split/split';
import choose from '../choose/choose';
import BScroll from 'better-scroll';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectedType: {
        all: '全部',
        good: '满意',
        bad: '不满意'
      },
      ratings: [],
      typeSelect: 2,
      onlyContent: false
    };
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body;
      if (res.errno === 0) {
        this.ratings = res.data;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, { click: true });
          } else {
            this.scroll.refresh();
          }
        });
      }
    });
  },
  methods: {
    transformDate(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      return year + '-' + month + '-' + d + ' ' + h + ':' + m;
    },
    changeType(type) {
      this.typeSelect = type;
    },
    textHave(bool) {
      this.onlyContent = bool;
    },
    showRating(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.typeSelect === 2) {
        return true;
      }
      if (this.typeSelect === type) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    star,
    split,
    choose
  }
};

</script>
<style>
.ratings {
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.ratings-content .ratings-header {
  display: flex;
  width: 100%;
}

.ratings-content .ratings-header .left {
  flex: 0 0 137px;
  width: 137px;
  margin: 18px 0;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}

@media screen and (max-device-width:340px) {
  .ratings-content .ratings-header .left {
    flex: 0 0 120px;
    width: 120px;
  }
}

.ratings-content .ratings-header .right {
  flex: 1;
  margin: 18px 24px;
  font-size: 0;
}

@media screen and (max-device-width:375px) {
  .ratings-content .ratings-header .right {
    margin: 18px 5px;
  }
}

.ratings-header .left .score {
  text-align: center;
  line-height: 28px;
  font-size: 24px;
  color: rgb(255, 153, 0);
}

.ratings-header .left .score-text {
  margin-top: 6px;
  text-align: center;
  line-height: 12px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-header .left .rankRate {
  margin-top: 8px;
  text-align: center;
  line-height: 10px;
  font-size: 10px;
  color: rgba(7, 17, 27, 0.5);
}

.ratings-header .right .foodScore .text {
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-header .right .foodScore .star-container {
  display: inline-block;
  vertical-align: top;
  margin: 1px 12px 0 12px;
}

.ratings-header .right .foodScore .score {
  line-height: 18px;
  font-size: 12px;
  color: rgb(255, 153, 0);
}

.ratings-header .right .serviceScore {
  margin-top: 8px;
}

.ratings-header .right .serviceScore .text {
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-header .right .serviceScore .star-container {
  display: inline-block;
  vertical-align: top;
  margin: 1px 12px 0 12px;
}

.ratings-header .right .serviceScore .score {
  line-height: 18px;
  font-size: 12px;
  color: rgb(255, 153, 0);
}

.ratings-header .right .deliveryTime {
  margin-top: 8px;
}

.ratings-header .right .deliveryTime .text {
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-header .right .deliveryTime .time {
  display: inline-block;
  margin-left: 12px;
  line-height: 18px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}

.ratings-content .ratings-list {
  padding: 0 18px;
  font-size: 0;
}

.ratings-content .ratings-list .ratings-item {
  position: relative;
  padding: 18px 0;
}

.ratings-item .user .avatar {
  display: inline-block;
  vertical-align: top;
  width: 28px;
  height: 28px;
}

.ratings-item .user .message {
  display: inline-block;
  vertical-align: top;
  margin-left: 12px;
}

.ratings-item .user .message .name {
  line-height: 12px;
  font-size: 10px;
  color: rgb(7, 17, 27);
}

.ratings-item .user .message .star-container {
  margin-top: 4px;
}

.message .star-container .serviceTime {
  margin-left: 6px;
  line-height: 12px;
  font-size: 10px;
  font-weight: 200;
  color: rgb(147, 153, 159);
}

.ratings-list .ratings-item .text {
  margin: 6px 0 0 40px;
  line-height: 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-list .ratings-item .recommend {
  margin: 8px 0 0 40px;
}

.ratings-item .recommend .icon-thumb_up {
  line-height: 16px;
  font-size: 12px;
  color: rgb(0, 160, 220);
}

.ratings-item .recommend .icon-thumb_down {
  line-height: 16px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}

.ratings-item .recommend .recommend-list {
  display: inline-block;
}

.ratings-item .recommend .recommend-list .recommend-item {
  display: inline-block;
  margin-left: 8px;
  padding: 0 6px;
  border: 1px solid rgba(7, 17, 27, 0.1);
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  line-height: 16px;
  font-size: 9px;
  color: rgb(147, 153, 159);
}

.ratings-list .ratings-item .time {
  position: absolute;
  right: 0;
  top: 18px;
  line-height: 12px;
  font-size: 10px;
  font-weight: 200;
  color: rgb(147, 153, 159);
}

</style>
