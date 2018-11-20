<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="goods_left-wrapper" ref="leftWrapper">
        <ul>
          <li class="goods_left border-1px" v-for="(item,index) in goods" :key="item.index" :class="{'current':judgeIndex===index}" @click="clickLeft(index)">
            <span class="goods_left-name"><span class="goods_left-icon" v-show="item.type>0" :class="classArray[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="goods_right-wrapper" ref="rightWrapper">
        <div class="goods_right-ul-wrapper">
          <ul class="goods_right-ul" v-for="item in goods" :key="item.index" ref="rightList">
            <h1 class="goods_right-type">{{item.name}}</h1>
            <li class="goods_right-li border-1px" v-for="food in item.foods" :key="food.index" @click="showFood(food)">
              <span class="goods_right-li-icon"><img :src="food.icon" width="60px" height="60px" />
          </span>
              <div class="goods_right-li-foods">
                <div class="foods_name">{{food.name}}</div>
                <div class="foods_description" v-show="food.description">{{food.description}}</div>
                <span class="foods_sellCount">月售{{food.sellCount}}份</span>
                <span class="foods_rating">好评率{{food.rating}}%</span><br />
                <span class="foods_price_icon">￥</span>
                <span class="foods_price">{{food.price}}</span>
                <span class="foods_oldPrice_icon" v-show="food.oldPrice">￥</span>
                <span class="foods_oldPrice" v-show="food.oldPrice">{{food.oldPrice}}</span>
              </div>
              <div class="countButton-wrapper">
                <countButton :food="food"></countButton>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopCart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopCart from '../shopCart/shopCart';
import countButton from '../countButton/countButton';
import food from '../food/food';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      classArray: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      ulHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    judgeIndex() {
      for (let i = 0; i < this.ulHeight.length; i++) {
        let height1 = this.ulHeight[i];
        let height2 = this.ulHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(function(good) {
        good.foods.forEach(function(food) {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.$http.get('/api/goods').then(function(res) {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        this.$nextTick(function() {
          this.initScroll();
          this.computeHeight();
        });
      }
    });
  },
  methods: {
    initScroll() {
      this.leftScroll = new BScroll(this.$refs.leftWrapper, { click: true });
      this.rightScroll = new BScroll(this.$refs.rightWrapper, { click: true, probeType: 3 });
      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    computeHeight() {
      let h = 0;
      this.rightLists = this.$refs.rightList;
      this.ulHeight.push(h);
      for (let i = 0; i < this.rightLists.length; i++) {
        h += this.rightLists[i].clientHeight;
        this.ulHeight.push(h);
      }
    },
    clickLeft(index) {
      let el = this.rightLists[index];
      this.rightScroll.scrollToElement(el, 300);
    },
    showFood(food) {
      this.$refs.food.show();
      this.selectedFood = food;
    }
  },
  components: {
    shopCart,
    countButton,
    food
  }
};

</script>
<style rel="stylesheet">
@media screen and(-webkit-max-device-pixel-ratio: 3)and(-webkit-min-device-pixel-ratio: 3) {
  .goods_left-name .decrease {
    background-image: url('./decrease_3@3x.png');
  }

  .goods_left-name .discount {
    background-image: url('./discount_3@3x.png');
  }

  .goods_left-name .special {
    background-image: url('./special_3@3x.png');
  }

  .goods_left-name .invoice {
    background-image: url('./invoice_3@3x.png');
  }

  .goods_left-name .guarantee {
    background-image: url('./guarantee_3@3x.png');
  }
}

.goods {
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 48px;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.goods_left-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
}

.goods_right-wrapper {
  flex: 1;
}

.goods_left {
  display: table;
  width: 56px;
  height: 54px;
  padding: 0 12px;
  line-height: 14px;
  font-size: 0;
}

.goods_left-icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.goods_left-name .decrease {
  background-image: url('./decrease_3@2x.png');
}

.goods_left-name .discount {
  background-image: url('./discount_3@2x.png');
}

.goods_left-name .special {
  background-image: url('./special_3@2x.png');
}

.goods_left-name .invoice {
  background-image: url('./invoice_3@2x.png');
}

.goods_left-name .guarantee {
  background-image: url('./guarantee_3@2x.png');
}

.goods_left-name {
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  color: rgb(24, 20, 20);
  font-weight: 200;
}

.goods_left-wrapper ul li:last-child:after {
  display: none;
}

.goods_left-wrapper .current {
  position: relative;
  margin-top: -1px;
  background-color: #fff;
}

.goods_left-wrapper .current:after {
  display: none;
}

.goods_left-wrapper .current .goods_left-name {
  line-height: 14px;
  font-size: 12px;
  color: rgb(20, 20, 20);
  font-weight: 700;
}

.goods_right-ul {
  font-size: 0;
}

.goods_right-li {
  display: flex;
  margin: 0 18px;
}

.goods_right-ul li:last-child:after {
  display: none;
}

.goods_right-type {
  height: 26px;
  padding-left: 14px;
  line-height: 26px;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background-color: #f3f5f7;
  border-left: 2px solid #d9dde1;
}

.goods_right-li-icon {
  display: inline-block;
  padding: 18px 10px 0 0;
}

.goods_right-li-foods {
  flex: 1;
  vertical-align: top;
  max-width: 70%;
  margin-top: 18px;
}

.goods_right-li .countButton-wrapper {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.foods_name {
  margin-top: 2px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.foods_description {
  margin-top: 8px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.foods_sellCount {
  display: inline-block;
  margin-top: 8px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.foods_rating {
  padding-left: 12px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

@media screen and (max-device-width:320px) {
  .foods_rating {
    padding-left: 6px;
  }
}

.foods_price_icon {
  display: inline-block;
  margin-bottom: 18px;
  line-height: 24px;
  font-size: 10px;
  color: red;
  font-weight: normal;
}

.foods_price {
  line-height: 24px;
  font-size: 14px;
  color: red;
  font-weight: 700;
}

.foods_oldPrice_icon {
  padding-left: 8px;
  line-height: 24px;
  font-size: 10px;
  color: rgb(147, 153, 159);
  font-weight: normal;
  text-decoration: line-through;
}

.foods_oldPrice {
  line-height: 24px;
  font-size: 10px;
  color: rgb(147, 153, 159);
  font-weight: 700;
  text-decoration: line-through;
}

</style>
