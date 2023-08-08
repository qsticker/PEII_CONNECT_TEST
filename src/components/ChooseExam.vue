<template>
  <div style="margin-bottom: 80px">
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
        style="width:˙50px;height:60px;"
        variant="light"
        v-if="hasChooseNumber!=4"
        disabled
        @click="chooseFourAlert"
        >
        確定
      </b-button>
      <b-button  
        style="width:˙50px;height:60px;" 
        variant="light" 
        v-else 
        @click="readyAddShoppingCart"
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
        <h3>你選擇的測驗為：</h3>
        <template #modal-header >
          <div class="mx-auto" style="width: 100%; margin-top:-110px;">
            <b-button
              squared
              style="width: 10%; margin-left: 90%"
              variant="outline-dark"
              size="sm"
              @click="$bvModal.hide('bv-modal-a')"
              >X</b-button
            >
          </div>
        </template>
        <div class="commidity-modal">
          <div class="info-box">
            <!-- <h2>你選擇的測驗為：</h2> -->
            <div 
              v-for="(item, index) in fourQuiz"
              :key="index"
              class="commidity-modal"
            >
              <div class="info-box" >
                <div style="display:flex">
                  <img :src="item.imageUrl" style="width:100px;height:50px;margin-left:10px; margin-top:10px;"/>
                  <h2 style="margin-left:10px;">{{ item.name }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="action-box">
            <div v-if="cookie.get('accessToken')" style="display: inline-block; margin-left: 150px;">
              <b-button class="addToShoppingCartBtn"  @click="$bvModal.hide('bv-modal-a'); addToShoppingCart(); ">確定</b-button>
            </div>
            <p v-else>您还未登录，请登录后再试！</p>
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
import isEqual from "lodash.isequal";
import CategoryApi from "@/apis/CategoryApi";
import ShoppingCartApi from "@/apis/ShoppingCartApi";

export default defineComponent({
  name: "ChooseExam",
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
      hasChooseNumber: 0,
      hasSelect: 0,//has saved in fourQuiz
      isCreated: false,
      isHoldingCurrentComodity: false,
      // isQuiz: false,
      fourQuiz : [] as any[],
      readyBtn : false,
      addToShoppingCartStatus: false,
      cookie: this.$cookies,
      treeData: null as any,
    };
  },
  
  computed: {},
  // watch: {
  //   "$store.state.sellPlanId"(newVal, oldVal) {
  //     this.retriveList();
  //   },
  // },
  methods: {
    chooseFourAlert(){
      alert("還未選取四回測驗");
    },
    isClicked(index: number){
      if(this.commodityList[index].isSelected){
        // 已選 -> 將原本已選改為未選中
        this.commodityList[index].isSelected = false;
        this.hasChooseNumber = this.hasChooseNumber - 1;
        // let tmp =  this.commodityList[index].saveIndex - 1;
        for(var j = this.commodityList[index].saveIndex + 1; j < this.fourQuiz.length; j++){
          this.fourQuiz[j].saveIndex --;
        }
        this.fourQuiz.splice(this.commodityList[index].saveIndex,1);
        this.commodityList[index].saveIndex = 0;
        // console.log("this.fourQuiz: " + this.fourQuiz[0].name);
        console.log("------" + this.hasChooseNumber);
      }
      else{
        if(this.hasChooseNumber < 4){
          this.commodityList[index].isSelected = true;
          this.hasChooseNumber = this.hasChooseNumber + 1;
          this.commodityList[index].saveIndex = this.hasChooseNumber - 1;
          this.fourQuiz.push(this.commodityList[index]);
          console.log("++++++" + this.hasChooseNumber);
        }
      }
      //just for console
      for(var i = 0; i < this.fourQuiz.length; i++){
        console.log("fourQuiz" + i + this.fourQuiz[i].name);
      }
    },
    readyAddShoppingCart() {
      // this.$router.push({ path: "/SelectCommodity" });
      //this.currentCommodity = commodity;
      this.addToShoppingCartStatus = false;
      this.modalShow = true;
      // this.hasChooseNumber = 1;
      this.readyBtn = true;
      console.log("shopping");
    },
    async addSellPlanToShoppingCartWithSellPlanIdOnly(sellPlanId: string) {
      console.log("cookies: "+ JSON.stringify(this.$cookies.get("user")));
      await ShoppingCartApi.addProductToShoppingCart(sellPlanId, this.$cookies.get("shoppingCarUuid"));
      this.addToShoppingCartStatus= true;
      return true;
    },
    addToShoppingCart(){
      alert("已加入購物車");
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
    this.$store.commit('updateLoading', true);
    try{
      const sellPlanQueryResult = await CategoryApi.getAllQuizGroups(
        this.$store.state.sellPlanId
      );
      // this.commodityList = await JSON.parse(  JSON.stringify(sellPlanQueryResult));
      this.treeData = await JSON.parse(  JSON.stringify(sellPlanQueryResult));
      console.log( this.$store.state.sellPlanId + " (choose)sellPlanQueryResult: " + JSON.stringify(sellPlanQueryResult) );
      // console.log();
    }
    finally{
      this.$store.commit('updateLoading', false);
    }
    this.treeData.forEach((element: { name: string; uuid: any; imageUrl:string;}) => {
        // 設定第0層的每一個元素
        let elementObject = { uuid: "", name: "" , imageUrl:"", isSelected: false , saveIndex: 0};
        elementObject.uuid = element.uuid;
        elementObject.name = element.name;
        elementObject.imageUrl = element.imageUrl;
        this.commodityList.push(elementObject);
      });
    // this.currentCommodity = this.commodityList[0];
    // console.log("(choose)currentCommodity: ", this.currentCommodity);
    this.isCreated = true;
  },
});
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn{
  margin-top: 100px;
  width:100px;
  height:50px;
  border:2px #9999FF
}
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
      .price {
        margin-top: 3%;
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
        .price {
          margin-top: 3%;
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