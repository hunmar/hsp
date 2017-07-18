<template>
  <span class="h-axis" :class="{ 'h-axis_bad': isBadClass, 'h-axis_good': !isBadClass }" :style="calculateRGB([h, s >= 0 ? s : 0, p])"></span>
</template>

<script>
import CS from 'color-space';

export default {
  name: 'GradientColor',
  props: ['h', 's', 'p'],
  data() {
    return {
      isBadClass: false,
    };
  },
  methods: {
    calculateRGB(hsp, isBad = false) {
      const rgb = CS.hsp.rgb(hsp);

      if (rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) {
        return this.calculateRGB([hsp[0], hsp[1] - 1, hsp[2]], true);
      }

      this.isBadClass = isBad;
      const styleObj = { 'background-color': `rgb(${CS.hsp.rgb(hsp).join(',')})` };

      return styleObj;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color__example {
  height: 250px;
}

.colors__gradient {
  grid-template-columns: repeat(37, 1fr) auto;  
}

.p-axis {
  height: 25px;
}

.h-axis {
  display: inline-block;
  width: calc(100% / 37);
  height: 25px;    
  position: relative;
}

.h-axis_bad {
  box-shadow: -1px 0 0 0 #e6e6e6 inset,
    0 -1px 0 0 #e6e6e6 inset,
    -1px -1px 0 0 #e6e6e6 inset,
    -1px 0 0 0 #e6e6e6,
    0 -1px 0 0 #e6e6e6;
}
</style>
