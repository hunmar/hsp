<template>
  <div class="colors">    
    <el-row :gutter="20">
      <el-col class="color__example-container" :span="6" :offset="3">
        <div class="color__example" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" label-width="50px">          
          <el-form-item label="HEX">
            <el-col :span="8">
              <el-input size="large" v-model="hexColor" @change="hexColorChanged">
                <template slot="prepend">#</template>
              </el-input>
            </el-col>
          </el-form-item>          
          <el-form-item label="RGB">
            <el-col :span="8">
              <el-input-number type="number" size="large" v-model="r" @change="rgbColorChanged" :min="0" :max="255">
                <template slot="prepend">R</template>
              </el-input-number>
            </el-col>
            <el-col :span="8">      
              <el-input-number type="number" size="large" v-model="g" @change="rgbColorChanged" :min="0" :max="255">
                <template slot="prepend">G</template>
              </el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input-number type="number" size="large" v-model="b" @change="rgbColorChanged" :min="0" :max="255">
                <template slot="prepend">B</template>
              </el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="HSP">        
            <el-col :span="8">
              <el-input-number type="number" size="large" v-model="h" @change="hspColorChanged" :min="1" :max="360">
                <template slot="prepend">H</template>
              </el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input-number type="number" size="large" v-model="s" @change="hspColorChanged" :min="1" :max="100">
                <template slot="prepend">S</template>
              </el-input-number>
            </el-col>
            <el-col :span="8">
              <el-input-number type="number" size="large" v-model="p" @change="hspColorChanged" :min="1" :max="255">
                <template slot="prepend">P</template>
              </el-input-number>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>      
    </el-row>
    <div class="colors__gradient">
      <template class="p-axis" v-for="(pIndex, n) in 52">      
        <template v-for="(hIndex, m) in 37" class="h-axis">
           <GradientColor :h="(hIndex-1)*10" :s="parseInt(s, 10)" :p="255-(pIndex - 1)*5"></GradientColor> 
        </template>
      </template>    
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import CSpace from 'color-space';
import CString from 'color-string';
import GradientColor from './GradientColor';

export default {
  name: 'colors',
  components: {
    GradientColor,
  },
  data() {
    const hexFromHash = window.location.hash.slice(1) || 'fff';
    const rgbArr = CString.get.rgb(`#${hexFromHash}`) || [255, 255, 255];
    const hspArr = CSpace.rgb.hsp(rgbArr);

    return {
      h: hspArr[0],
      s: hspArr[1],
      p: hspArr[2],
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
      hexColor: hexFromHash,
    };
  },
  computed: {
    rgb() {
      return [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)];
    },
    hsp() {
      return [parseInt(this.h, 10), parseInt(this.s, 10), parseInt(this.p, 10)];
    },
  },
  methods: {
    recalculateRGB: _.throttle(function () {
      const rgbArr = CSpace.hsp.rgb(this.hsp);
      this.r = rgbArr[0];
      this.g = rgbArr[1];
      this.b = rgbArr[2];
    }, 100),

    recalculateHSP: _.throttle(function () {
      const hspArr = CSpace.rgb.hsp(this.rgb);
      this.h = hspArr[0];
      this.s = hspArr[1];
      this.p = hspArr[2];
    }, 100),

    hexColorChanged: _.debounce(function () {
      const rgbArr = CString.get.rgb(`#${this.hexColor}`);

      if (rgbArr) {
        this.r = rgbArr[0];
        this.g = rgbArr[1];
        this.b = rgbArr[2];

        this.changeLocation();
        this.recalculateHSP();
      }
    }, 50),

    rgbColorChanged: _.debounce(function () {
      this.changeLocation(true);
      this.recalculateHSP();
    }, 50),

    hspColorChanged: _.debounce(function () {
      this.changeLocation(true);
      this.recalculateRGB();
    }, 50),

    changeLocation(rewriteHEX = false) {
      const rgbArr = [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)];
      const rgbHEX = CString.to.hex(rgbArr);

      if (rgbHEX) {
        window.location.hash = rgbHEX.slice(1);
        if (rewriteHEX) {
          this.hexColor = rgbHEX.slice(1);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSpace to this component only -->
<style scoped>
.color__example-container {
  position: relative;
  height: 170px;
}
.color__example {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid rgba(128, 128, 128, 0.5);
}

.colors__gradient {
  grid-template-columns: repeat(37, 1fr) auto;
  font-size: 0;
}

.p-axis {
  height: 25px;
}
</style>
