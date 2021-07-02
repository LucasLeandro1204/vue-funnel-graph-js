import{interpolate as t}from"polymorph-js";import e from"@tweenjs/tween.js";import s from"funnel-graph-js";import{formatNumber as a}from"funnel-graph-js/src/js/number";import{getDefaultColors as i,generateLegendBackground as n}from"funnel-graph-js/src/js/graph";import"funnel-graph-js/src/scss/main.scss";import"funnel-graph-js/src/scss/theme.scss";const r={name:"VueFunnelGraph",props:{animated:{type:Boolean,default:!1},width:[String,Number],height:[String,Number],values:Array,labels:Array,colors:{type:Array,default:()=>[]},subLabels:Array,subLabelValue:{type:String,default:"percent"},direction:{type:String,default:"horizontal"},gradientDirection:{type:String,default:"horizontal"},displayPercentage:{type:Boolean,default:!0}},data:()=>({paths:[],prevPaths:[],graph:null,tween:null,defaultColors:i(10)}),computed:{valuesFormatted(){return this.graph.is2d()?this.graph.getValues2d().map((t=>a(t))):this.values.map((t=>a(t)))},colorSet(){const t=[];let e=0;for(let s=0;s<this.paths.length;s++){const a=this.graph.is2d()?this.getColors[s]:this.getColors,i="string"==typeof a||1===a.length?"solid":"gradient";"gradient"===i&&(e+=1),t.push({values:a,fillMode:i,fill:"solid"===i?a:`url('#funnelGradient-${e}')`})}return t},gradientSet(){const t=[];return this.colorSet.forEach((e=>{"gradient"===e.fillMode&&t.push(e)})),t},getColors(){return this.colors instanceof Array&&0===this.colors.length?i(this.is2d()?this.values[0].length:2):this.colors.length<this.paths.length?[...this.colors].concat([...this.defaultColors].splice(this.paths.length,this.paths.length-this.colors.length)):this.colors},gradientAngle(){return`rotate(${"vertical"===this.gradientDirection?90:0})`}},methods:{enterTransition(t,e){this.animated||e(),setTimeout((()=>e()),700)},leaveTransition(t,e){this.animated||e(),setTimeout((()=>e()),700)},is2d(){return this.graph.is2d()},percentages(){return this.graph.createPercentages()},twoDimPercentages(){return this.is2d()?this.graph.getPercentages2d():[]},subLabelBackgrounds(t){return this.is2d()?n(this.getColors[t],this.gradientDirection):[]},offsetColor:(t,e)=>`${Math.round(100*t/(e-1))}%`,makeAnimations(){null!==this.tween&&this.tween.stop();const s=[],a=this.prevPaths.length!==this.paths.length;let i={x:.5,y:.5};a&&(i={x:0,y:.5},this.graph.isVertical()&&(i={x:1,y:1}),this.graph.is2d()||(i={x:0,y:1})),this.paths.forEach(((e,n)=>{let r=this.prevPaths[n]||this.graph.getPathMedian(n);a&&(r=this.graph.getPathMedian(n));const l=t([r,e],{addPoints:1,origin:i,optimize:"fill",precision:1});s.push(l)}));const n={value:0};this.tween=new e.Tween(n).to({value:1},700).easing(e.Easing.Cubic.InOut).onUpdate((()=>{for(let t=0;t<this.paths.length;t++)this.$set(this.paths,t,s[t](n.value))})),this.tween.start(),function t(){e.update()&&requestAnimationFrame(t)}()},drawPaths(){this.prevPaths=this.paths,this.paths=[];this.graph.getPathDefinitions().forEach((t=>{this.paths.push(t)}))}},created(){this.graph=new s({height:this.height,width:this.width,direction:this.direction,data:{labels:this.labels,values:this.values}}),this.drawPaths(),this.animated&&this.makeAnimations()},watch:{values(){this.graph.setValues(this.values),this.drawPaths(),this.animated&&this.makeAnimations()},direction(){this.graph.setDirection(this.direction).setWidth(this.width).setHeight(this.height),this.drawPaths()}},filters:{format:function(t){return a(t)}}},l={};var o=function(t,e,s,a,i,n,r,l){var o,h="function"==typeof t?t.options:t;if(e&&(h.render=e,h.staticRenderFns=s,h._compiled=!0),a&&(h.functional=!0),n&&(h._scopeId="data-v-"+n),r?(o=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},h._ssrRegister=o):i&&(o=l?function(){i.call(this,(h.functional?this.parent:this).$root.$options.shadowRoot)}:i),o)if(h.functional){h._injectStyles=o;var u=h.render;h.render=function(t,e){return o.call(e),u(t,e)}}else{var c=h.beforeCreate;h.beforeCreate=c?[].concat(c,o):[o]}return{exports:t,options:h}}(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"funnel svg-funnel-js",class:{"svg-funnel-js--vertical":"vertical"===t.direction}},[s("div",{staticClass:"svg-funnel-js__container"},[s("svg",{attrs:{width:t.width,height:t.height}},[s("defs",t._l(t.gradientSet,(function(e,a){return s("linearGradient",{key:a,attrs:{id:"funnelGradient-"+(a+1),gradientTransform:t.gradientAngle}},t._l(e.values,(function(a,i){return s("stop",{key:i,attrs:{"stop-color":a,offset:t.offsetColor(i,e.values.length)}})})),1)})),1),t._l(t.paths,(function(e,a){return s("path",{key:a,attrs:{fill:t.colorSet[a].fill,stroke:t.colorSet[a].fill,d:e}})}))],2)]),s("transition-group",{staticClass:"svg-funnel-js__labels",attrs:{name:"appear",tag:"div"},on:{enter:t.enterTransition,leave:t.leaveTransition}},t._l(t.valuesFormatted,(function(e,a){return s("div",{key:t.labels[a].toLowerCase().split(" ").join("-"),staticClass:"svg-funnel-js__label",class:"label-"+(a+1)},[s("div",{staticClass:"label__value"},[t._v(t._s(e))]),t.labels?s("div",{staticClass:"label__title"},[t._v(t._s(t.labels[a]))]):t._e(),t.displayPercentage&&100!==t.percentages()[a]?s("div",{staticClass:"label__percentage"},[t._v(" "+t._s(t.percentages()[a])+"% ")]):t._e(),t.is2d()?s("div",{staticClass:"label__segment-percentages"},[s("ul",{staticClass:"segment-percentage__list"},t._l(t.subLabels,(function(e,i){return s("li",{key:i},[t._v(" "+t._s(e)+": "),"percent"===t.subLabelValue?s("span",{staticClass:"percentage__list-label"},[t._v(t._s(t.twoDimPercentages()[a][i])+"%")]):s("span",{staticClass:"percentage__list-label"},[t._v(t._s(t._f("format")(t.values[a][i])))])])})),0)]):t._e()])})),0),s("transition",{attrs:{name:"fade"},on:{enter:t.enterTransition,leave:t.leaveTransition}},[t.is2d()?s("div",{staticClass:"svg-funnel-js__subLabels"},t._l(t.subLabels,(function(e,a){return s("div",{key:a,class:"svg-funnel-js__subLabel svg-funnel-js__subLabel-"+(a+1)},[s("div",{staticClass:"svg-funnel-js__subLabel--color",style:t.subLabelBackgrounds(a)}),s("div",{staticClass:"svg-funnel-js__subLabel--title"},[t._v(t._s(e))])])})),0):t._e()])],1)}),[],!1,(function(t){for(let e in l)this[e]=l[e]}),"2741205a",null,null).exports,h=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",VueFunnelGraph:o});const u={install:function t(e){t.installed||(t.installed=!0,Object.keys(h).forEach((t=>{e.component(t,h[t])})))}};let c=null;"undefined"!=typeof window?c=window.Vue:"undefined"!=typeof global&&(c=global.Vue),c&&c.use(u);export default u;export{o as VueFunnelGraph};
