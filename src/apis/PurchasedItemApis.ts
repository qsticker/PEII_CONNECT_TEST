import api from '@/apis/BaseApi';
import vm from '@/main';

export default class PurchasedItemsApi {

    static async getPurchasedItems(): Promise<string> {
        const userSpaceId = vm.$cookies.get("userUuid");
        const result = await api.get(`/userspace/getGoodsInfo/${userSpaceId}`, );
        return result.data;
    }

}