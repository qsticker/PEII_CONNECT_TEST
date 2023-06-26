<template>
  <div>
    <div class="commodity-list">
      <div class="commodity"  v-for="( commodity ,index ) in commodityList" :key="index" >
        <!--<PeiiCommodity :commodity="commodity" />-->
        <div class="content" @click="readyAddShoppingCart(commodity)">
          <img src="@/assets/QuizCommdity.png" alt="">
          <div class="title text-truncate2 text-dark">
            <span class="classOfCommodity d-inline-block border border-danger small p-1 mr-1 text-danger"> {{ commodity.class }} </span>	{{ commodity.name }}
          </div>
          <span class="price text-danger text-md price">價格 ： {{ commodity.price }}</span>   
        </div>
      </div>

    </div>

    <b-modal v-model="modalShow"  hide-footer>
      <div class="commidity-modal">
        <div class="info-box">
          <img src="@/assets/QuizCommdity.png" />
          <div>
            <h2>{{ currentCommodity.name }}</h2>
            <p>{{ currentCommodity.price }}</p>
          </div>
        </div>
        <div class="action-box">
          <div>
            <button class="round">-</button>
            <span>{{ number }}</span>
            <button class="round">+</button>
          </div>
          <button @click="addCurrentCommodityInShoppingCart">加入購物車</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import PeiiCommodity from '@/components/ShoppingCart/Commodity.vue'
import { commodity , commoditys} from "@/models/commodity"
//import peiiNavbar from '@/components/navbar.vue'

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
    };
  },
  computed: {
    
  },
  methods: {
      readyAddShoppingCart( commodity : commodity){
          //this.currentCommodity = commodity;
          this.modalShow = true;
          this.number = 1;
          console.log("shopping")
          console.log( )
      },
      addCurrentCommodityInShoppingCart(){
        //todo call api to save shopping cart
        let shoppingCartMap = new  Map<commodity, number>();
        if(this.$store.state.shoppingCart){
          shoppingCartMap = this.$store.state.shoppingCart; 
        }
        shoppingCartMap.set(  this.currentCommodity , this.number )
        this.$store.commit('updateShoppingCart', shoppingCartMap );  
        this.modalShow = false;
        console.log('updateShoppingCart', shoppingCartMap )
      }
  },
  created() {
    //load commodity.ts by quiz or course's classified when created()
    console.log(  commoditys )
    this.commodityList = commoditys;
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

}
</style>