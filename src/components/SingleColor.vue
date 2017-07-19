<template>
    <el-row>
        <el-col>
            <el-card>
                <div class="box-card">
                    <div class="color" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>

                    <div class="controls">
                        <div class ="hex-input"
                        <el-input v-model="hex" @change="hexColorChanged">
                            <template slot="prepend">#</template>
                        </el-input></div>

                        <el-input-number v-model="h" @change="handleChange" :min="0" :max="360" :controls="false">
                            <template slot="prepend">H</template>
                        </el-input-number>
                        <el-input-number v-model="s" @change="handleChange" :min="0" :max="100" :controls="false">
                            <template slot="prepend">S</template>
                        </el-input-number>
                        <el-input-number v-model="p" @change="handleChange" :min="0" :max="255" :controls="false">
                            <template slot="prepend">P</template>
                        </el-input-number>
                    </div>
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
        width: 50px;
        min-height: 50px;
        display: inline-block;
    }

    .controls {
        display: inline-block;
    }

    .el-card {
        box-shadow: none;
        border: none;
        border-radius: 0;
    }

    .el-input-number {
        width: 100px;
        margin-left: 12px;
    }

    .el-input {
        width: 120px;
        margin-left: 12px;
    }

    .box-card {
        display: flex;
        align-items: stretch;
    }

</style>

<style>
.el-input__inner, .el-input-group__prepend {
    /*color: red;*/
    border: none;
    padding-right: 0;
}

.el-card__body {
    padding: 0;
}
</style>
