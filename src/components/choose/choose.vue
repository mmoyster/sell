<template>
  <div class="choose">
    <div class="choose-content">
      <div class="allType" :class="{'allActive':typeSelect===2}" @click="select(2)">
        <span class="type">{{selectedType.all}}</span>
        <span class="num">{{ratings.length}}</span>
      </div>
      <div class="good" :class="{'goodActive':typeSelect===0}" @click="select(0)">
        <span class="type">{{selectedType.good}}</span>
        <span class="num">{{selectGoodNum}}</span>
      </div>
      <div class="bad" :class="{'badActive':typeSelect===1}" @click="select(1)">
        <span class="type">{{selectedType.bad}}</span>
        <span class="num">{{selectBadNum}}</span>
      </div>
      <div class="border-1px"></div>
      <div class="selectRatings">
        <span class="icon-check_circle" :class="{'on':haveText}" @click="textHave"></span>
        <span class="text">只看有评价的内容</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedType: {
      type: Object,
      default () {
        return {
          all: '全部',
          good: '推荐',
          bad: '吐槽'
        };
      }
    },
    ratings: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {
      typeSelect: 2,
      haveText: false
    };
  },
  methods: {
    select(num) {
      this.typeSelect = num;
      this.$emit('typeSelect', num);
    },
    textHave() {
      this.haveText = !this.haveText;
      let bool = this.haveText
      this.$emit('haveText', bool);
    },
    initial() {
      this.typeSelect = 2;
      this.haveText = false;
    }
  },
  computed: {
    selectGoodNum() {
      let a = this.ratings.filter((rating) => {
        return rating.rateType === 0;
      });
      return a.length;
    },
    selectBadNum() {
      let a = this.ratings.filter((rating) => {
        return rating.rateType === 1;
      });
      return a.length;
    }
  }
};

</script>
<style>
.choose {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 0;
}

.choose .choose-content {
  margin: 18px 18px 0 18px;
  color: rgb(77, 85, 93);
}

.choose .choose-content .allType {
  display: inline-block;
  padding: 8px 8px;
  margin-right: 8px;
  border-radius: 2px;
  background-color: rgb(0, 160, 220, 0.5);
}

.choose .choose-content .type {
  line-height: 16px;
  font-size: 12px;
}

.choose .choose-content .num {
  line-height: 16px;
  font-size: 8px;
}

.choose .choose-content .good {
  display: inline-block;
  margin-right: 8px;
  padding: 8px 8px;
  border-radius: 2px;
  background-color: rgba(0, 160, 220, 0.2);
}

.choose .choose-content .bad {
  display: inline-block;
  padding: 8px 8px;
  margin-bottom: 18px;
  border-radius: 2px;
  background-color: rgba(77, 85, 93, 0.2);
}

.choose .choose-content .selectRatings {
  padding: 12px 0;
  color: rgb(147, 153, 159);
}

.choose .choose-content .selectRatings .on {
  color: green;
}

.choose .choose-content .selectRatings .icon-check_circle {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  font-size: 24px;
}

.choose .choose-content .selectRatings .text {
  display: inline-block;
  vertical-align: top;
  margin-left: 4px;
  line-height: 24px;
  font-size: 12px;
}

.choose .choose-content .allActive {
  background-color: rgb(0, 160, 220);
  color: #fff;
}

.choose .choose-content .goodActive {
  background-color: rgb(0, 160, 220);
  color: #fff;
}

.choose .choose-content .badActive {
  background-color: rgb(77, 85, 93);
  color: #fff;
}

</style>
