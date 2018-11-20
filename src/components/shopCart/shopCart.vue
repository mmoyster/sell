<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleFold">
        <div class="content-left">
          <div class="icon-wrapper">
            <div class="icon" :class="{'highlight':totalCounts>0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalCounts>0}"></span>
            </div>
            <div class="foodsNum" v-show="totalCounts>0">{{totalCounts}}</div>
          </div>
          <div class="price"><span class="text" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</span></div>
          <div class="deliveryPrice"><span class="deliveryPrice_text">配送费{{deliveryPrice}}元</span></div>
        </div>
        <div class="content-right" :class="{'enough':totalPrice>=minPrice}" @click.stop.prevent="pay"><span class="minPrice" :class="{'enough':totalPrice>=minPrice}">{{elsePrice}}</span></div>
      </div>
      <transition name="fold">
        <div class="shopList" v-show="listShow">
          <div class="list-header">
            <span class="header-left">购物车</span>
            <span class="header-right" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food-content border-1px" v-for="food in selectFoods" :key="food.index">
                <span class="name">{{food.name}}</span>
                <span class="price">{{food.price*food.count}}</span>
                <div class="countButton-wrapper">
                  <countButton :food="food"></countButton>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="shop_bg" v-show="!fold&&totalCounts>0" @click="toggleFold"></div>
  </div>
</template>
<script>
import countButton from '../countButton/countButton';
import BScroll from 'better-scroll';
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fold: true
    };
  },
  methods: {
    toggleFold() {
      if (!this.totalCounts) {
        return;
      }
      this.fold = !this.fold;
      this.$nextTick(function() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, { click: true });
        } else {
          this.scroll.refresh();
        }
      });
    },
    empty() {
      this.selectFoods.forEach(function(food) {
        food.count = 0;
      });
      this.fold = true;
    },
    pay() {
      if (this.totalPrice >= this.minPrice) {
        let total = this.deliveryPrice + this.totalPrice;
        alert(`你一共需要支付${total}元`);
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(function(food) {
        total += food.price * food.count;
      });
      return total;
    },
    totalCounts() {
      let counts = 0;
      this.selectFoods.forEach(function(food) {
        counts += food.count;
      });
      return counts;
    },
    elsePrice() {
      if (this.totalPrice >= this.minPrice) {
        return '去结算';
      } else if (this.totalPrice < this.minPrice && this.totalPrice > 0) {
        let a = this.minPrice - this.totalPrice;
        return `还差￥${a}起送`;
      } else {
        return `￥${this.minPrice}起送`;
      }
    },
    listShow() {
      if (!this.totalCounts) {
        return false;
      } else {
        return !this.fold;
      }
    }
  },
  components: {
    countButton
  }
};

</script>
<style>
.shopCart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: #141d27;
  font-size: 0;
  z-index: 50;
}

.shopCart .content {
  display: flex;
  background-color: #141d27;
}

.shopCart .content .content-left {
  flex: 1;
}

.shopCart .content .content-right {
  flex: 0 0 105px;
  width: 105px;
  padding: 12px 8px;
  text-align: center;
  background-color: #2b333b;
}

.shopCart .content .content-left .icon-wrapper {
  position: relative;
  display: inline-block;
  top: -10px;
  width: 56px;
  height: 56px;
  margin: 0 12px;
  padding: 6px;
  vertical-align: top;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: #141d27;
}

.shopCart .content .content-left .icon-wrapper .highlight {
  background-color: rgb(0, 160, 220) !important;
  color: rgb(255, 255, 255);
}

.shopCart .content .content-left .icon-wrapper .icon {
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 50%;
  background-color: #2b343c;
}

.shopCart .content .content-left .icon-wrapper .foodsNum {
  position: absolute;
  left: 32px;
  top: 0;
  width: 24px;
  height: 16px;
  border-radius: 12px;
  line-height: 16px;
  text-align: center;
  background-color: rgb(240, 20, 20);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
  font-size: 9px;
  font-weight: 700;
  color: rgb(255, 255, 255);
}

.icon-wrapper .icon .icon-shopping_cart {
  line-height: 44px;
  font-size: 24px;
  color: #80858a;
}

.shopCart .content .content-left .price {
  display: inline-block;
  padding: 12px 0;
}

.shopCart .content .content-left .price .highlight {
  color: rgb(255, 255, 255) !important;
}

.shopCart .content .content-left .price .text {
  padding-right: 12px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
  color: #919396;
  border-right: 1px solid #919396;
}

.shopCart .content .content-left .deliveryPrice {
  display: inline-block;
  padding: 12px 0 12px 12px;
}

.shopCart .content .content-left .deliveryPrice .deliveryPrice_text {
  line-height: 24px;
  font-size: 12px;
  font-weight: normal;
  color: #919396;
}

.shopCart .content .content-right .minPrice {
  line-height: 24px;
  font-size: 12px;
  font-weight: 700;
  color: #919497;
}

.shopCart .content .enough {
  background-color: #09b705 !important;
  color: rgb(255, 255, 255) !important;
}

.shopCart .shopList {
  position: absolute;
  left: 0;
  bottom: 48px;
  width: 100%;
  z-index: -1;
}

.fold-enter,
.fold-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.fold-enter-active,
.fold-leave-active {
  transition: all 0.4s linear;
}

.shopCart .shopList .list-header {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.shopCart .shopList .list-header .header-left {
  position: absolute;
  display: inline-block;
  left: 18px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}

.shopCart .shopList .list-header .header-right {
  position: absolute;
  right: 18px;
  line-height: 40px;
  font-size: 12px;
  color: rgb(0, 160, 220);
}

.shopCart .shopList .list-content {
  max-height: 217px;
  overflow: hidden;
  background-color: #fff;
}

.shopCart .shopList .list-content .food-content {
  position: relative;
  height: 48px;
  margin: 0 18px;
}

.shopCart .shopList .list-content .food-content .name {
  display: inline-block;
  line-height: 48px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.shopCart .shopList .list-content .food-content .price {
  display: inline-block;
  position: absolute;
  right: 92px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}

.list-content .food-content .countButton-wrapper {
  display: inline-block;
  position: absolute;
  right: 0;
  margin-top: 12px;
}

.shop_bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 17, 27, 0.6);
  z-index: 20;
}

</style>
