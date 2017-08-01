<template>
    <el-row>
        <el-col>
            <el-card>
                <div class="box-card">
                    <div class="color" v-bind:style="{ 'background-color': `rgb(${this.rgb.join(',')})` }"></div>
    
                    <div class="controls">
                        <el-input @change="hexColorChanged" :value="this.hex">
                            <template slot="prepend">#</template>
                        </el-input>
                        <el-input-number @change="handleChangeH" :min="0" :max="360" :controls="false" :value="this.h">
                            <template slot="prepend">H</template>
                        </el-input-number>
                        <el-input-number @change="handleChangeSR" :min="0" :max="100" :controls="false" :value="this.sr">
                            <template slot="prepend">S%</template>
                        </el-input-number>
                        <el-input-number :disabled="true" :min="0" :max="100" :controls="false" :value="this.s">
                            <template slot="prepend">S</template>
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
import _ from 'lodash'
import CSpace from 'color-space'
import CString from 'color-string'

export default {
    name: 'SingleColor',
    props: ['index', 'hexColor'],
    data() {
        const rgbArr = CString.get.rgb(`#${this.hexColor}`)
        const hspArr = CSpace.rgb.hsp(rgbArr)
        const maxS = this.getMaxSFromHSP(hspArr[0], hspArr[2])
        const intSr = this.getIntSR([rgbArr[0], rgbArr[1], rgbArr[2]], hspArr, maxS)

        return {
            h: hspArr[0],
            sr: intSr,
            p: hspArr[2],
            r: rgbArr[0],
            g: rgbArr[1],
            b: rgbArr[2],
            hex: this.hexColor,
        }
    },
    computed: {
        hsp() {
            console.log('Calc HSP')
            return [parseInt(this.h, 10), parseInt(this.s, 10), parseInt(this.p, 10)]
        },
        hsrp() {
            console.log('Calc HSrP')
            return [parseInt(this.h, 10), parseInt(this.sr, 10)*this.maxS/100, parseInt(this.p, 10)]
        },
        rgb() {
            return [parseInt(this.r, 10), parseInt(this.g, 10), parseInt(this.b, 10)]
        },
        s() {
            console.log('s', this.maxS*this.sr/100)
            return this.maxS*this.sr/100
        },
        maxS() {
            return this.getMaxSFromHSP(this.h, this.p)
        },
    },
    methods: {
        getIntSR(etalonRGB, etalonHSP, maxS)
        {
            let h = etalonHSP[0]
            let sr = etalonHSP[1]/maxS*100
            let p = etalonHSP[2]
            
            console.log('etalonRGB', etalonRGB)
            
            if (sr === parseInt(sr, 10)) {
                console.log('sr')
                return sr
            }
            
            let roundSR = Math.round(sr);
            console.log('roundSR', CSpace.hsp.rgb([h, roundSR*maxS/100, p]))
            if (_.isEqual(CSpace.hsp.rgb([h, roundSR*maxS/100, p]), etalonRGB)) {
                console.log('roundSR')
                return roundSR
            }

            let floorSR = Math.floor(sr);
            console.log('floorSR', CSpace.hsp.rgb([h, floorSR*maxS/100, p]))
            if (_.isEqual(CSpace.hsp.rgb([h, floorSR*maxS/100, p]), etalonRGB)) {
                console.log('floorSR')
                return floorSR
            }
        },
        handleChangeH(next, prev) {
            this.h = next
            this.handleChange()
        },
        handleChangeSR(next, prev) {
            this.sr = next            
            this.handleChange()
        },
        handleChangeP(next, prev) {
            this.p = next
            this.handleChange()
        },
        handleChange() {
            let rgbArr = CSpace.hsp.rgb(this.hsrp)

            // while (rgbArr[0] > 255 || rgbArr[1] > 255 || rgbArr[2] > 255) {
            //     this.s = this.s - 1;
            //     rgbArr = CSpace.hsp.rgb(this.hsp);
            // }

            this.r = rgbArr[0]
            this.g = rgbArr[1]
            this.b = rgbArr[2]

            const rgbHEX = CString.to.hex(rgbArr)

            if (rgbHEX) {
                this.hex = rgbHEX.slice(1)
                this.$emit('update', { index: this.index, hex: this.hex })
            } else {
                this.hex = 'Wrong HEX'
            }
        },
        getMaxSFromHSP(h, p) {                    
            let maxS = 0

            let rgbArr = CSpace.hsp.rgb([h, maxS, p])

            while (rgbArr[0] <= 255 && rgbArr[1] <= 255 && rgbArr[2] <= 255) {
                if (maxS === 100) {
                    maxS = maxS + 1
                    break
                }
                maxS = maxS + 1
                rgbArr = CSpace.hsp.rgb([h, maxS, p])
            }
            
            maxS = maxS - 1
            console.log('maxS', maxS)
            return maxS
        },
        hexColorChanged(next, prev) {
            this.hex = next
            const rgbArr = CString.get.rgb(`#${this.hex}`)

            if (rgbArr) {
                this.r = rgbArr[0]
                this.g = rgbArr[1]
                this.b = rgbArr[2]

                const hspArr = CSpace.rgb.hsp(this.rgb)

                this.h = hspArr[0]
                this.sr = hspArr[1]/this.maxS*100
                this.p = hspArr[2]

                this.$emit('update', { index: this.index, hex: this.hex })
            }
        },
        makeCleanColor() {
            this.s = this.maxS
            this.handleChange()
        },
    },
}
</script>

<style>
.color {
    width: 100px;
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
    width: 140px;
    margin-left: 12px;
}

.el-input {
    width: 100px;
    margin-left: 12px;
}

.box-card {
    display: flex;
    align-items: stretch;
}

.color__delta {
    cursor: pointer;
}

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
