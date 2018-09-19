<template>
    <el-row>
        <el-col>
            <el-card>
                <div class="box-card">
                    <div class="color" :style="{background: `linear-gradient(180deg, rgb(${this.rgbTop}), rgb(${this.rgbBottom}))`}"></div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import _ from "lodash";
import CSpace from "color-space";

export default {
  name: "Bridge",
  props: ["hspColorTop", "hspColorBottom"],
  computed: {
    rgbTop() {
      var hspArr = this.hspColorTop.split(",");

      var maxS = this.getMaxSFromHSP(hspArr[0], hspArr[2]);
      let fixedS = hspArr[1];

      if (fixedS > maxS) {
        let rgbArr = CSpace.hsp.rgb([hspArr[0], hspArr[1], hspArr[2]]);

        while (
          fixedS > 0 &&
          (rgbArr[0] > 255 || rgbArr[1] > 255 || rgbArr[2] > 255)
        ) {
          fixedS = fixedS - 1;
          rgbArr = CSpace.hsp.rgb([hspArr[0], fixedS, hspArr[2]]);
        }
      }

      var s =
        fixedS < parseInt(hspArr[1], 10) ? fixedS : parseInt(hspArr[1], 10);

      const rgbArr = CSpace.hsp.rgb([
        parseInt(hspArr[0], 10),
        s,
        parseInt(hspArr[2], 10)
      ]);

      return rgbArr.join(",");
    },
    rgbBottom() {
      var hspArr = this.hspColorBottom.split(",");

      var maxS = this.getMaxSFromHSP(hspArr[0], hspArr[2]);
      let fixedS = hspArr[1];

      if (fixedS > maxS) {
        let rgbArr = CSpace.hsp.rgb([hspArr[0], hspArr[1], hspArr[2]]);

        while (
          fixedS > 0 &&
          (rgbArr[0] > 255 || rgbArr[1] > 255 || rgbArr[2] > 255)
        ) {
          fixedS = fixedS - 1;
          rgbArr = CSpace.hsp.rgb([hspArr[0], fixedS, hspArr[2]]);
        }
      }

      var s =
        fixedS < parseInt(hspArr[1], 10) ? fixedS : parseInt(hspArr[1], 10);

      const rgbArr = CSpace.hsp.rgb([
        parseInt(hspArr[0], 10),
        s,
        parseInt(hspArr[2], 10)
      ]);

      return rgbArr.join(",");
    }
  },
  methods: {
    getMaxSFromHSP(h, p) {
      let maxS = 0;

      let rgbArr = CSpace.hsp.rgb([h, maxS, p]);

      while (rgbArr[0] <= 255 && rgbArr[1] <= 255 && rgbArr[2] <= 255) {
        if (maxS === 100) {
          maxS = maxS + 1;
          break;
        }
        maxS = maxS + 1;
        rgbArr = CSpace.hsp.rgb([h, maxS, p]);
      }

      maxS = maxS - 1;

      return maxS;
    }
  }
};
</script>
