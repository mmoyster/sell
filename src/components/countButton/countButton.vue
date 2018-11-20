<template>
  <div class="countButton">
    <transition name="move">
      <div class="count-decrease" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline" @click.stop.prevent="decreaseCount" ></span>
      </div>
    </transition>
    <div class="count-num" v-show="food.count>0">{{food.count}}</div>
    <div class="count-add">
      <span class="icon-add_circle" @click.stop.prevent="addCount"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    addCount() {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};

</script>
<style>
.countButton .count-decrease {
  display: inline-block;
}

.countButton .count-decrease .inner {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
  transition: all 0.4s linear;
}

.countButton .count-num {
  display: inline-block;
  vertical-align: top;
  padding: 0 12px;
  line-height: 24px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}

.countButton .count-add {
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}

.move-enter,
.move-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}

.move-enter,
.move-leave-to .inner {
  transform: rotate(180deg);
}

.move-enter-active,
.move-leave-active {
  transition: all 0.4s linear;
}

</style>
