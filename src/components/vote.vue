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
      <el-select v-model="selectDepartVal"  @change="selectDepartEvn" label="部门">
        <el-option label="全部" value=""></el-option>
        <el-option label="部门-WEB" value="1"></el-option>
        <el-option label="部门-PHP" value="2"></el-option>
        <el-option label="部门-JAVA" value="3"></el-option>
        <el-option label="部门-TEST" value="4"></el-option>
      </el-select>
      <el-select v-model="selectSexVal"  @change="selectSexEvn" label="性别">
        <el-option label="全部" value=""></el-option>
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
      <el-button @click="voteAllEvn">全选</el-button>
      <el-input-number v-model="SelectedNum"></el-input-number>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
        {depart:{departName:"部门-WEB",id:"1",children:[{name:"A",id:"1",sex:"1",check:""},{name:"B",id:"2",sex:"1",check:""},{name:"C",id:"3",sex:"1",check:""},{name:"D",id:"4",sex:"1",check:""}]}},
        {depart:{departName:"部门-PHP",id:"2",children:[{name:"F",id:"11",sex:"2",check:""},{name:"G",id:"12",sex:"2",check:""},{name:"H",id:"13",sex:"2",check:""},{name:"I",id:"14",sex:"2",check:""}]}},
        {depart:{departName:"部门-JAVA",id:"3",children:[{name:"J",id:"21",sex:"1",check:""},{name:"K",id:"22",sex:"1",check:""},{name:"L",id:"23",sex:"1",check:""},{name:"M",id:"24",sex:"1",check:""}]}},
        {depart:{departName:"部门-TEST",id:"4",children:[{name:"N",id:"31",sex:"2",check:""},{name:"O",id:"32",sex:"2",check:""},{name:"P",id:"33",sex:"2",check:""},{name:"Q",id:"34",sex:"2",check:""}]}}
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
      // console.log(this.Arr,"交集")
      let getRound=0;
      let timer = setInterval(()=>{
        let getItems = this.getArrayItems(this.Arr,this.SelectedNum);
        console.log(getItems)
          if(getRound==10){
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
    // 全选
    voteAllEvn(){
      $(".depart-li").toggleClass("check");
    },
    // 选择性别
    selectSexEvn(val){
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
      var ai=0, bi=0;
      var result = new Array();
      while( ai < a.length && bi < b.length )
      {
        if (a[ai] < b[bi] ){ ai++; }
        else if (a[ai] > b[bi] ){ bi++; }
        else /* they're equal */
        {
          result.push(a[ai]);
          ai++;
          bi++;
        }
      }
      return result;
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
  padding-right: 10px;
  text-align: center;
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
