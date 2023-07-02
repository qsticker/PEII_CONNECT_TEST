<template>
  <div> 
    <div class="root">
      <div class="commidity-container" >
        <div class="commidityInShoppingCart"  v-for="(commodity, index)  in shoppingCartSortArray" :key="index" >
          <div class="info-box">
            <img src="@/assets/中考真題.png" />
            <div>
              <h2>{{ commodity[0].pass.name }}</h2>
              <p>{{ commodity[0].pass.price }}</p>
            </div>
          </div>
          <div class="action-box">
            <div>
              <button class="round" @click="subNumber(commodity[0])">-</button>
              <span>{{ commodity[1] }}</span>
              <button class="round" @click="addNumber(commodity[0])">+</button>
            </div>
            <button @click="removeCommodityInShoppingCart(commodity[0])" >取消</button>
          </div>
        </div>
      </div>
      <div class="check-out-container">
        <div colspan="3" class="total-price-title" >商品總計 <span class="total-price">$ {{ getTotal() }}</span></div>
        <button class="checkout" @click="checkout">前往付款</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { commodity , commoditys} from "@/models/commodity"
import isEqual from 'lodash.isequal';
export default defineComponent ({
  name: 'ShoopingCart',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      shoppingCartSortArray : new Array<Array<any>>(),
      total : 0,
    };
  },
  computed: {
    
  },
  watch: {
      '$store.state.shoppingCart'  : {
        handler : function( ) {
          this.setshoppingCartSortArray(this.$store.state.shoppingCart ) //need confirm it's sort
        },
        deep: true,
      },
  },
  methods: {
      addNumber( Commodity : commodity){
        let commodityNumber = this.$store.state.shoppingCart.get(Commodity)
        commodityNumber = commodityNumber + 1;
        this.changeNumberInShoppingCart( Commodity , commodityNumber );
      },
      subNumber( Commodity : commodity){
        let commodityNumber = this.$store.state.shoppingCart.get(Commodity)
        if(commodityNumber > 1){
            commodityNumber = commodityNumber - 1;
            this.changeNumberInShoppingCart( Commodity , commodityNumber );
        }
      },
      changeNumberInShoppingCart(Commodity: commodity , commodityNumber : number ){
        let shoppingCartMap = new  Map<commodity, number>();
        //todo save shopping cart by api
        if(this.$store.state.shoppingCart){
          this.$store.state.shoppingCart.forEach((value: number, key: commodity) => {
              if( !isEqual(key , Commodity) ){
                shoppingCartMap.set( key , value )
              }  
          });
        }
        shoppingCartMap.set( Commodity , commodityNumber )
        this.$store.commit('updateShoppingCart', shoppingCartMap );  
      },
      removeCommodityInShoppingCart( Commodity: commodity ){
        //todo save shopping cart by api
        let shoppingCartMap = new  Map<commodity, number>();
        if(this.$store.state.shoppingCart){
          this.$store.state.shoppingCart.forEach((value: number, key: commodity) => {
              if( !isEqual(key , Commodity) ){
                shoppingCartMap.set( key , value )
              }  
          });
        }
        this.$store.commit('updateShoppingCart', shoppingCartMap );  
        console.log(shoppingCartMap)
      },
      setshoppingCartSortArray(shoppingCartMap : Map<commodity, number> ){
          this.shoppingCartSortArray =  new Array<Array<any>>();
          shoppingCartMap.forEach((value: number, key: commodity) => {
              let keyValue = new Array<any>();
              keyValue.push(key);
              keyValue.push(value);
              this.shoppingCartSortArray.push(keyValue)
          });
          this.shoppingCartSortArray.sort( (one, two) => (one[0].name > two[0].name ? -1 : 1) )
          console.log( this.shoppingCartSortArray )
      },
      getTotal(){
          this.total = 0;
          this.$store.state.shoppingCart.forEach((value: number, key: commodity) => {
             this.total = this.total + ( value * key.pass.price );
          });
          return this.total
      },     
      checkout(){
        //todo: save commodity in user space by api
        this.$store.state.userContainPasses = this.$store.state.shoppingCart;
        console.log(  this.$store.state.userContainPasses )
        this.$router.push({name : "home"});
      },
  },
  created() {
    this.setshoppingCartSortArray(this.$store.state.shoppingCart);
  }
});
</script>
<style scoped lang="scss">
.root {
  display: flex;
  //flex-wrap: wrap;
  .commidity-container{
   
    width: 50%;
    .commidityInShoppingCart {
    
    flex-direction:column;
    
    margin-left: 30% ;
    //#fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    width : 70%;

    .info-box {
        display: flex;
        
        //background: blue;
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
  .check-out-container{
    margin-left: 3%;
    margin-top: 5%;
    width: 30%;
    height: 20%;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    .total-price-title {
      color: black;
      font-size: 30px;
      .total-price {
        margin-left: 1em;
        color: red;
        //font-size: 50px;
      }
    }
    .checkout {
      display: block;
      width: 94%;
      margin: 20px;
      outline: 0;
      border: 0;
      padding: 15px 0;
      color: #fff;
      font-size: 18px;
      text-align: center;
      background-color: #ef8a8b;
      box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      cursor: pointer;
    }
  }
 
}
</style>