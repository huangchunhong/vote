<template>
  <div class="vote-box">
    <h2>{{msg}}</h2>
    <div class="person-list">
      <ul v-for="(item,index) in personList" :key="index" :depart-id="item.depart.id" class="depart">
        <h4>{{item.depart.departName}}</h4>
        <li class="depart-li" v-for="(itemChild,itemIndex) in item.depart.children" :key="itemIndex" :id="itemChild.id"
         :class="[departId=='0'?'':departId==item.depart.id?'':'disabled',sexId=='0'?'':sexId==itemChild.sex?'':'disabled-sex',itemChild.check==itemChild.id?'check':'']" 
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
    </div>
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
      departId:"0",
      sexId:"0",
      checkId:"",
      personList:[
        {depart:{departName:"男-设计",id:"1",children:[{name:"陈永杰",id:"1",sex:"1",check:""},{name:"姚鑫",id:"2",sex:"1",check:""},{name:"叶志勇",id:"3",sex:"1",check:""},{name:"陈晨",id:"4",sex:"1",check:""},{name:"陈杰",id:"5",sex:"1",check:""},{name:"易剑芸",id:"6",sex:"1",check:""}]}},
        {depart:{departName:"女-设计",id:"1",children:[{name:"陈丽丽",id:"11",sex:"2",check:""},{name:"易艳君",id:"12",sex:"2",check:""},{name:"张琪媛",id:"13",sex:"2",check:""},{name:"夏玲玉",id:"14",sex:"2",check:""}]}},
        {depart:{departName:"男-前端",id:"2",children:[{name:"温富杰",id:"21",sex:"1",check:""},{name:"黄剑坤",id:"22",sex:"1",check:""},{name:"刘宏",id:"23",sex:"1",check:""},{name:"骆至坤",id:"24",sex:"1",check:""},{name:"田文滨",id:"25",sex:"1",check:""}]}},
        {depart:{departName:"女-前端",id:"2",children:[{name:"刘洪南",id:"31",sex:"2",check:""},{name:"陈梅秀",id:"32",sex:"2",check:""},{name:"李凌燕",id:"33",sex:"2",check:""},{name:"李曼",id:"34",sex:"2",check:""},{name:"周微微",id:"35",sex:"2",check:""}]}}
      ]
    }
  },
  methods:{
    voteEvn(){
      if(this.SelectedNum<=0){
        console.log("抽奖人数需要大于0")
        return
      }
      this.Arr = this.arrayIntersection(this.arrDepart, this.arrSex);
      console.log(this.arrDepart, this.arrSex)
      console.log(this.Arr, "交集")
      let getRound=0;
      let timer = setInterval(()=>{
        let getItems = this.getArrayItems(this.Arr,this.SelectedNum);
        // console.log(getItems)
          if(getRound==30){
            clearInterval(timer)
          }
          getRound ++;
          for (let i = 0; i < this.personList.length; i++) {
            const element = this.personList[i].depart.children;
            for (let j = 0; j < element.length; j++) {
              const ele = element[j].id;
              if(getItems.includes(ele)){
                element[j].check = ele;//选中
              }else{
                element[j].check="";//清除选中
              }
            }
          }
      },100)
    },
    // 选择性别
    selectSexEvn(val){
      
      console.log(val)
      this.sexId="0";
      this.arrSex = [];
      if(val){
        this.sexId = val;
        this.arrSex=this.getSexId(val)
      }else{
        this.sexId="0";
        this.getDataArr()
      }
        // console.log(this.arrSex)
    },
    // 选择部门
    selectDepartEvn(val){
      this.departId = "0";
      this.arrDepart = [];
      if(val){
        this.departId = val;
        this.arrDepart=this.getEleId(val)
      }else{
        this.departId = "0";
        this.getDataArr()
      }
        // console.log(this.arrDepart)
      
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
      getEleId(val){
        let eleArr =new Array();
        for (let i = 0; i < this.personList.length; i++) {
          const element = this.personList[i].depart.children;
          if(this.personList[i].depart.id==val){
            for (let j = 0; j < element.length; j++) {
              const ele = element[j].id;
              eleArr.push(ele)
            }
          }
        }
        return eleArr
      },
      getSexId(val){
        let eleArr =new Array();
        for (let i = 0; i < this.personList.length; i++) {
          const element = this.personList[i].depart.children;
          for (let j = 0; j < element.length; j++) {
            const ele = element[j].id;
            if(element[j].sex==val){
              eleArr.push(ele)
            }
          }
        }
        return eleArr
      },
    getDataArr(){
        this.Arr = new Array();
        for (let i = 0; i < this.personList.length; i++) {
          const element = this.personList[i].depart.children;
          for (let j = 0; j < element.length; j++) {
            const ele = element[j].id;
            this.Arr.push(ele)
          }
        }
        this.arrDepart=this.Arr.concat();
        this.arrSex=this.Arr.concat();
        
    },

  },
  created() {
    this.getDataArr()
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
  background-color: crimson;
  color: #fff;
}
.check{
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
</style>
