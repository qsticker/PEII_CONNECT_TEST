import api from '@/apis/BaseApi';
import vm from '@/main';

export default class CategoryApi {

    static async addProductToShoppingCart(sellPlanId: string, contents: []): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.post(`/shoppingcar/addContent/${shoppingCartId}`, {uuid: sellPlanId, contents: contents});
        return result.data;
    }
}