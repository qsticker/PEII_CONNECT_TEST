<template>
    <div>
        <div style="
          width: 100%;
          height: 130px;
          background-color: #1c1d1f;
          display: flex;
          align-items: center;
          padding-left: 12%;
        ">
            <h2 style="text-align: left; color: #fff;">我的已购买列表</h2>
        </div>
        <div style="margin: 50px; display: flex; flex-wrap: wrap; justify-content: center;">
            <b-card v-for="item in purchasedList" :key="item.bundleId"
                style="width: 20rem; margin: 10px; display: flex; flex-direction: column;" class="my-2">
                <b-card-img :src="item.imageUrl" alt="Image" top />
                <div style="height: 40px; margin-top: 10%;">
                    <b-card-title>{{ item.name }}</b-card-title>
                </div>
                <div style="margin-top: 20%;">
                    <b-card-text>
                        类型：{{ item.type === 'COURSE' ? '课程' : '测验' }}
                    </b-card-text>
                </div>
                <div style="margin-top: 5%;">
                    <b-button v-if="item.type === 'COURSE'" squared @click="redirectUrl( item.courseUrl )" target="_blank"
                        variant="outline-dark">
                        打开课程
                    </b-button>
                    <b-button v-else-if="item.type==='QUIZ'" squared @click="startAnswer( item ,item.quizGroupId, item.bundle.isRandom, item.bundle.categoryNode, item.bundle.uuid)" target="_blank" variant="outline-dark">打开测验</b-button>
                </div>
            </b-card>
        </div>
        <b-modal
            v-if="getRandomSelect( )"
            v-model="modalShow"
            class="modal"
            hide-footer
            id="bv-modal-a"
            >
            <RandomQuiz :name="bundleItem.bundle.name" :bundleId="bundleItem.bundle.uuid" :categoryNodeId="bundleItem.bundle.categoryNode" />
        </b-modal>
    </div>
</template>

  

<script lang="ts">
import { defineComponent } from "vue";
import PurchasedItemsApis from "@/apis/PurchasedItemApis";
import RandomQuiz from "@/components/RandomQuiz.vue";

export default defineComponent({
    name: 'PurchasedList',
    components: {
        RandomQuiz,
    },
    data() {
        return {
            purchasedList: null as any,
            total: 0,
            showCheckoutSuccessTip: false,
            bundleItem : null as any,
            modalShow : false,
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        redirectUrl(url : string){
            document.cookie ="somecookie=1;path=peiitw.com.cn";
            window.location.href = "http://www.peiitw.com.cn/PEII/Code_CN/DB/Course/%E5%8D%95%E8%AF%8D%E5%BA%93%E7%9F%AD%E8%AF%AD%E5%BA%93/%E5%8D%95%E8%AF%8D%E5%BA%93/diamond/index.html"
        },
        getRandomSelect(){
            if( this.bundleItem != null ){
                if( this.bundleItem.bundle.isRandom ){
                    return this.modalShow;
                }
            }
            return false;
        },
        backToHomeBtn() {
            this.$router.push({ name: "home" });
        },
        startAnswer(item: any ,quizsId : string, random:boolean ,NodeID:string, bundleId:string) {
            if(random){
                this.bundleItem = item;
                this.modalShow = true;
            }
            else    this.$router.push( { name: "answer" , params: { quizsId }  } )
        }

    },
    async created() {
        const remotePurchasedList = JSON.parse(JSON.stringify(await PurchasedItemsApis.getPurchasedItems()));
        this.purchasedList = remotePurchasedList.bundles;
    }
});
</script>
<style scoped lang="scss"></style>