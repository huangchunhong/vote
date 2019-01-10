<template>
  <div class="vote-box" @click="voteBoxEvn">
    <h2>{{msg}}</h2>
    <div class="person-list">
      <ul v-for="(item,index) in personList" :key="index" :depart-id="item.depart.id" class="depart">
        <h4>{{item.depart.departName}}</h4>
        <li class="depart-li" v-for="(itemChild,itemIndex) in item.depart.children" :key="itemIndex" :id="itemChild.id" @click="isCheckEvn(itemChild)"
         :class="[itemChild.selected?'isSelected':'',itemChild.unJoin?'isCheck':'',itemChild.unJoinDepat?'unJoinDepat':'',itemChild.unJoinSex?'unJoinSex':'',]" 
         :data-id="itemChild.id" :sex="itemChild.sex">{{itemChild.name}}</li>
      </ul>
    </div>
    
    <div class="vote-opertion-box">
      <el-button @click="voteEvn">抽奖</el-button>
      <el-select v-model="selectDepartVal"  @change="selectDepartEvn">
        <el-option label="全部" value=""></el-option>
        <el-option label="设计" value="1"></el-option>
        <el-option label="前端" value="2"></el-option>
      </el-select>
      <el-select v-model="selectSexVal"  @change="selectSexEvn">
        <el-option label="全部" value=""></el-option>
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
      <el-input-number v-model="SelectedNum"></el-input-number>
      <!-- <el-button @click="joinEvn('1')">参与</el-button>
      <el-button @click="joinEvn('0')" type="danger">不参与</el-button> -->
    </div>
    <div class="tips-wrap"> <span class="disabled tips">XXX</span>不参与</div>
    <div class="tips-wrap"> <span class=" tips">XXX</span>参与</div>
    <div class="ballon" v-if="winFlag">中奖啦！就是你</div>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data () {
    return {
      msg: 'Vote',
      SelectedNum:1,
      selectSexVal:"",
      selectDepartVal:"",
      departId:"",
      sexId:"",
      checkId:"",
      personList:[
        {depart:{departName:"男-设计",children:[{name:"陈永杰",id:"1",sex:"1",depatId:'1'},{name:"姚鑫",id:"2",sex:"1",depatId:'1'},{name:"叶志勇",id:"3",sex:"1",depatId:'1'},{name:"陈晨",id:"4",sex:"1",depatId:'1'},{name:"陈杰",id:"5",sex:"1",depatId:'1'},{name:"易剑芸",id:"6",sex:"1",depatId:'1'},{name:"林志华",id:"7",sex:"1",depatId:'1'}]}},
        {depart:{departName:"女-设计",children:[{name:"陈丽丽",id:"11",sex:"2",depatId:'1'},{name:"易艳君",id:"12",sex:"2",depatId:'1'},{name:"张琪媛",id:"13",sex:"2",depatId:'1'}]}},
        {depart:{departName:"男-前端",children:[{name:"黄剑坤",id:"22",sex:"1",depatId:'2'},{name:"刘宏",id:"23",sex:"1",depatId:'2'},{name:"骆至坤",id:"24",sex:"1",depatId:'2'},{name:"田文滨",id:"25",sex:"1",depatId:'2'},{name:"张弛",id:"26",sex:"1",depatId:'2'}]}},
        {depart:{departName:"女-前端",children:[{name:"刘洪南",id:"31",sex:"2",depatId:'2'},{name:"陈梅秀",id:"32",sex:"2",depatId:'2'},{name:"李凌燕",id:"33",sex:"2",depatId:'2'},{name:"李曼",id:"34",sex:"2",depatId:'2'}]}}
      ],
      unJoinIds:[],//不参与id
      joinIds:[],//参与id
      isCheckIds:[],
      winFlag:false,
    }
  },
  methods:{
    voteBoxEvn(){
      this.winFlag = false;
    },
    voteEvn(){
      if(this.SelectedNum<=0){
        return this.$message.warning("抽奖人数需要大于0")
      }
      let departSexArr = this.arrayIntersection(this.departJoinIds, this.sexJoinIds);
      this.Arr = this.arrayIntersection(this.joinIds,departSexArr);
      // console.log(this.departJoinIds,'部门')
      // console.log( this.sexJoinIds,'性别')
      // console.log(this.joinIds, "单独点击")
      // console.log(this.Arr, "交集")
      let getRound=0;
      let timer = setInterval(()=>{
        let getItems = this.getArrayItems(this.Arr,this.SelectedNum);
        // console.log(getItems)
          if(getRound==30){
            clearInterval(timer);
            this.winFlag = true;
          }
          getRound ++;
          for (let i = 0; i < this.personList.length; i++) {
            const element = this.personList[i].depart.children;
            for (let j = 0; j < element.length; j++) {
              const ele = element[j].id;
              if(getItems.includes(ele)){
                element[j].selected = true;//选中
              }else{
                element[j].selected=false;//清除选中
              }
            }
          }
      },100)
    },
    isCheckEvn(item){
      if(item.unJoin||item.unJoinDepat||item.unJoinSex){
        if(this.departJoinIds.indexOf(item.id)==-1){
          this.departJoinIds.push(item.id);
        }
        if(this.joinIds.indexOf(item.id)==-1){
          this.joinIds.push(item.id);
        }
        if(this.sexJoinIds.indexOf(item.id)==-1){
          this.sexJoinIds.push(item.id);
        }
        item.unJoin=false;
        item.unJoinDepat=false;
        item.unJoinSex=false;
      }else{
        let indexDepat = this.departJoinIds.indexOf(item.id);
        this.departJoinIds.splice(indexDepat,1)
        let index = this.joinIds.indexOf(item.id);
        this.joinIds.splice(index,1)
        let indexSex = this.sexJoinIds.indexOf(item.id);
        this.sexJoinIds.splice(indexSex,1)
        item.unJoin=true;
        item.unJoinDepat=true;
        item.unJoinSex=true;
      }
      
    },
    //从一个给定的数组arr中,随机返回num个不重复项
    getArrayItems(arr,num) {
      if(num<=0){
        this.$message.warning("抽奖人数必须大于0")
      }
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        this.return_array = new Array();
        for (var i = 0; i<num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length>0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                this.return_array[i] = temp_array[arrIndex];
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return this.return_array;
    },
    // 数组交集
    arrayIntersection(a, b){
      let intersection = a.filter(function(v){ return b.indexOf(v) > -1 })
      return intersection;
      },
       // 部门选择
      selectDepartEvn(val){
        this.departId = val;
        let eleArr =new Array();
        for (let i = 0; i < this.personList.length; i++) {
          const element = this.personList[i].depart.children;
          for (let j = 0; j < element.length; j++) {
            const ele = element[j].id;
            if(val){
                if(element[j].depatId==val){
                  if(this.departJoinIds.indexOf(ele)==-1){
                    this.departJoinIds.push(ele)
                  }
                  this.$set(element[j],'unJoinDepat', false)
                }else{
                  let index = this.departJoinIds.indexOf(ele);
                  this.departJoinIds.splice(index,1);
                  this.$set(element[j],'unJoinDepat', true)
                }
              }else{
                this.joinIds = this.IdsAll;
                this.departJoinIds = this.IdsAll;
                this.$set(element[j],'unJoin', false)
                this.$set(element[j],'unJoinDepat', false)
            }
          }
        }
        // console.log(this.departJoinIds)
      },
      // 性别选择
      selectSexEvn(val){
        this.sexId = val;
        let eleArr =new Array();
        for (let i = 0; i < this.personList.length; i++) {
          const element = this.personList[i].depart.children;
          for (let j = 0; j < element.length; j++) {
            const ele = element[j].id;
            if(val){
                if(element[j].sex==val){
                  if(this.sexJoinIds.indexOf(ele)==-1){
                    this.sexJoinIds.push(ele)
                  }
                  this.$set(element[j],'unJoinSex', false)
                }else{
                  let index = this.sexJoinIds.indexOf(ele);
                  this.sexJoinIds.splice(index,1);
                  this.$set(element[j],'unJoinSex', true)
                }
              }else{
                this.joinIds = this.IdsAll;
                this.sexJoinIds = this.IdsAll;
                this.$set(element[j],'unJoin', false)
                this.$set(element[j],'unJoinSex', false)
            }
          }
        }
        // console.log(this.sexJoinIds)
      },
  },
  created() {
    this.Arr = new Array();
    for (let i = 0; i < this.personList.length; i++) {
      const element = this.personList[i].depart.children;
      for (let j = 0; j < element.length; j++) {
        const ele = element[j].id;
        this.Arr.push(ele)
        this.$set(element[j],'selected', false)
        this.$set(element[j],'disabled', false)
        this.$set(element[j],'unJoin', false)
        this.$set(element[j],'unJoinDepat', false)
        this.$set(element[j],'unJoinSex', false)
      }
    }
    this.IdsAll = this.Arr.concat();
    this.joinIds=this.Arr.concat();
    this.departJoinIds=this.Arr.concat();
    this.sexJoinIds=this.Arr.concat();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.depart-li{
  display: inline-block;
  margin: 0 10px;
  padding: 3px 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.depart-li:hover{
  background-color: #000;
  color: #fff;
}
.isSelected{
  background-color: crimson;
  color: #fff;
}
.disabled{
  background-color: #eee;
  color: #fff;
}
.disabled-sex{
  background-color: #eee;
  color: #fff;
}
.isCheck{
  background-color: #eee;
  color: #fff;
}
.unJoinSex{
  background-color: #eee;
  color: #fff;
}
.unJoinDepat{
  background-color: #eee;
  color: #fff;
}
.vote-opertion-box{
  padding-bottom: 30px;
}
.tips-wrap{
  float: right;
  font-size: 12px;
}
.tips{
  margin: 0 10px;
  padding: 3px 5px;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
}
 @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
      0%{
          transform: scale(1);  /*开始为原始大小*/
      }
      100%{
          transform: scale(5.1);
      }
  }
    .ballon{
        width: 150px;
        position: absolute;
        top: 40%;left: 50%;margin-left: -75px;
        color: red;
        -webkit-animation-name: scaleDraw; /*关键帧名称*/
        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
        -webkit-animation-iteration-count: 1;  /*动画播放的次数*/
        -webkit-animation-duration: 2s; /*动画所花费的时间*/
        animation-fill-mode: forwards;
    }
</style>
