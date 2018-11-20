<template>
  <transition name="rightFade">
    <div class="food" v-show="foodShow" ref="foodContent">
      <div class="food-content">
        <div class="img-container">
          <img :src="food.image" alt="商品图片" />
        </div>
          <div class="back" @click="back">
            <span class="icon-arrow_lift"></span>
          </div>
          <div class="food-message">
            <h1 class="title">{{food.name}}</h1>
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span><br />
            <span class="price_icon">￥</span>
            <span class="price">{{food.price}}</span>
            <span class="oldPrice_icon" v-show="food.oldPrice">￥</span>
            <span class="oldPrice" v-show="food.oldPrice">{{food.oldPrice}}</span>
            <div class="countButton-wrapper">
              <countButton :food="food"></countButton>
            </div>
            <transition name="fade">
              <div class="shopButton" v-show="!food.count" @click="addShop">加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="food-description" v-show="food.description">
            <h1 class="title">商品介绍</h1>
            <div class="description">{{food.description}}</div>
          </div>
          <split v-show="food.description"></split>
          <div class="ratings-container">
            <h1 class="title">商品评价</h1>
            <choose :ratings="food.ratings" @typeSelect="changeType" @haveText="textHave" ref="choose"></choose>
            <ul class="ratings-list" v-show="food.ratings">
              <li class="rating-item border-1px" v-for="rating in food.ratings" :key="rating.index" v-show="showRating(rating.rateType,rating.text)">
                <div class="time">{{transformDate(rating.rateTime)}}</div>
                <span class="icon-thumb_up" v-show="rating.rateType===0"></span>
                <span class="icon-thumb_down" v-show="rating.rateType===1"></span>
                <span class="text">{{rating.text}}</span>
                <div class="user">
                  <span class="phone">{{rating.username}}</span>
                  <span class="avatar"><img :src="rating.avatar" width="12px" height="12px" /></span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings">暂无评价</div>
          </div>
        </div>
      </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll';
import countButton from '../countButton/countButton';
import split from '../split/split';
import choose from '../choose/choose';
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data() {
    return {
      foodShow: false,
      typeSelect: 2,
      onlyContent: false
    };
  },
  methods: {
    show() {
      this.$refs.choose.initial();
      this.typeSelect = 2;
      this.onlyContent = false;
      this.foodShow = true;
      this.$nextTick(() => {
        if (!this.srcoll) {
          this.srcoll = new BScroll(this.$refs.foodContent, { click: true });
        } else {
          this.srcoll.refresh();
        }
      });
    },
    back() {
      this.foodShow = false;
    },
    addShop() {
      this.$set(this.food, 'count', 1);
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
    },
    transformDate(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      return year + '-' + month + '-' + d + ' ' + h + ':' + m;
    }
  },
  computed: {},
  components: {
    countButton,
    split,
    choose
  }
};

</script>
<style>
.rightFade-enter-active,
.rightFade-leave-active {
  transition: all 0.4s;
}

.rightFade-enter,
.rightFade-leave-to {
  transform: translate3d(100%, 0, 0);
}

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}

.food .food-content .img-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}

.food .food-content {
  font-size: 0;
}

.food .food-content .img-container img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.food .food-content .back {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  padding: 6px;
}

.food .food-content .back .icon-arrow_lift {
  line-height: 20px;
  font-size: 20px;
  color: #fff;
}

.food .food-content .food-message {
  position: relative;
  padding: 0 18px 18px 18px;
}

.food .food-content .food-message .title {
  margin-top: 18px;
  line-height: 14px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
}

.food .food-content .food-message .sellCount {
  display: inline-block;
  margin-top: 8px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.food .food-content .food-message .rating {
  padding-left: 12px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.food .food-content .food-message .price_icon {
  display: inline-block;
  margin-top: 18px;
  line-height: 24px;
  font-size: 10px;
  font-weight: normal;
  color: rgb(240, 20, 20);
}

.food .food-content .food-message .price {
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}

.food .food-content .food-message .oldPrice_icon {
  margin-left: 12px;
  line-height: 24px;
  font-size: 10px;
  font-weight: normal;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}

.food .food-content .food-message .oldPrice {
  line-height: 24px;
  font-size: 10px;
  font-weight: 700;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}

.food .food-content .food-message .countButton-wrapper {
  position: absolute;
  right: 18px;
  bottom: 18px;
}

.food .food-content .food-message .shopButton {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 74px;
  height: 24px;
  border-radius: 12px;
  background-color: rgb(0, 160, 220);
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color: #fff;
}

.food-message .fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.food-message .fade-enter,
.fade-leave-to {
  opacity: 0;
}

.food .food-content .food-description {
  width: 100%;
  padding: 18px;
}

.food .food-content .food-description .title {
  line-height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(7, 17, 27);
}

.food .food-content .food-description .description {
  margin: 6px 8px 0 8px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(77, 85, 93);
}

.food .food-content .ratings-container .title {
  margin: 18px 0 0 18px;
  line-height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(7, 17, 27);
}

.food-content .ratings-container .ratings-list {
  padding: 0 18px;
}

.food-content .ratings-container .ratings-list .rating-item {
  position: relative;
  padding: 16px 0;
}

.food-content .ratings-container .ratings-list .rating-item .time {
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.ratings-list .rating-item .icon-thumb_up {
  display: inline-block;
  vertical-align: top;
  margin: 6px 4px 0 0;
  line-height: 24px;
  font-size: 12px;
  color: rgb(0, 160, 220);
}

.ratings-list .rating-item .icon-thumb_down {
  display: inline-block;
  vertical-align: top;
  margin: 6px 4px 0 0;
  line-height: 24px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}

.ratings-list .rating-item .text {
  display: inline-block;
  vertical-align: top;
  margin-top: 6px;
  line-height: 24px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}

.ratings-list .rating-item .user {
  position: absolute;
  right: 0;
  top: 16px;
}

.ratings-list .rating-item .user .phone {
  display: inline-block;
  vertical-align: top;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.ratings-list .rating-item .user .avatar {
  display: inline-block;
  vertical-align: top;
  margin-left: 6px;
  width: 12px;
  height: 12px;
}

.food-content .ratings-container .no-rating {
  padding: 16px 18px 16px 18px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}

</style>
