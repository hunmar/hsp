<template>
    <el-row>
        <el-col :span="8">
            <el-card class="box-card" :body-style="{ padding: '0px', display: 'flex', 'align-items': 'stretch' }">
                <div class="color" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>

                <div class="controls">
                    <el-input size="large" v-model="hex" @change="hexColorChanged">
                        <template slot="prepend">#</template>
                    </el-input>

                    <el-input-number v-model="h" @change="handleChange" :min="0" :max="360">
                        <template slot="prepend">H</template>
                    </el-input-number>
                    <el-input-number v-model="s" @change="handleChange" :min="0" :max="100">
                        <template slot="prepend">S</template>
                    </el-input-number>
                    <el-input-number v-model="p" @change="handleChange" :min="0" :max="255">
                        <template slot="prepend">P</template>
                    </el-input-number>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import CSpace from 'color-space';
import CString from 'color-string';

export default {
  name: 'SingleColor',
  props: ['index', 'hexColor'],
  data() {
    const rgbArr = CString.get.rgb(`#${this.hexColor}`);
    const hspArr = CSpace.rgb.hsp(rgbArr);

    return {
      h: hspArr[0],
      s: hspArr[1],
      p: hspArr[2],
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
      hex: this.hexColor,
    };
  },
  computed: {
    hsp() {
      return [parseInt(this.h, 10), parseInt(this.s, 10), parseInt(this.p, 10)];
    },
    rgb() {
      return [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)];
    },
  },
  methods: {
    handleChange() {
      let rgbArr = CSpace.hsp.rgb(this.hsp);

      while (rgbArr[0] > 255 || rgbArr[1] > 255 || rgbArr[2] > 255) {
        this.s = this.s - 1;
        rgbArr = CSpace.hsp.rgb(this.hsp);
      }

      this.r = rgbArr[0];
      this.g = rgbArr[1];
      this.b = rgbArr[2];

      const rgbHEX = CString.to.hex(rgbArr);

      if (rgbHEX) {
        this.hex = rgbHEX.slice(1);
        this.$emit('update', { index: this.index, hex: this.hex });
      }
    },
    hexColorChanged() {
      const rgbArr = CString.get.rgb(`#${this.hex}`);

      if (rgbArr) {
        this.r = rgbArr[0];
        this.g = rgbArr[1];
        this.b = rgbArr[2];

        const hspArr = CSpace.rgb.hsp(this.rgb);

        this.h = hspArr[0];
        this.s = hspArr[1];
        this.p = hspArr[2];

        this.$emit('update', { index: this.index, hex: this.hex });
      }
    },
  },
};
</script>

<style scoped>
    .color {
        width: 500px;
    }

    .controls {
    }
    
    .el-card__body {
        display: flex;
        align-items: stretch;
    }
</style>
