<template>
  <div>   
    <div class="commidityInShoppingCart"  v-for="(commodity, index)  in shoppingCartSortArray" :key="index" >
        <div class="info-box">
          <img src="@/assets/QuizCommdity.png" />
          <div>
            <h2>{{ commodity[0].name }}</h2>
            <p>{{ commodity[0].price }}</p>
          </div>
        </div>
        <div class="action-box">
          <div>
            <button class="round" @click="subNumber(commodity[0])">-</button>
            <span>{{ commodity[1] }}</span>
            <button class="round" @click="addNumber(commodity[0])">+</button>
          </div>
          <button @click="removeCommodityInShoppingCart(commodity)" >取消</button>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//import PeiiCommodity from '@/components/ShoppingCart/Commodity.vue'
import { commodity , commoditys} from "@/models/commodity"
import isEqual from 'lodash.isequal';
//import peiiNavbar from '@/components/navbar.vue'

export default defineComponent ({
  name: 'ShoopingCart',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      shoppingCartSortArray : new Array<Array<any>>(),

    };
  },
  computed: {
    
  },
  watch: {
      '$store.state.shoppingCart'  : {
        handler : function( ) {
          this.setshoppingCartSortArray(this.$store.state.shoppingCart )
        },
        deep: true,
      },
  },
  methods: {
      addNumber( Commodity : commodity){
        let commodityNumber = this.$store.state.shoppingCart.get(Commodity)
        console.log('add')
        console.log( this.$store.state.shoppingCart )
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
        this.setshoppingCartSortArray( shoppingCartMap )
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

  },
  created() {
    this.setshoppingCartSortArray(this.$store.state.shoppingCart);
  }
});

</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.commidityInShoppingCart {
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

</style>