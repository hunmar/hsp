<template>
  <div class="colors">
    <div class="color__example" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>
    <input class="color__input" @input="parseHEXColor()"></input>
    <div class="colors__color">
      RGB
      <input v-model="r" @input="recalculateHSP()" type="range" name="r" min="0" max="255">
      <input v-model="g" @input="recalculateHSP()" type="range" name="g" min="0" max="255">
      <input v-model="b" @input="recalculateHSP()" type="range" name="b" min="0" max="255">
    </div>
    <div class="colors__color">
      HSP
      <input v-model="h" @input="recalculateRGB()" type="range" name="h" min="0" max="360">
      <input v-model="s" @input="recalculateRGB()" type="range" name="s" min="0" max="100">
      <input v-model="p" @input="recalculateRGB()" type="range" name="p" min="0" max="255">
    </div>    
    <div class="colors__gradient">
      <template class="p-axis" v-for="(pIndex, n) in 52">      
        <template v-for="(hIndex, m) in 37" class="h-axis" v-bind:style="calculateRGB([(hIndex-1)*10, s, (255 - (pIndex+1)*5)])">
          <GradientColor :h="(hIndex-1)*10" :s="s" :p="255-(pIndex+1)*5"></GradientColor>
        </template>
      </template>    
    </div>
  </div>
</template>

<script>
import CS from 'color-space';
import GradientColor from './GradientColor';

export default {
  name: 'colors',
  components: {
    GradientColor,
  },
  data() {
    return {
      h: 0,
      s: 100,
      p: 0,
      r: 0,
      g: 0,
      b: 0,
    };
  },
  computed: {
    rgb() {
      const rgb = [this.r, this.g, this.b];
      return rgb;
    },
    hsp() {
      return [this.h, this.s, this.p];
    },
  },
  methods: {
    recalculateRGB() {
      const rgb = CS.hsp.rgb(this.hsp);
      this.r = rgb[0];
      this.g = rgb[1];
      this.b = rgb[2];
    },
    recalculateHSP() {
      const hsp = CS.rgb.hsp(this.rgb);
      this.h = hsp[0];
      this.s = hsp[1];
      this.p = hsp[2];
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
  font-size: 0;
}

.p-axis {
  height: 25px;
}
</style>
