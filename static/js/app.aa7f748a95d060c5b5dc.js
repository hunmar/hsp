webpackJsonp([1],{123:function(t,s,n){"use strict";function a(t){n(124)}var r=n(125),e=n(126),i=n(8),o=a,h=i(r.a,e.a,o,"data-v-46baed38",null);s.a=h.exports},124:function(t,s){},125:function(t,s,n){"use strict";var a=n(10),r=n.n(a);s.a={name:"GradientColor",props:["h","s","p"],data:function(){return{isBadClass:!1}},methods:{calculateRGB:function(t){var s=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=r.a.hsp.rgb(t);return n[0]>255||n[1]>255||n[2]>255?this.calculateRGB([t[0],t[1]-1,t[2]],!0):(this.isBadClass=s,{"background-color":"rgb("+r.a.hsp.rgb(t).join(",")+")"})}}}},126:function(t,s,n){"use strict";var a=function(){var t=this,s=t.$createElement;return(t._self._c||s)("span",{staticClass:"h-axis",class:{"h-axis_bad":t.isBadClass,"h-axis_good":!t.isBadClass},style:t.calculateRGB([t.h,t.s>=0?t.s:0,t.p])})},r=[],e={render:a,staticRenderFns:r};s.a=e},127:function(t,s,n){"use strict";function a(t){n(128)}var r=n(129),e=n(130),i=n(8),o=a,h=i(r.a,e.a,o,null,null);s.a=h.exports},128:function(t,s){},129:function(t,s,n){"use strict";var a=n(20),r=n.n(a),e=n(10),i=n.n(e),o=n(43),h=n.n(o);s.a={name:"SingleColor",props:["id","hspColor"],data:function(){var t=this.hspColor.split(","),s=i.a.hsp.rgb(t),n=this.getMaxSFromHSP(t[0],t[2]),a=(this.getIntSR([s[0],s[1],s[2]],t,n),h.a.to.hex(s).slice(1));return{h:parseInt(t[0],10),s:parseInt(t[1],10),p:parseInt(t[2],10),r:s[0],g:s[1],b:s[2],hex:a}},computed:{hsp:function(){console.log("Calc HSP");var t=this.fixedS<parseInt(this.s,10)?this.fixedS:parseInt(this.s,10);return[parseInt(this.h,10),t,parseInt(this.p,10)]},hsrp:function(){return console.log("Calc HSrP"),[parseInt(this.h,10),parseInt(this.sr,10)*this.maxS/100,parseInt(this.p,10)]},rgb:function(){return[parseInt(this.r,10),parseInt(this.g,10),parseInt(this.b,10)]},sr:function(){return this.s/this.maxS*100},maxS:function(){return this.getMaxSFromHSP(this.h,this.p)},fixedS:function(){if(this.s>this.maxS){for(var t=i.a.hsp.rgb([this.h,this.s,this.p]),s=this.s;s>0&&(t[0]>255||t[1]>255||t[2]>255);)s-=1,t=i.a.hsp.rgb([this.h,s,this.p]);return s}return this.s}},methods:{getIntSR:function(t,s,n){var a=s[0],e=s[1]/n*100,o=s[2];if(console.log("etalonRGB",t),e===parseInt(e,10))return console.log("sr"),e;var h=Math.round(e);if(console.log("roundSR",i.a.hsp.rgb([a,h*n/100,o])),r.a.isEqual(i.a.hsp.rgb([a,h*n/100,o]),t))return console.log("roundSR"),h;var l=Math.floor(e);return console.log("floorSR",i.a.hsp.rgb([a,l*n/100,o])),r.a.isEqual(i.a.hsp.rgb([a,l*n/100,o]),t)?(console.log("floorSR"),l):void 0},handleChangeH:function(t,s){this.h=t,this.handleChange()},handleChangeS:function(t,s){this.s=t,this.handleChange()},handleChangeSR:function(t,s){this.sr=t,this.handleChange()},handleChangeP:function(t,s){this.p=t,this.handleChange()},handleChange:function(){var t=i.a.hsp.rgb(this.hsp);this.r=t[0],this.g=t[1],this.b=t[2];var s=h.a.to.hex(t);s?(this.hex=s.slice(1),this.$emit("update",{id:this.id,value:[this.h,this.s,this.p].join(",")})):this.hex="Wrong HEX"},getMaxSFromHSP:function(t,s){for(var n=0,a=i.a.hsp.rgb([t,n,s]);a[0]<=255&&a[1]<=255&&a[2]<=255;){if(100===n){n+=1;break}n+=1,a=i.a.hsp.rgb([t,n,s])}return n-=1,console.log("maxS",n),n},hexColorChanged:function(t,s){this.hex=t;var n=h.a.get.rgb("#"+this.hex);if(n){this.r=n[0],this.g=n[1],this.b=n[2];var a=i.a.rgb.hsp(this.rgb);this.h=parseInt(a[0],10),this.s=parseInt(a[1],10),this.p=parseInt(a[2],10),this.fixedS=this.s}},makeCleanColor:function(){this.s=this.maxS,this.handleChange()}},mounted:function(){this.handleChange()}}},130:function(t,s,n){"use strict";var a=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("el-row",{staticClass:"single-color"},[n("el-col",[n("el-card",[n("div",{staticClass:"box-card"},[n("div",{staticClass:"color",style:{"background-color":"rgb("+this.rgb.join(",")+")"}}),t._v(" "),n("div",{staticClass:"controls"},[n("el-input",{attrs:{value:this.hex},on:{change:t.hexColorChanged,blur:t.handleChange}},[n("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("#")])],2),t._v(" "),n("el-input-number",{attrs:{min:0,max:360,controls:!1,value:this.h},on:{change:t.handleChangeH}},[n("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("H")])],2),t._v(" "),n("el-input-number",{attrs:{min:0,max:100,controls:!1,value:this.s},on:{change:t.handleChangeS}},[n("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("S")])],2),t._v(" "),n("el-input-number",{attrs:{min:0,max:255,controls:!1,value:this.p},on:{change:t.handleChangeP}},[n("template",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("P")])],2),t._v(" "),n("div",{staticClass:"meta"},[n("span",[t._v("\n                            Max S: "+t._s(this.maxS)+"\n                        ")]),t._v(" "),n("span",[t._v("\n                            % S: "+t._s(this.sr.toFixed(2))+"\n                        ")]),t._v(" "),n("span",[t._v("\n                            Delta S: "+t._s(this.maxS-this.s)+"\n                        ")]),t._v(" "),n("span",[t._v("\n                            Fixed S: "+t._s(this.fixedS)+"\n                        ")])])],1)])])],1)],1)},r=[],e={render:a,staticRenderFns:r};s.a=e},131:function(t,s,n){"use strict";function a(t){n(132)}var r=n(133),e=n(134),i=n(8),o=a,h=i(r.a,e.a,o,null,null);s.a=h.exports},132:function(t,s){},133:function(t,s,n){"use strict";var a=n(20),r=(n.n(a),n(10)),e=n.n(r);s.a={name:"Bridge",props:["hspColorTop","hspColorBottom"],computed:{rgbTop:function(){var t=this.hspColorTop.split(","),s=this.getMaxSFromHSP(t[0],t[2]),n=t[1];if(n>s)for(var a=e.a.hsp.rgb([t[0],t[1],t[2]]);n>0&&(a[0]>255||a[1]>255||a[2]>255);)n-=1,a=e.a.hsp.rgb([t[0],n,t[2]]);var r=n<parseInt(t[1],10)?n:parseInt(t[1],10);return e.a.hsp.rgb([parseInt(t[0],10),r,parseInt(t[2],10)]).join(",")},rgbBottom:function(){var t=this.hspColorBottom.split(","),s=this.getMaxSFromHSP(t[0],t[2]),n=t[1];if(n>s)for(var a=e.a.hsp.rgb([t[0],t[1],t[2]]);n>0&&(a[0]>255||a[1]>255||a[2]>255);)n-=1,a=e.a.hsp.rgb([t[0],n,t[2]]);var r=n<parseInt(t[1],10)?n:parseInt(t[1],10);return e.a.hsp.rgb([parseInt(t[0],10),r,parseInt(t[2],10)]).join(",")}},methods:{getMaxSFromHSP:function(t,s){for(var n=0,a=e.a.hsp.rgb([t,n,s]);a[0]<=255&&a[1]<=255&&a[2]<=255;){if(100===n){n+=1;break}n+=1,a=e.a.hsp.rgb([t,n,s])}return n-=1}}}},134:function(t,s,n){"use strict";var a=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("el-row",[n("el-col",[n("el-card",[n("div",{staticClass:"box-card"},[n("div",{staticClass:"color",style:{background:"linear-gradient(180deg, rgb("+this.rgbTop+"), rgb("+this.rgbBottom+"))"}})])])],1)],1)},r=[],e={render:a,staticRenderFns:r};s.a=e},135:function(t,s,n){"use strict";var a=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"colors"},[n("Draggable",{attrs:{list:t.hspColors,options:{handler:".color"}}},t._l(t.hspColors,function(s,a){return n("SingleColor",{key:s.id,attrs:{hspColor:s.value,id:s.id},on:{update:t.updatehspColors}})})),t._v(" "),n("el-button",{staticClass:"add-btn",attrs:{type:"primary"},on:{click:t.addColor}},[t._v("Add color")]),t._v(" "),n("div",{staticClass:"colors__gradient"},[t._l(52,function(s,n){return[t._l(37,function(t,s){})]})],2)],1)},r=[],e={render:a,staticRenderFns:r};s.a=e},136:function(t,s,n){"use strict";var a=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{attrs:{id:"app"}},[n("colors")],1)},r=[],e={render:a,staticRenderFns:r};s.a=e},44:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=n(4),r=n(45),e=n.n(r),i=n(86),o=(n.n(i),n(88));a.default.use(e.a),a.default.config.productionTip=!1,new a.default({el:"#app",template:"<App/>",components:{App:o.a}})},86:function(t,s){},88:function(t,s,n){"use strict";function a(t){n(89)}var r=n(90),e=n(136),i=n(8),o=a,h=i(r.a,e.a,o,null,null);s.a=h.exports},89:function(t,s){},90:function(t,s,n){"use strict";var a=n(91);s.a={name:"app",components:{Colors:a.a}}},91:function(t,s,n){"use strict";function a(t){n(92)}var r=n(93),e=n(135),i=n(8),o=a,h=i(r.a,e.a,o,"data-v-415af822",null);s.a=h.exports},92:function(t,s){},93:function(t,s,n){"use strict";var a=n(20),r=n.n(a),e=n(94),i=n.n(e),o=n(10),h=n.n(o),l=n(43),c=n.n(l),p=n(123),u=n(127),d=n(131);s.a={name:"colors",components:{Draggable:i.a,GradientColor:p.a,SingleColor:u.a,Bridge:d.a},data:function(){var t=window.location.hash?window.location.hash.slice(1).split(";"):["48,69,220"],s=c.a.get.rgb("#FFDC4F")||[255,219,77],n=h.a.rgb.hsp(s);return{h:n[0],s:n[1],p:n[2],r:s[0],g:s[1],b:s[2],hexColor:"FFDC4F",idCounter:t.length-1,hspColors:t.map(function(t,s){return{id:s,value:t}})}},computed:{rgb:function(){return[parseInt(this.r,10),parseInt(this.g,10),parseInt(this.b,10)]},rgbbw:function(){return h.a.hsp.rgb([parseInt(this.h,10),0,parseInt(this.p,10)])},rgb2:function(){return h.a.hsp.rgb([(parseInt(this.h,10)+120)%360,parseInt(this.s,10),parseInt(this.p,10)])},rgbbw2:function(){return h.a.hsp.rgb([(parseInt(this.h,10)+120)%360,0,parseInt(this.p,10)])},rgb3:function(){return h.a.hsp.rgb([(parseInt(this.h,10)+240)%360,parseInt(this.s,10),parseInt(this.p,10)])},rgbbw3:function(){return h.a.hsp.rgb([(parseInt(this.h,10)+240)%360,0,parseInt(this.p,10)])},hsp:function(){return[parseInt(this.h,10),parseInt(this.s,10),parseInt(this.p,10)]}},methods:{addColor:function(){var t=r.a.clone(this.hspColors[this.hspColors.length-1]);this.idCounter++,t.id=this.idCounter,this.hspColors.push(t),window.location.hash=r.a.map(this.hspColors,"value").join(";")},updatehspColors:function(t){var s=r.a.findIndex(this.hspColors,{id:t.id});this.hspColors.splice(s,1,t),window.location.hash=r.a.map(this.hspColors,"value").join(";")},recalculateRGB:r.a.throttle(function(){var t=h.a.hsp.rgb(this.hsp);this.r=t[0],this.g=t[1],this.b=t[2]},100),recalculateHSP:r.a.throttle(function(){var t=h.a.rgb.hsp(this.rgb);this.h=t[0],this.s=t[1],this.p=t[2]},100),hexColorChanged:r.a.debounce(function(){var t=c.a.get.rgb("#"+this.hexColor);t&&(this.r=t[0],this.g=t[1],this.b=t[2],this.changeLocation(),this.recalculateHSP())},50),rgbColorChanged:r.a.debounce(function(){this.changeLocation(!0),this.recalculateHSP()},50),hspColorChanged:r.a.debounce(function(){this.changeLocation(!0),this.recalculateRGB()},50),changeLocation:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],s=[parseInt(this.r,10),parseInt(this.g,10),parseInt(this.b,10)],n=c.a.to.hex(s);n&&t&&(this.hexColor=n.slice(1))}}}}},[44]);
//# sourceMappingURL=app.aa7f748a95d060c5b5dc.js.map