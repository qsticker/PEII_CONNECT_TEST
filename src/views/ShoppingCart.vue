<template>
  <div style="margin-top: 20px; margin-bottom: 20px;"> 
    <div v-if="shoppingCartSortArray.length !== 0" class="root">
      <div class="commidity-container" >
        <div class="commidityInShoppingCart"  v-for="(item, index)  in shoppingCartSortArray" :key="index" style="margin-top: 8px; margin-bottom: 8px;">
          <div class="info-box">
            <img :src="item[0].showImageUrl" />
            <div>
              <h2>{{ item[0].name }}</h2>
              <p>{{ item[0].price }}</p>
            </div>
          </div>
          <div class="action-box">
            <div>
              <button class="round" @click="subNumber(item[0])">-</button>
              <span>{{ item[1] }}</span>
              <button class="round" @click="addNumber(item[0])">+</button>
            </div>
            <button @click="removeCommodityInShoppingCart(index)" >刪除</button>
          </div>
        </div>
      </div>
      <div class="check-out-container">
        <div colspan="3" class="total-price-title" >商品总计 <span class="total-price">￥ {{ getTotal() }}</span></div>
        <button class="checkout" @click="checkout">付款</button>
      </div>
    </div>
    <div v-else class="empty-container">
      <div v-if="showCheckoutSuccessTip">
        <b-icon icon="check2-all" class="icon" style="height: 55px" variant="success"></b-icon>
        <div class="text">Congratulation! 结账成功</div>
        <b-button squared variant="outline-dark" style="margin-top: 30px" @click="backToHomeBtn">返回首页</b-button>
      </div>
      <div v-else>
        <b-icon icon="exclamation-circle" class="icon"></b-icon>
        <div class="text">Woops! 您尚未选择任何商品哦</div>
      </div>
      </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { pass , commoditys} from "@/models/commodity"
import isEqual from 'lodash.isequal';
import ShoppingCartApi from "@/apis/ShoppingCartApi";

export default defineComponent ({
  name: 'ShoopingCart',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      shoppingCartSortArray : new Array<Array<any>>(),
      total : 0,
      showCheckoutSuccessTip: false,
    };
  },
  computed: {
    
  },
  watch: {
      // '$store.state.shoppingCart'  : {
      //   handler : function( ) {
      //     this.setshoppingCartSortArray(this.$store.state.shoppingCart ) //need confirm it's sort
      //   },
      //   deep: true,
      // },
  },
  methods: {
    backToHomeBtn(){
      this.$router.push({name : "home"});
    },
      addNumber( pass : pass){
        let passNumber = this.$store.state.shoppingCart.get(pass)
        passNumber = passNumber + 1;
        this.changeNumberInShoppingCart( pass , passNumber );
      },
      subNumber( pass : pass){
        let passNumber = this.$store.state.shoppingCart.get(pass)
        if(passNumber > 1){
            passNumber = passNumber - 1;
            this.changeNumberInShoppingCart( pass ,passNumber );
        }
      },
      changeNumberInShoppingCart( pass : pass , passNumber : number ){
        let shoppingCartMap = new  Map<pass, number>();
        //todo save shopping cart by api
        if(this.$store.state.shoppingCart){
          this.$store.state.shoppingCart.forEach((value: number, key: pass) => {
              if( !isEqual(key , pass) ){
                shoppingCartMap.set( key , value )
              }  
          });
        }
        shoppingCartMap.set( pass , passNumber )
        this.$store.commit('updateShoppingCart', shoppingCartMap );  
      },
      async removeCommodityInShoppingCart( index: number ){
        console.log("index: "+ index);
        await this.sendRemoveCommodityRequestToRemote(this.shoppingCartSortArray[index][0].productId);
        // let shoppingCartMap = this.shoppingCartSortArray;
        this.shoppingCartSortArray.splice(index, 1);
        
      },
      async sendRemoveCommodityRequestToRemote(productId: string){
        console.log("send the remove request to remote");
        await ShoppingCartApi.removeContentFromShoppingCart(productId); // 刪除
        this.setShoppingCartSortArray(); // 重新render購物車
        
      },
      async setShoppingCartSortArray(){
        const shoppingCartResult = JSON.parse(JSON.stringify(await ShoppingCartApi.retriveShoppingCart()));
        console.log("shoppingCartResult: " + shoppingCartResult);
        this.total = shoppingCartResult.totalPrice;

        this.shoppingCartSortArray =  new Array<Array<any>>();
        shoppingCartResult.contents.forEach((element: any) =>{
          let singleItem = new Array<any>();
          singleItem.push({name: element.sellPlan.name, price: element.sellPlan.price, showImageUrl: element.sellPlan.showImageUrl, sellPlanId: element.sellPlan.uuid, productId: element.product.uuid});
          singleItem.push(1); // 購物車 item的數量
          this.shoppingCartSortArray.push(singleItem);
        });
        console.log("this.shoppingCartSortArray: " + this.shoppingCartSortArray);
        
      },
      // setshoppingCartSortArray(shoppingCartMap : Map<pass, number> ){
      //     this.shoppingCartSortArray =  new Array<Array<any>>();
      //     shoppingCartMap.forEach((value: number, key: pass) => {
      //         let keyValue = new Array<any>();
      //         keyValue.push(key);
      //         keyValue.push(value);
      //         this.shoppingCartSortArray.push(keyValue)
      //     });
      //     this.shoppingCartSortArray.sort( (one, two) => (one[0].name > two[0].name ? -1 : 1) )
      //     console.log( this.shoppingCartSortArray )
      // },
      getTotal(){
          // this.total = 0;
          // this.$store.state.shoppingCart.forEach((value: number, key: pass) => {
          //    this.total = this.total + ( value * key.price );
          // });
          return this.total
      },
      async checkout(){
        //todo: save commodity in user space by api
        await ShoppingCartApi.checkoutShoppingCart();
        await this.setShoppingCartSortArray();
        this.showCheckoutSuccessTip = true;
        // this.$store.state.userContainPasses = this.$store.state.shoppingCart;
        // console.log(  this.$store.state.userContainPasses )
        // this.$router.push({name : "home"});
      },
  },
  async created() {
    await this.setShoppingCartSortArray(); //new
    // this.setshoppingCartSortArray(this.$store.state.shoppingCart);
  }
});
</script>
<style scoped lang="scss">
.empty-container {
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; /* 垂直居中文本和图标 */

}

.empty-container .icon {
  margin-right: 0.5%;
  font-size: 36px; /* 调整图标大小 */
}

.empty-container .text {
  font-size: 20px; /* 调整文本字体大小 */
  margin-top: 10px; /* 添加一些上边距，使得图标和文本之间有一定间隔 */
}
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
                content: "￥";
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