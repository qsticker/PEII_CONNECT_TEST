<template>
    <div style="margin: 50px;">
        <b-card-group  v-for="item in purchasedList" :key="item.bundleId" style="display: inline-block">
            <b-card  :title=item.name :img-src="item.imageUrl" img-alt="Image" img-top 
                style="max-width: 20rem; " class="my-2 mx-2">
                <b-card-text>
                    类型：{{ item.type==='COURSE'?'课程':'测验' }}
                </b-card-text>
                <b-button v-if="item.type==='COURSE'" squared :href="item.courseUrl" target="_blank" variant="outline-dark">打开课程</b-button>
            </b-card>
        </b-card-group>
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