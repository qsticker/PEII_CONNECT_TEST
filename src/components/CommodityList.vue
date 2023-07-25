<template>
  <div style="margin-bottom: 80px;">
    <div class="commodity-list">
      <div class="commodity"  v-for="( commodity ,index ) in commodityList" :key="index" >
        <!--<PeiiCommodity :commodity="commodity" />-->
        <div class="content" @click="readyAddShoppingCart(commodity)">
          <img src="@/assets/QuizCommdity.png" alt="">
          <div class="title text-truncate2 text-dark">
            <span class="classOfCommodity d-inline-block border border-danger small p-1 mr-1 text-danger"> {{ commodity.class }} </span>	{{ commodity.name }}
          </div>  
        </div>
      </div>
    </div>

    <b-modal v-if="!isHoldingCurrentComodity" v-model="modalShow" class="modal" hide-footer id="bv-modal-a">
      <template #modal-header>
         <div class="mx-auto" style="width:100%">
          <b-button squared style="width: 10%; margin-left: 90%; " variant="outline-dark" size="sm" @click="$bvModal.hide('bv-modal-a')">X</b-button>
         </div>
        </template>
      <div class="commidity-modal">
        <div class="info-box">
          <img src="@/assets/中考真題.png" />
          <div>
            <h2>{{ currentCommodity.pass.name }}</h2>
            <p>{{ currentCommodity.pass.price }}</p>
          </div>
        </div>
        <div class="action-box">
          <div>
            <button class="round" @click="subNumber">-</button>
            <span>{{ number }}</span>
            <button class="round" @click="addNumber">+</button>
          </div>
          <button @click="addCurrentCommodityInShoppingCart">加入购物车</button>
        </div>
      </div>
    </b-modal>

    <b-modal v-else v-model="modalShow" class="modal" hide-footer>Q
      <div class="commidity-modal">
        <div class="info-box">
          <img src="@/assets/中考真題.png" />
          <div>
            <h2>{{ currentCommodity.pass.name }}</h2>
            <!--<p>{{ currentCommodity.pass.price }}</p>-->
          </div>
        </div>
        <div class="action-box">
          <div>
            <button class="round" @click="subNumber">-</button>
            <span>{{ number }}</span>
            <button class="round" @click="addNumber">+</button>
          </div>
          <button v-if="isQuiz" @click="answer" >点击进入</button>
          <button v-else @click="course" >点击进入</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import PeiiCommodity from '@/components/ShoppingCart/Commodity.vue'
import { commodity , pass , commoditys , courses} from "@/models/commodity"
import isEqual from 'lodash.isequal';

export default defineComponent({
  name: 'CommodityList',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      currentCommodity : null as unknown as commodity,
      commodityList : new Array<commodity>(),
      modalShow : false,
      number : 1,
      isCreated : false,
      isHoldingCurrentComodity : false,
      isQuiz : false,
    };
  },
  props: {
    clickedClass : {
      type: String ,
      defualt: true,
    },
    type : {
      type: String ,
      defualt: true,
    },
  },
  computed: {
  },
  methods: {
      readyAddShoppingCart( commodity : commodity){
          //this.currentCommodity = commodity;
          this.modalShow = true;
          this.number = 1;
          this.currentCommodity = commodity;
          this.isHoldingCurrentComodity = this.checkCommodityContainByUser(commodity)
          this.isQuiz = this.checkCommodityType( commodity );
          console.log("shopping")
      },
      addCurrentCommodityInShoppingCart(){
        //todo call api to save shopping cart
        let shoppingCartMap = new  Map<pass , number>();
        if(this.$store.state.shoppingCart){
          console.log("exist")
          this.$store.state.shoppingCart.forEach((value: number, key: pass) => {
              shoppingCartMap.set( key , value )
          });
        }
        shoppingCartMap.set( this.currentCommodity.pass , this.number )
        this.$store.commit('updateShoppingCart', shoppingCartMap );  
        this.modalShow = false;
        this.number = 1;
        console.log(shoppingCartMap )
      },
      addNumber(){
        this.number = this.number + 1;
      },
      subNumber(){
        if(this.number!=0){
          this.number = this.number - 1;
        } 
      },
      checkCommodityContainByUser(commodity : commodity) {
        if( this.$store.state.userContainPasses ){
          if( this.$store.state.userContainPasses.has( commodity.pass ) ){
            console.log( this.$store.state.userContainPasses )
            return true;
          }
        }
        console.log("ppp")
        return false;
      },
      checkCommodityType(commodity : commodity){
        if( isEqual( commodity.type , "quiz" )){
          return true;
        }
        return false;
      },
      answer(){
        this.$router.push({name : "answer"});
      },
      course(){
        window.location.href = "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/and%E7%94%A8%E5%9C%A8%E5%8F%A5%E9%A6%96/index.html"
      }
      
  },
  created() {
    //load commodity.ts by quiz or course's classified when created()
    console.log(  commoditys )
    if( isEqual( this.type , "quiz" ) ){
      this.commodityList = commoditys;
    }else if( isEqual( this.type , "course" ) ) {
      this.commodityList = courses;
    }else{
      this.commodityList = commoditys;
    }
    
    this.currentCommodity = this.commodityList[0];
    this.isCreated = true;
  }
});

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.commodity-list{
		//background-color: coral;
    display : flex;
    flex-wrap: wrap;
    align-items: stretch ;
    //background : blue;
    justify-content: center;   

    .commodity {
      flex : 0  0  20%;
      margin-left: 2.5%;
      margin-top: 2.5%;
      font-size : 25px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      //background: blue;
      
      img{
        width : 100%;
      }
      .content {
        .OfCommodity{
          margin-right : 3%;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

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
                content: "$";
                margin-right: .3em;
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

@media screen and (max-width: 500px) {
    .commodity-list{
		//background-color: coral;
    display : flex;
    flex-wrap: wrap;
    align-items: stretch ;
    //background : blue;
    justify-content: center;   
    .commodity {
      flex : 0  0  40%;
      margin-left: 2.5%;
      margin-top: 2.5%;
      font-size : 3px;
      //background-color : blue;
    img{
      width : 100%;
    }
    .content {
      .OfCommodity{
        margin-right : 3%;
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
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

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
                content: "$";
                margin-right: .3em;
            }
        }
    }

    .action-box {
        display: flex;
        border-top: 1px solid #f3f3f3;
        padding: 10px 10px 10px 15px;
        justify-content: space-between;
        align-items: center;
        //background: blue;

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