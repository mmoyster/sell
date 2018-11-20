<template>
  <div class="star-wrapper" :class="starType">
    <span class="star-item" v-for="item in itemClass" :key="item.index" :class="item"></span>
  </div>
</template>
<script>
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
const LENGTH = 5;
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClass() {
      let result = [];
      let star = Math.floor(this.score * 2) / 2;
      let a = star % 1;
      for (let i = 0; i < Math.floor(star); i++) {
        result.push(CLS_ON);
      }
      if (a !== 0) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};

</script>
<style rel="stylesheet">
.star-wrapper {
  display: inline-block;
  font-size: 0;
}

.star-wrapper span:last-child {
  margin-right: 0;
}

.star-item {
  display: inline-block;
  background-repeat: no-repeat;
}

.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}

.star-48 .on {
  background-image: url('./star48_on@2x.png');
}

.star-48 .off {
  background-image: url('./star48_off@2x.png');
}

.star-48 .half {
  background-image: url('./star48_half@2x.png');
}

.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}

.star-36 .on {
  background-image: url('./star36_on@2x.png');
}

.star-36 .off {
  background-image: url('./star36_off@2x.png');
}

.star-36 .half {
  background-image: url('./star36_half@2x.png');
}

.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 4px;
  background-size: 10px 10px;
}

.star-24 .on {
  background-image: url('./star24_on@2x.png');
}

.star-24 .off {
  background-image: url('./star24_off@2x.png');
}

.star-24 .half {
  background-image: url('./star24_half@2x.png');
}

@media screen and(-webkit-max-device-pixel-ratio: 3)and(-webkit-min-device-pixel-ratio: 3) {
  .star-48 .on {
    background-image: url('./star48_on@3x.png');
  }

  .star-48 .off {
    background-image: url('./star48_off@3x.png');
  }

  .star-48 .half {
    background-image: url('./star48_half@3x.png');
  }

  .star-36 .on {
    background-image: url('./star36_on@3x.png');
  }

  .star-36 .off {
    background-image: url('./star36_off@3x.png');
  }

  .star-36 .half {
    background-image: url('./star36_half@3x.png');
  }

  .star-24 .on {
    background-image: url('./star24_on@3x.png');
  }

  .star-24 .off {
    background-image: url('./star24_off@3x.png');
  }

  .star-24 .half {
    background-image: url('./star24_half@3x.png');
  }
}

</style>
