webpackJsonp([1],{"0y3+":function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=s("VU/8")({name:"App"},n,!1,function(e){s("gsu9")},null,null).exports,r=s("/ocq"),d={name:"Vote",data:function(){return{msg:"Vote",SelectedNum:1,selectSexVal:"",selectDepartVal:"",departId:"",sexId:"",checkId:"",personList:[{depart:{departName:"男-设计",children:[{name:"陈永杰",id:"1",sex:"1",depatId:"1"},{name:"姚鑫",id:"2",sex:"1",depatId:"1"},{name:"叶志勇",id:"3",sex:"1",depatId:"1"},{name:"陈晨",id:"4",sex:"1",depatId:"1"},{name:"陈杰",id:"5",sex:"1",depatId:"1"},{name:"易剑芸",id:"6",sex:"1",depatId:"1"},{name:"林志华",id:"7",sex:"1",depatId:"1"}]}},{depart:{departName:"女-设计",children:[{name:"陈丽丽",id:"11",sex:"2",depatId:"1"},{name:"易艳君",id:"12",sex:"2",depatId:"1"},{name:"张琪媛",id:"13",sex:"2",depatId:"1"}]}},{depart:{departName:"男-前端",children:[{name:"黄剑坤",id:"22",sex:"1",depatId:"2"},{name:"刘宏",id:"23",sex:"1",depatId:"2"},{name:"骆至坤",id:"24",sex:"1",depatId:"2"},{name:"田文滨",id:"25",sex:"1",depatId:"2"},{name:"张弛",id:"26",sex:"1",depatId:"2"}]}},{depart:{departName:"女-前端",children:[{name:"刘洪南",id:"31",sex:"2",depatId:"2"},{name:"陈梅秀",id:"32",sex:"2",depatId:"2"},{name:"李凌燕",id:"33",sex:"2",depatId:"2"},{name:"李曼",id:"34",sex:"2",depatId:"2"}]}}],unJoinIds:[],joinIds:[],isCheckIds:[],winFlag:!1,selectArr:[]}},methods:{voteBoxEvn:function(){this.winFlag=!1},voteEvn:function(){var e=this;if(this.SelectedNum<=0)return this.$message.warning("抽奖人数需要大于0");var t=this.arrayIntersection(this.departJoinIds,this.sexJoinIds);this.Arr=this.arrayIntersection(this.joinIds,t);var s=0,i=setInterval(function(){var t=e.getArrayItems(e.Arr,e.SelectedNum);if(30==s){clearInterval(i),e.selectArr=[];for(var n=0;n<e.personList.length;n++)for(var a=e.personList[n].depart.children,r=0;r<a.length;r++){var d=a[r].id;t.includes(d)&&e.selectArr.push(a[r])}e.winFlag=!0}s++;for(var l=0;l<e.personList.length;l++)for(var o=e.personList[l].depart.children,c=0;c<o.length;c++){var p=o[c].id;t.includes(p)?o[c].selected=!0:o[c].selected=!1}},100)},isCheckEvn:function(e){if(e.unJoin||e.unJoinDepat||e.unJoinSex)-1==this.departJoinIds.indexOf(e.id)&&this.departJoinIds.push(e.id),-1==this.joinIds.indexOf(e.id)&&this.joinIds.push(e.id),-1==this.sexJoinIds.indexOf(e.id)&&this.sexJoinIds.push(e.id),e.unJoin=!1,e.unJoinDepat=!1,e.unJoinSex=!1;else{var t=this.departJoinIds.indexOf(e.id);this.departJoinIds.splice(t,1);var s=this.joinIds.indexOf(e.id);this.joinIds.splice(s,1);var i=this.sexJoinIds.indexOf(e.id);this.sexJoinIds.splice(i,1),e.unJoin=!0,e.unJoinDepat=!0,e.unJoinSex=!0}},getArrayItems:function(e,t){t<=0&&this.$message.warning("抽奖人数必须大于0");var s=new Array;for(var i in e)s.push(e[i]);this.return_array=new Array;for(var n=0;n<t&&s.length>0;n++){var a=Math.floor(Math.random()*s.length);this.return_array[n]=s[a],s.splice(a,1)}return this.return_array},arrayIntersection:function(e,t){return e.filter(function(e){return t.indexOf(e)>-1})},selectDepartEvn:function(e){this.departId=e;new Array;for(var t=0;t<this.personList.length;t++)for(var s=this.personList[t].depart.children,i=0;i<s.length;i++){var n=s[i].id;if(e)if(s[i].depatId==e)-1==this.departJoinIds.indexOf(n)&&this.departJoinIds.push(n),this.$set(s[i],"unJoinDepat",!1);else{var a=this.departJoinIds.indexOf(n);this.departJoinIds.splice(a,1),this.$set(s[i],"unJoinDepat",!0)}else this.joinIds=this.IdsAll,this.departJoinIds=this.IdsAll,this.$set(s[i],"unJoin",!1),this.$set(s[i],"unJoinDepat",!1)}},selectSexEvn:function(e){this.sexId=e;new Array;for(var t=0;t<this.personList.length;t++)for(var s=this.personList[t].depart.children,i=0;i<s.length;i++){var n=s[i].id;if(e)if(s[i].sex==e)-1==this.sexJoinIds.indexOf(n)&&this.sexJoinIds.push(n),this.$set(s[i],"unJoinSex",!1);else{var a=this.sexJoinIds.indexOf(n);this.sexJoinIds.splice(a,1),this.$set(s[i],"unJoinSex",!0)}else this.joinIds=this.IdsAll,this.sexJoinIds=this.IdsAll,this.$set(s[i],"unJoin",!1),this.$set(s[i],"unJoinSex",!1)}}},created:function(){this.Arr=new Array;for(var e=0;e<this.personList.length;e++)for(var t=this.personList[e].depart.children,s=0;s<t.length;s++){var i=t[s].id;this.Arr.push(i),this.$set(t[s],"selected",!1),this.$set(t[s],"disabled",!1),this.$set(t[s],"unJoin",!1),this.$set(t[s],"unJoinDepat",!1),this.$set(t[s],"unJoinSex",!1)}this.IdsAll=this.Arr.concat(),this.joinIds=this.Arr.concat(),this.departJoinIds=this.Arr.concat(),this.sexJoinIds=this.Arr.concat()}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"vote-box",on:{click:e.voteBoxEvn}},[s("h2",[e._v(e._s(e.msg))]),e._v(" "),s("div",{staticClass:"person-list"},e._l(e.personList,function(t,i){return s("ul",{key:i,staticClass:"depart",attrs:{"depart-id":t.depart.id}},[s("h4",[e._v(e._s(t.depart.departName))]),e._v(" "),e._l(t.depart.children,function(t,i){return s("li",{key:i,staticClass:"depart-li",class:[t.selected?"isSelected":"",t.unJoin?"isCheck":"",t.unJoinDepat?"unJoinDepat":"",t.unJoinSex?"unJoinSex":""],attrs:{id:t.id,"data-id":t.id,sex:t.sex},on:{click:function(s){e.isCheckEvn(t)},dblclick:function(e){t.selected=!t.selected}}},[e._v(e._s(t.name))])})],2)})),e._v(" "),s("div",{staticClass:"vote-opertion-box"},[s("el-button",{on:{click:e.voteEvn}},[e._v("抽奖")]),e._v(" "),s("el-select",{on:{change:e.selectDepartEvn},model:{value:e.selectDepartVal,callback:function(t){e.selectDepartVal=t},expression:"selectDepartVal"}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),s("el-option",{attrs:{label:"设计",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"前端",value:"2"}})],1),e._v(" "),s("el-select",{on:{change:e.selectSexEvn},model:{value:e.selectSexVal,callback:function(t){e.selectSexVal=t},expression:"selectSexVal"}},[s("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),s("el-option",{attrs:{label:"男",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"女",value:"2"}})],1),e._v(" "),s("el-input-number",{model:{value:e.SelectedNum,callback:function(t){e.SelectedNum=t},expression:"SelectedNum"}})],1),e._v(" "),s("div",{staticClass:"tips-wrap"},[e._v("双击切换选择 / 单击切换是否参与")]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e.winFlag?s("div",{staticClass:"ballon"},[e._v("恭喜获奖人员："),s("br"),e._l(e.selectArr,function(t){return s("span",[e._v(e._s(t.name))])})],2):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips-wrap"},[t("span",{staticClass:"disabled tips"},[this._v("XXX")]),this._v("不参与")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tips-wrap"},[t("span",{staticClass:" tips"},[this._v("XXX")]),this._v("参与")])}]};var o=s("VU/8")(d,l,!1,function(e){s("0y3+")},"data-v-5b0c574c",null).exports;i.default.use(r.a);var c=new r.a({routes:[{path:"/",name:"vote",component:o}]}),p=s("zL8q"),h=s.n(p);s("tvR6");i.default.use(h.a),i.default.config.productionTip=!1,new i.default({el:"#app",router:c,components:{App:a},template:"<App/>"})},gsu9:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.0d10b87572e032853386.js.map