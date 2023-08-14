<template>
  <div style="margin-bottom: 80px">
    <h2 style="margin-top:20px;">請選擇要隨機出題的題組(可選擇1~多個)</h2>
    <div class="commodity-list">
      <loading 
        :active.sync="$store.state.isLoading" 
        />
      <div
        class="commodity"
        v-for="(commodity, index) in commodityList"
        :key="index"
        :class="commodity.isSelected ? 'beClicked' : ''"
        @click="isClicked(index)"
      >
        <div class="content" >
          <img :src="commodity.imageUrl" alt="" />
          <div class="title text-truncate2 text-dark">
            {{ commodity.name }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-button  
        style="width: 100px; height:55px; margin-top:80px"
        variant="light"
        v-if="hasChosenNumber==0"
        @click="chooseAlert"
        >
        確定
      </b-button>
      <b-button  
        style="width: 100px; height:55px;margin-top:80px" 
        variant="outline-secondary" 
        v-else
        @click="readyStartTest"
        >
        確定
      </b-button>
      <b-modal
        v-if="readyBtn"
        v-model="modalShow"
        class="modal"
        hide-footer
        id="bv-modal-a"
      >
        <h5 style="margin-bottom:20px;">請輸入出題題數(5-10):</h5>
        <input type="text" v-model="totalQuizNumber"/>
        <!-- <p>{{totalQuizNumber-1}}</p> -->
        <h5 style="margin-top:20px;">你選擇要隨機出題的題組有：</h5>
        <template #modal-header >
          <div class="mx-auto" style="width: 100%; margin-top:-120px;">
            <b-button
              squared
              style="width: 50px; height:30px; margin-left: 90%; margin-top:120px"
              variant="outline-dark"
              size="sm"
              @click="$bvModal.hide('bv-modal-a')"
              >X</b-button
            >
          </div>
        </template>
        
        <div class="commidity-modal">
          <div class="info-box">
            <div 
              v-for="(item, index) in hasSelectQuiz"
              :key="index"
              class="commidity-modal"
            >
              <div class="info-box" >
                <div style="display:flex">
                  <img :src="item.imageUrl" />
                  <h2 style="margin-left:10px;">{{ item.name }}</h2>
                </div>
              </div>
            </div>
          </div>
          
          <div class="action-box">
            <div>
                <!-- <button class="round" @click="subNumber">-</button>
                <span>{{ totalQuizNumber }}</span>
                <button class="round" @click="addNumber">+</button> -->
                
                <div v-if="cookie.get('accessToken')" style="display: inline-block; margin-left: 150px;">
                    <b-button class="addToShoppingCartBtn"  @click="$bvModal.hide('bv-modal-a') ;StartTest();">確定</b-button>
                </div>
                <p v-else>您还未登录，请登录后再试！</p>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import PeiiCommodity from '@/components/CommodityList.vue'
import { commodity, pass, commoditys, courses } from "@/models/commodity";
import CategoryApi from "@/apis/CategoryApi";
import RandomSelectApi from "@/apis/RandomSelectApi";
// import ShoppingCartApi from "@/apis/ShoppingCartApi";

export default defineComponent({
  name: 'RandomQuiz',
  components: {
    // PeiiCommodity,
  },
  data() {
    return {
      // currentCommodity: null as unknown as commodity,
      // currentCommodity: [] as any[],
      // commodityList: new Array<ommodity>(),
      commodityList: [] as any[],
      modalShow: false,
      hasChosenNumber: 0,
      totalQuizNumber : 5,
      // totalNumber:0 as any ,
      isCreated: false,
      isHoldingCurrentComodity: false,
      sellPlanId: "", 
      bundleId: "", 
      // isQuiz: false,
      hasSelectQuiz : [] as any[],
      readyBtn : false,
      cookie: this.$cookies,
      treeData: null as any,
    };
  },
  props: {
    // totalNumber: {
    //   type: Number,
    //   defualt: 0,
    // }
    // totalNumber : Number
  },
  
  computed: {},
  // watch: {
  //   "$store.state.sellPlanId"(newVal, oldVal) {vv
  //     this.retriveList();
  //   },
  // },
  methods: {
    addNumber() {
      this.totalQuizNumber = this.totalQuizNumber + 1;
    },
    subNumber() {
      if (this.totalQuizNumber > 5) {
        this.totalQuizNumber = this.totalQuizNumber - 1;
      }
    },
    async StartTest(){
        if(this.totalQuizNumber<5)  alert("需至少選擇5題");
        else if(this.totalQuizNumber>10)  alert("不能選擇超過10題");
        else{
          let quizGroupId  = new Array<String>();
          let quizsId ;
          for(let i = 0; i < this.hasChosenNumber; i++){
            quizGroupId.push(this.hasSelectQuiz[i].uuid as string);
          } 
          try{
            this.bundleId = this.$store.state.bundleId;
            console.log("Random bundleId: " + this.bundleId);
            const result = JSON.parse(JSON.stringify(await RandomSelectApi.getRandomQuiz(this.totalQuizNumber, quizGroupId, this.bundleId)));
            // console.log(" (RandomQuiz)addProductToShoppingCartWithContents result: " + JSON.stringify(result) );
            // let quizsId = "97f17199-e926-4d05-8f40-a067f61b6b9";
            quizsId = result.uuid;
            this.$router.push( { name: "answer" , params: {quizsId}  } )
            return true;
          }catch(error){
            console.error('Error:', error);
            return false;
          }
          
        }
    },
    chooseAlert(){
      alert("需至少選擇一個題組隨機出題");
    },
    isClicked(index: number){
      if(this.commodityList[index].isSelected){
        // 已選 -> 將原本已選改為未選中
        this.commodityList[index].isSelected = false;
        this.hasChosenNumber = this.hasChosenNumber - 1;
        // let tmp =  this.commodityList[index].saveIndex - 1;
        for(var j = this.commodityList[index].saveIndex + 1; j < this.hasSelectQuiz.length; j++){
          this.hasSelectQuiz[j].saveIndex --;
        }
        this.hasSelectQuiz.splice(this.commodityList[index].saveIndex,1);
        this.commodityList[index].saveIndex = 0;
        // console.log("this.hasSelectQuiz: " + this.hasSelectQuiz[0].name);
        console.log("------" + this.hasChosenNumber);
      }
      else{
        this.commodityList[index].isSelected = true;
        this.hasChosenNumber = this.hasChosenNumber + 1;
        this.commodityList[index].saveIndex = this.hasChosenNumber - 1;
        this.hasSelectQuiz.push(this.commodityList[index]);
        console.log("++++++" + this.hasChosenNumber);
      }
      //just for console
      for(var i = 0; i < this.hasSelectQuiz.length; i++){
        console.log("hasSelectQuiz" + i + this.hasSelectQuiz[i].name);
      }
    },
    readyStartTest() {
        this.totalQuizNumber = 5;
        this.modalShow = true;
        this.readyBtn = true;
        console.log("shopping");
    },
    checkCommodityContainByUser(commodity: commodity) {
      if (this.$store.state.userContainPasses) {
        if (this.$store.state.userContainPasses.has(commodity.pass)) {
          console.log(this.$store.state.userContainPasses);
          return true;
        }
      }
      console.log("ppp");
      return false;
    },
    course() {
      window.location.href =
        "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/and%E7%94%A8%E5%9C%A8%E5%8F%A5%E9%A6%96/index.html";
    },
  },
  async created() {
    // this.totalNumber = this.getReturnCartNumber;
    // console.log("totalNumber: " + this.totalNumber);
    this.$store.commit('updateLoading', true);
    this.sellPlanId = this.$store.state.sellPlanId;
    console.log("(random)sellPlanId: " + this.sellPlanId);

    // const randomQuizList = JSON.parse(JSON.stringify(await CategoryApi.getAllQuizGroupsInNode(this.$store.state.sellPlanId)));
    // this.commodityList = randomQuizList;
    // this.$store.commit('updateLoading', false);
    try{
      const randomQueryResult = await CategoryApi.getAllQuizGroupsInNode(
        this.$store.state.sellPlanId
      );
      // this.commodityList = await JSON.parse(  JSON.stringify(randomQueryResult));
      this.treeData = await JSON.parse(  JSON.stringify(randomQueryResult));
      console.log( this.$store.state.sellPlanId + " (choose)sellPlanQueryResult: " + JSON.stringify(randomQueryResult) );
      // console.log();
    }
    finally{
      this.$store.commit('updateLoading', false);
    }
    this.treeData.forEach((element: { name: string; uuid: any; catId: any; imageUrl:string; }) => {
        // 設定第0層的每一個元素
        let elementObject = { uuid: "", name: "" , imageUrl:"", catId: "", isSelected: false , saveIndex: 0};
        elementObject.uuid = element.uuid;
        elementObject.name = element.name;
        elementObject.imageUrl = element.imageUrl;
        elementObject.catId = element.catId;
        this.commodityList.push(elementObject);
      });
    // this.currentCommodity = this.commodityList[0];
    console.log("(random)Commodity: ", this.commodityList[0].isSelected);
    this.isCreated = true;
  },
});
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.beClicked {
  background: rgb(173, 170, 170);
  color: white;
}
.commodity-list {
  //background-color: coral;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  //background : blue;
  justify-content: center;

  .commodity {
    flex: 0 0 20%;
    margin-left: 2.5%;
    margin-top: 2.5%;
    font-size: 25px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //background: blue;

    img {
      width: 100%;
    }
    .content {
      .OfCommodity {
        margin-right: 3%;
      }
    }
  }
}
.commidity-modal {
  position: relative;
  margin: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .info-box {
    // display: flex;
    padding: 15px 5px;
    img{
      width:100px;
      height:50px;
      margin-left:10px; 
      margin-top:10px;
    }

    h2 {
      margin: 10px 0;
      padding: 0;
      font-size: 18px;
    }

    p {
      margin: 0;
      color: #aba6a6;

      &::before {
        content: "￥";
        margin-right: 0.3em;
      }
    }
  }

  .action-box {
    display: flex;
    border-top: 1px solid #f3f3f3;
    padding: 10px 10px 10px 15px;
    justify-content: space-between;
    align-items: center;

    .round {
      width: 30px;
      height: 30px;
      outline: 0;
      border: 0;
      color: #fff;
      font-size: 18px;
      background: #c3c3c3;
      border-radius: 50%;
      cursor: pointer;
    }

    span {
      display: inline-block;
      width: 2em;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
    }

    & > button {
      outline: 0;
      border: 0;
      padding: 10px 20px;
      color: #fff;
      font-size: 16px;
      text-transform: uppercase;
      background: #ef8a8b;
      cursor: pointer;
    }
  }
}

.addToShoppingCartBtn{
  outline: 0;
  border: 0;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  background: #ef8a8b;
  cursor: pointer;
  margin-top:6px;
  margin-bottom:6px; 
  width:90px;
  height:45px;
}

@media screen and (max-width: 500px) {
  .commodity-list {
    //background-color: coral;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    //background : blue;
    justify-content: center;
    .commodity {
      flex: 0 0 40%;
      margin-left: 2.5%;
      margin-top: 2.5%;
      font-size: 3px;
      //background-color : blue;
      img {
        width: 100%;
      }
      .content {
        .OfCommodity {
          margin-right: 3%;
        }
      }
    }
  }
  .commidity-modal {
    position: relative;
    margin: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .info-box {
      display: flex;
      padding: 15px 5px;

      img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        object-fit: contain;
      }

      h2 {
        margin: 10px 0;
        padding: 0;
        font-size: 18px;
      }

      p {
        margin: 0;
        color: #aba6a6;

        &::before {
          content: "￥";
          margin-right: 0.3em;
        }
      }
    }

    .action-box {
      display: flex;
      border-top: 1px solid #f3f3f3;
      padding: 10px 10px 10px 15px;
      justify-content: space-between;
      align-items: center;

      & > button {
        outline: 0;
        border: 0;
        padding: 10px 20px;
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        background: #ef8a8b;
        cursor: pointer;
      }
      & > a {
        outline: 0;
        border: 0;
        padding: 10px 20px;
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        background: #ef8a8b;
        cursor: pointer;
      }
    }
  }
}
</style>