<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header_top">
        <div class="avatar">
          <img width="64px" height="64px" :src="seller.avatar" alt="商家头像" />
      </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
            </div>
            <div class="supports" v-if="seller.supports">
              <span class="icon" :class="classArray[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div class="supports-arrow" v-if="seller.supports" @click="showHidden">
            <span class="supports_num">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
        <div class="header_bottom">
          <span class="bulletin"></span><span class="bulletin_text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right" @click="showHidden"></i>
        </div>
        <div class="header_bg">
          <img :src="seller.avatar" width="100%" height="100%" />
      </div>
        </div>
        <transition name="fade">
          <div class="header_hidden" v-if="hiddenShow">
            <div class="hidden_content-wrapper clearfix">
              <div class="hidden_content">
                <h1>{{seller.name}}</h1>
                <div class="star">
                  <star :size="48" :score="seller.score"></star>
                </div>
                <div class="supports_message">
                  <div class="supports_title">
                    <div class="line"></div>
                    <div class="title_supports">优惠信息</div>
                    <div class="line"></div>
                  </div>
                  <div class="supports_content">
                    <div class="supports_content-item" v-for="(support,index) in seller.supports" :key="support.index">
                      <span class="supports_content-icon" :class="classArray[support.type]"></span>
                      <span class="supports_content-message">{{seller.supports[index].description}}</span>
                    </div>
                  </div>
                </div>
                <div class="bulletin_message">
                  <div class="supports_title">
                    <div class="line"></div>
                    <div class="title_supports">商家公告</div>
                    <div class="line"></div>
                  </div>
                  <div class="bulletin_message-content">{{seller.bulletin}}</div>
                </div>
              </div>
            </div>
            <div class="close_icon">
              <i class="icon-close" @click="offHidden"></i>
            </div>
          </div>
        </transition>
      </div>
</template>
<script>
import star from '../star/star.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      hiddenShow: false
    };
  },
  methods: {
    showHidden() {
      this.hiddenShow = true;
    },
    offHidden() {
      this.hiddenShow = false;
    }
  },
  created() {
    this.classArray = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};

</script>
<style rel="stylesheet">
@import url('./imgUrl_dpr3.css');

.header {
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
}

.header-wrapper {
  position: relative;
}

.header_top .avatar {
  display: inline-block;
  padding: 24px 0 18px 24px;
}

.header_top {
  position: relative;
}

.header_top .avatar img {
  border-radius: 2px;
}

.header_top .content {
  display: inline-block;
  margin-left: 16px;
  font-size: 0;
}

.header_top .content .title {
  margin-top: 2px;
}

.header_top .content .title .brand {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  background-size: 30px 18px;
  background-repeat: no-repeat;
  background-image: url('./brand@2x.png');
}

.header_top .content .title .name {
  padding-left: 6px;
  line-height: 18px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-weight: bold;
}

.header_top .content .description {
  margin-top: 8px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: 200;
}

.header_top .content .supports {
  margin-top: 10px;
  margin-bottom: 2px;
}

.header_top .content .supports .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}

.header_top .content .supports .decrease {
  background-image: url('./decrease_1@2x.png');
}

.header_top .content .supports .discount {
  background-image: url('./discount_1@2x.png');
}

.header_top .content .supports .invoice {
  background-image: url('./invoice_1@2x.png');
}

.header_top .content .supports .special {
  background-image: url('./special_1@2x.png');
}

.header_top .content .supports .guarantee {
  background-image: url('./guarantee_1@2x.png');
}

.header_top .content .supports .text {
  vertical-align: top;
  padding-left: 4px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: 200;
}

.header_top .supports-arrow {
  position: absolute;
  right: 12px;
  bottom: 14px;
  height: 24px;
  padding: 0 8px;
  line-height: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  font-size: 0;
  color: rgb(255, 255, 255);
  font-weight: 200px;
  text-align: center;
}

.header_top .supports-arrow .supports_num {
  vertical-align: top;
  font-size: 12px;
}

.header_top .supports-arrow i {
  margin-left: 2px;
  font-size: 12px;
  line-height: 24px;
}

.header_bottom {
  position: relative;
  height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: rgba(7, 17, 27, 0.2);
  color: rgb(255, 255, 255);
  font-weight: 200;
  line-height: 28px;
  font-size: 12px;
}

.header_bottom .bulletin {
  display: inline-block;
  vertical-align: top;
  width: 22px;
  height: 12px;
  margin-top: 8px;
  background-size: 22px 12px;
  background-repeat: no-repeat;
  background-image: url('./bulletin@2x.png');
}

.header_bottom .bulletin_text {
  vertical-align: top;
  margin-left: 4px;
}

.header_bottom i {
  position: absolute;
  right: 10px;
  bottom: 0;
  line-height: 28px;
}

.header_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  filter: blur(10px);
  z-index: -1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.header_hidden {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 100;
  background-color: rgba(7, 17, 27, 0.8);
}

.hidden_content-wrapper {
  width: 100%;
  min-height: 100%;
}

.hidden_content {
  margin-top: 64px;
  padding-bottom: 64px;
}

.close_icon {
  position: relative;
  width: 32px;
  height: 32px;
  margin-top: -64px;
  margin-left: auto;
  margin-right: auto;
  clear: both;
}

.icon-close {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.5);
}

.hidden_content h1 {
  text-align: center;
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
}

.star {
  margin-top: 16px;
  text-align: center;
}

.supports_message {
  width: 80%;
  margin: 28px auto 0 auto;
}

.supports_title {
  display: flex;
}

.supports_title .line {
  flex: 1;
  height: 6px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.supports_title .title_supports {
  padding: 0 12px;
  line-height: 14px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 700;
}

.supports_content {
  padding: 24px 12px 28px 12px;
  font-size: 0;
}

.supports_content-item {
  margin-bottom: 12px;
}

.supports_content-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}

.supports_content-item .decrease {
  background-image: url('./decrease_2@2x.png');
}

.supports_content-item .discount {
  background-image: url('./discount_2@2x.png');
}

.supports_content-item .invoice {
  background-image: url('./invoice_2@2x.png');
}

.supports_content-item .special {
  background-image: url('./special_2@2x.png');
}

.supports_content-item .guarantee {
  background-image: url('./guarantee_2@2x.png');
}

.supports_content-message {
  vertical-align: top;
  margin-left: 6px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(255, 255, 255);
}

.bulletin_message {
  width: 80%;
  margin: 16px auto 0 auto;
}

.bulletin_message-content {
  padding: 24px 12px 0 12px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(255, 255, 255);
}

</style>
