<template>
    <el-row>
        <el-col>
            <el-card>
                <div class="box-card">
                    <div class="color" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>
    
                    <div class="controls">
                        <div class="hex-input" <el-input @change="hexColorChanged" :value="this.hex">
                            <template slot="prepend">#</template>
                            </el-input>
                        </div>
    
                        <el-input-number @change="handleChangeH" :min="0" :max="360" :controls="false" :value="this.h">
                            <template slot="prepend">H</template>
                        </el-input-number>
                        <el-input-number @change="handleChangeS" :min="0" :max="100" :controls="false" :value="this.s">
                            <template slot="prepend">S 
                                <span class="color__delta" @click="makeCleanColor" v-bind:style="{ 'color': this.maxS - this.s >= 0 ? `rgb(0,255,0)` : `rgb(255,0,0)` }">
                                    {{ this.maxS - this.s > 0 ? '+' : '' }}{{ this.maxS - this.s }}
                                </span>
                            </template>
                        </el-input-number>
                        <el-input-number @change="handleChangeP" :min="0" :max="255" :controls="false"  :value="this.p">
                            <template slot="prepend">P</template>
                        </el-input-number>                        
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
/* eslint-disable */
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
            console.log('Calc HSP')
            return [parseInt(this.h, 10), parseInt(this.s, 10), parseInt(this.p, 10)];
        },
        rgb() {
            return [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)];
        },
        maxS() {
            let maxS = 0;
            let rgbArr = CSpace.hsp.rgb([parseInt(this.h, 10), maxS, parseInt(this.p, 10)]);
            while (rgbArr[0] <= 255 && rgbArr[1] <= 255 && rgbArr[2] <= 255) {
                if (maxS === 100) {
                    maxS = maxS + 1;
                    break;
                }
                maxS = maxS + 1;
                rgbArr = CSpace.hsp.rgb([parseInt(this.h, 10), maxS, parseInt(this.p, 10)]);
            }
            
            maxS = maxS - 1;

            return maxS;
        },
    },
    methods: {
        handleChangeH(next, prev) {
            this.h = next;
            this.handleChange();
        },
        handleChangeS(next, prev) {
            this.s = next;
            this.handleChange();
        },
        handleChangeP(next, prev) {
            this.p = next;
            this.handleChange();
        },
        handleChange() {
            console.log(arguments)
            console.log(this.hsp);
            let rgbArr = CSpace.hsp.rgb(this.hsp);

            // while (rgbArr[0] > 255 || rgbArr[1] > 255 || rgbArr[2] > 255) {
            //     this.s = this.s - 1;
            //     rgbArr = CSpace.hsp.rgb(this.hsp);
            // }

            this.r = rgbArr[0];
            this.g = rgbArr[1];
            this.b = rgbArr[2];

            const rgbHEX = CString.to.hex(rgbArr);

            if (rgbHEX) {
                this.hex = rgbHEX.slice(1);
                this.$emit('update', { index: this.index, hex: this.hex });
            } else {
                this.hex = 'Wrong HEX';
            }
        },
        hexColorChanged(next, prev) {
            this.hex = next;
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
        makeCleanColor() {
            this.s = this.maxS;
            this.handleChange();
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

.color__delta {
    cursor: pointer;
}
</style>

<style>
.el-input__inner,
.el-input-group__prepend {
    /*color: red;*/
    border: none;
    padding-right: 0;
}

.el-card__body {
    padding: 0;
}
</style>
