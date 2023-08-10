<template>
  <div style="margin-top: 20px; margin-bottom: 20px;"> 
    <div class="root"> 
        <div class="finish-answer-grrop-container" >
            <div class="finish-answer-grrop"  v-for="(item, index)  in finishAnswerGroups" :key="index" style="margin-top: 8px; margin-bottom: 8px;">
                <div class="title-box">
                <img :src="item.imageUrl" />
                <div>
                    <h2>{{ item.name }}</h2>
                </div>
                </div>
                <div class="info-box">
                    <p> 你的得分 : {{item.scoreGot}} </p>
                    <button @click="goToResultPage(item.answerGroupId)" > 观看纪录 </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { FinishAnswerGroupModel } from "@/apis/models/FinishAnswerGroupModel"
import isEqual from 'lodash.isequal';
 import axios from 'axios';
export default defineComponent ({
  name: 'ShoopingCart',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      finishAnswerGroups : new Array<FinishAnswerGroupModel>(),
    };
  },
  computed: {
    
  },
  watch: {
   
  },
  methods: {
    goToResultPage(answerUuid : string){
        this.$router.push( { name: "answerResult" , params: { answerUuid } } )
    },
  },
  async created() {
    const instance  = await axios
      .get( process.env.VUE_APP_PEII_BASE_API_URL + '/answer-group/getFinishedList/' + this.$cookies.get('userUuid') )
    const finishedList = instance.data.finishedList
    this.finishAnswerGroups = new Array<FinishAnswerGroupModel>();
    for(let i = 0 ; i < finishedList.length ; i++){
        const {
          submitTime , totalTimeSpent , correctRate , scoreGot , imageUrl , name , answerGroupId
        } = finishedList[i];
        const finishAnswerGroupModel: FinishAnswerGroupModel = {
            submitTime : submitTime,
            totalTimeSpent :  totalTimeSpent,
            correctRate : correctRate,
            scoreGot : scoreGot,
            imageUrl : imageUrl,
            name : name,
            answerGroupId : answerGroupId,
        }
        this.finishAnswerGroups.push(finishAnswerGroupModel);
    }
  }
});
</script>
<style scoped lang="scss">

.root {
  display: flex;
  //flex-wrap: wrap;
  align-items: center;
    justify-content: center;
  .finish-answer-grrop-container{
    align-items: center;
    justify-content: center;
    width: 80vw;
    .finish-answer-grrop {
    
    flex-direction:column;
    //#fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

    .title-box {
        display: flex;
        
        //background: blue;
        //padding: 15px 5px;

        img {
            width: 10vw;
            height: 10vw;
            //margin-right: 10px;
            object-fit: contain;
        }

        h2 {
            margin: 5vw 0;
            padding: 0;
            font-size: 2vw;
        }

        p {
            margin: 0;
            color: #aba6a6;
        }
    }

    .info-box {
        display: flex;
        border-top: 1px solid #f3f3f3;
        //padding: 10px 10px 10px 15px;
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
}
</style>