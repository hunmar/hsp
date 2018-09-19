<template>
  <div class="colors">
    <Draggable :list="hspColors" :options="{handler:'.color'}">
      <SingleColor v-for="hsp in hspColors" :hspColor="hsp.value" :id="hsp.id" :key="hsp.id" @update="updatehspColors"></SingleColor>
      <!-- <Bridge v-if="hspColors.length > index + 1" :hspColorTop="hspColors[index]" :hspColorBottom="hspColors[index+1]"/> -->
    </Draggable>
    <el-button class="add-btn" type="primary" @click="addColor">Add color</el-button>
  </div>
</template>

<script>
import _ from "lodash";
import Draggable from "vuedraggable";
import CSpace from "color-space";
import CString from "color-string";
import GradientColor from "./GradientColor";
import SingleColor from "./SingleColor";
import Bridge from "./Bridge";

export default {
  name: "colors",
  components: {
    Draggable,
    GradientColor,
    SingleColor,
    Bridge
  },
  data() {
    const hexFromHash = "FFDC4F";
    const colorsFromHash = window.location.hash
      ? window.location.hash.slice(1).split(";")
      : ["48,69,220"];
    const rgbArr = CString.get.rgb(`#${hexFromHash}`) || [255, 219, 77];
    const hspArr = CSpace.rgb.hsp(rgbArr);

    return {
      h: hspArr[0],
      s: hspArr[1],
      p: hspArr[2],
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
      hexColor: hexFromHash,
      idCounter: colorsFromHash.length - 1,
      hspColors: colorsFromHash.map(function(val, idx) {
        return { id: idx, value: val };
      })
    };
  },
  computed: {
    rgb() {
      return [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)];
    },
    rgbbw() {
      return CSpace.hsp.rgb([parseInt(this.h, 10), 0, parseInt(this.p, 10)]);
    },

    rgb2() {
      return CSpace.hsp.rgb([
        (parseInt(this.h, 10) + 120) % 360,
        parseInt(this.s, 10),
        parseInt(this.p, 10)
      ]);
    },
    rgbbw2() {
      return CSpace.hsp.rgb([
        (parseInt(this.h, 10) + 120) % 360,
        0,
        parseInt(this.p, 10)
      ]);
    },

    rgb3() {
      return CSpace.hsp.rgb([
        (parseInt(this.h, 10) + 240) % 360,
        parseInt(this.s, 10),
        parseInt(this.p, 10)
      ]);
    },
    rgbbw3() {
      return CSpace.hsp.rgb([
        (parseInt(this.h, 10) + 240) % 360,
        0,
        parseInt(this.p, 10)
      ]);
    },

    hsp() {
      return [parseInt(this.h, 10), parseInt(this.s, 10), parseInt(this.p, 10)];
    }
  },
  methods: {
    addColor() {
      let clonedColor = _.clone(this.hspColors[this.hspColors.length - 1]);
      this.idCounter++;
      clonedColor.id = this.idCounter;
      this.hspColors.push(clonedColor);
      window.location.hash = _.map(this.hspColors, "value").join(";");
    },
    updatehspColors(data) {
      let index = _.findIndex(this.hspColors, { id: data.id });
      this.hspColors.splice(index, 1, data);
      window.location.hash = _.map(this.hspColors, "value").join(";");
    },
    recalculateRGB: _.throttle(function() {
      const rgbArr = CSpace.hsp.rgb(this.hsp);
      this.r = rgbArr[0];
      this.g = rgbArr[1];
      this.b = rgbArr[2];
    }, 100),

    recalculateHSP: _.throttle(function() {
      const hspArr = CSpace.rgb.hsp(this.rgb);
      this.h = hspArr[0];
      this.s = hspArr[1];
      this.p = hspArr[2];
    }, 100),

    hexColorChanged: _.debounce(function() {
      const rgbArr = CString.get.rgb(`#${this.hexColor}`);

      if (rgbArr) {
        this.r = rgbArr[0];
        this.g = rgbArr[1];
        this.b = rgbArr[2];

        this.changeLocation();
        this.recalculateHSP();
      }
    }, 50),

    rgbColorChanged: _.debounce(function() {
      this.changeLocation(true);
      this.recalculateHSP();
    }, 50),

    hspColorChanged: _.debounce(function() {
      this.changeLocation(true);
      this.recalculateRGB();
    }, 50),

    changeLocation(rewriteHEX = false) {
      const rgbArr = [
        parseInt(this.r, 10),
        parseInt(this.g, 10),
        parseInt(this.b, 10)
      ];
      const rgbHEX = CString.to.hex(rgbArr);

      if (rgbHEX) {
        // window.location.hash = rgbHEX.slice(1);
        if (rewriteHEX) {
          this.hexColor = rgbHEX.slice(1);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSpace to this component only -->
<style scoped>
.colors {
  width: 800px;
  margin: auto;
}

.color__example-container {
  position: relative;
  height: 170px;
}

.color__example-1 {
  position: absolute;
  top: 0;
  bottom: 66%;
  left: 50%;
  right: 0;
}

.color__example-bw-1 {
  position: absolute;
  top: 0;
  bottom: 66%;
  left: 0;
  right: 50%;
}

.color__example-2 {
  position: absolute;
  top: 33%;
  bottom: 33%;
  left: 50%;
  right: 0;
}

.color__example-bw-2 {
  position: absolute;
  top: 33%;
  bottom: 33%;
  left: 0;
  right: 50%;
}

.color__example-3 {
  position: absolute;
  top: 66%;
  bottom: 0;
  left: 50%;
  right: 0;
}

.color__example-bw-3 {
  position: absolute;
  top: 66%;
  bottom: 0;
  left: 0;
  right: 50%;
}

.colors__gradient {
  grid-template-columns: repeat(37, 1fr) auto;
  font-size: 0;
}

.p-axis {
  height: 25px;
}

.add-btn {
  color: #000;
  background-color: #fff;
  border: none;
  padding: 20px 0;
}
</style>
