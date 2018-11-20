<template>
  <div class="seller" ref="sellerContent">
    <div class="seller-content">
      <div class="seller-header border-1px">
        <h1 class="title">{{seller.name}}</h1>
        <div class="rating">
          <div class="star-container">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="save" v-if="favorite">
          <div class="favorite">
            <span class="icon-favorite" @click="toggleSave"></span>
          </div>
          <div class="text">已收藏</div>
        </div>
        <div class="no-save" v-else>
          <div class="favorite">
            <span class="icon-favorite" @click="toggleSave"></span>
          </div>
          <div class="text">未收藏</div>
        </div>
      </div>
      <div class="serviceMessage">
        <div class="item">
          <div class="text">起送价</div>
          <span class="num">{{seller.minPrice}}</span>
          <span class="unit">元</span>
        </div>
        <div class="item">
          <div class="text">商家配送</div>
          <span class="num">{{seller.deliveryPrice}}</span>
          <span class="unit">元</span>
        </div>
        <div class="item">
          <div class="text">平均配送时间</div>
          <span class="num">{{seller.deliveryTime}}</span>
          <span class="unit">分钟</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="message border-1px">
          <h1 class="title">公告与活动</h1>
          <div class="text">{{seller.bulletin}}</div>
        </div>
        <ul>
          <li class="supports border-1px" v-for="support in seller.supports" :key="support.index">
            <span class="icon" :class="classArray[support.type]"></span>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.index"><img width="120px" height="90px" alt="商家实景图" :src="pic" /></li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="infos-list">
          <li class="infos-item border-1px" v-for="info in seller.infos" :key="info.index">
            <span class="text">{{info}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      classArray: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      favorite: this.getLocalStorage()
    };
  },
  components: {
    star,
    split
  },
  methods: {
    _verticalScroll() {
      this.$nextTick(() => {
        if (!this.verticalScroll) {
          this.verticalScroll = new BScroll(this.$refs.sellerContent, { click: true });
        } else {
          this.verticalScroll.refresh();
        }
      });
    },
    _horizontalScroll() {
      if (this.seller.pics) {
        let picWidth = 120;
        let right = 6;
        let ulWidth = (picWidth + right) * this.seller.pics.length;
        this.$refs.picList.style.width = ulWidth + 'px';
      }
      this.$nextTick(() => {
        if (!this.horizontalScroll) {
          this.horizontalScroll = new BScroll(this.$refs.picWrapper, { scrollX: true, scrollY: false });
        } else {
          this.horizontalScroll.refresh();
        }
      });
    },
    toggleSave() {
      this.favorite = !this.favorite;
      this.addLocalStorage(this.favorite);
    },
    addLocalStorage(value) {
      if (window.localStorage) {
        let storage = window.localStorage;
        storage.setItem('favorite', value);
      }
    },
    getLocalStorage() {
      if (window.localStorage.favorite) {
        let storage = window.localStorage;
        let a = storage.getItem('favorite');
        if (a === 'true') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  watch: {
    seller() {
      this._verticalScroll();
      this._horizontalScroll();
    }
  },
  mounted() {
    this._verticalScroll();
    this._horizontalScroll();
  }
};

</script>
<style>
.seller {
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.seller .seller-content {
  font-size: 0;
}

.seller .seller-content .seller-header {
  position: relative;
  margin: 0 18px;
  padding: 18px 0;
}

.seller-content .title {
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}

.seller-content .seller-header .rating {
  margin-top: 8px;
  height: 18px;
}

.seller-header .rating .star-container {
  display: inline-block;
  margin-top: 3px;
}

.seller-header .rating .ratingCount,
.sellCount {
  display: inline-block;
  vertical-align: top;
  line-height: 18px;
  font-size: 12px;
  color: rgb(77, 85, 93);
}

.seller-header .rating .ratingCount {
  margin-left: 8px;
}

.seller-header .rating .sellCount {
  margin-left: 12px;
}

.seller-header .save,
.no-save {
  position: absolute;
  right: 0;
  top: 18px;
  text-align: center;
}

.seller-header .save .icon-favorite {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(240, 20, 20);
}

.seller-header .no-save .icon-favorite {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(147, 153, 159);
}

.seller-header .save .text {
  margin-top: 4px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(77, 85, 93);
}

.seller-header .no-save .text {
  margin-top: 4px;
  line-height: 10px;
  font-size: 10px;
  color: rgb(77, 85, 93);
}

.seller .seller-content .serviceMessage {
  display: flex;
  margin: 18px 0;
  width: 100%;
}

.seller-content .serviceMessage .item {
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}

.seller-content .serviceMessage .item:last-child {
  border-right: none;
}

.serviceMessage .item .text {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.serviceMessage .item .num {
  display: inline-block;
  margin-top: 4px;
  line-height: 24px;
  font-size: 24px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}

.serviceMessage .item .unit {
  display: inline-block;
  line-height: 24px;
  font-size: 10px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}

.seller .seller-content .bulletin {
  margin: 18px 18px 0 18px;
}

.bulletin .message .text {
  padding: 8px 12px 16px 12px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(240, 20, 20);
}

.seller-content .bulletin .supports {
  padding: 16px 12px;
}

.seller .seller-content .bulletin ul li:last-child:after {
  display: none;
}

.bulletin .supports .icon {
  display: inline-block;
  vertical-align: top;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: 16px 16px;
}

.bulletin .supports .decrease {
  background-image: url(./decrease_4@2x.png);
}

.bulletin .supports .discount {
  background-image: url(./discount_4@2x.png);
}

.bulletin .supports .special {
  background-image: url(./special_4@2x.png);
}

.bulletin .supports .invoice {
  background-image: url(./invoice_4@2x.png);
}

.bulletin .supports .guarantee {
  background-image: url(./guarantee_4@2x.png);
}

.bulletin .supports .description {
  display: inline-block;
  margin-left: 6px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}

.seller .seller-content .pic {
  margin: 18px 12px 18px 18px;
}

.seller-content .pic .pic-wrapper {
  overflow: hidden;
}

.seller-content .pic .pic-list {
  white-space: nowrap;
}

.pic .pic-list .pic-item {
  display: inline-block;
  width: 120px;
  height: 90px;
  margin: 12px 6px 0 0;
}

.seller .seller-content .infos {
  margin: 18px 18px 0 18px;
}

.seller-content .infos .title {
  padding-bottom: 12px;
}

.infos .infos-list .infos-item {
  padding: 16px 12px;
}

.infos-list .infos-item .text {
  line-height: 16px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}

.infos ul li:last-child:after {
  display: none;
}

</style>
