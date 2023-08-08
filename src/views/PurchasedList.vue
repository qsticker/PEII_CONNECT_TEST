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
        <div style="margin: 50px; display: flex; flex-wrap: wrap;">
            <b-card v-for="item in purchasedList" :key="item.bundleId"
                style="width: 20rem; margin: 10px; display: flex; flex-direction: column;" class="my-2">
                <b-card-img :src="item.imageUrl" alt="Image" top />
                <div  style=" height: 40px; margin-top: 10%;">
                    <b-card-title>{{ item.name }}</b-card-title>
                </div>
                <div style=" margin-top: 20%;">
                    <b-card-text>
                        类型：{{ item.type === 'COURSE' ? '课程' : '测验' }}
                    </b-card-text>
                </div>
                <div style=" margin-top: 5%;" >
                    <b-button v-if="item.type === 'COURSE'" squared :href="item.courseUrl" target="_blank"
                        variant="outline-dark">
                        打开课程
                    </b-button>
                </div>
            </b-card>
        </div>
    </div>
</template>
  

<script lang="ts">
import { defineComponent } from "vue";
import isEqual from 'lodash.isequal';
import PurchasedItemsApis from "@/apis/PurchasedItemApis";

export default defineComponent({
    name: 'PurchasedList',
    components: {
        //PeiiCommodity,
    },
    data() {
        return {
            purchasedList: null as any,
            total: 0,
            showCheckoutSuccessTip: false,
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        backToHomeBtn() {
            this.$router.push({ name: "home" });
        },

    },
    async created() {
        const remotePurchasedList = JSON.parse(JSON.stringify(await PurchasedItemsApis.getPurchasedItems()));
        this.purchasedList = remotePurchasedList.bundles;
    }
});
</script>
<style scoped lang="scss"></style>