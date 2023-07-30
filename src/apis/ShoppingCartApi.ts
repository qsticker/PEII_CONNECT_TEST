import api from '@/apis/BaseApi';
import vm from '@/main';

export default class CategoryApi {

    static async addProductToShoppingCart(sellPlanId: string,contents: string): Promise<string> {
        const result = await api.post(`/shoppingcar/addContent/${vm.$cookies.get("")}`, {categoryId: categoryId});
        return result.data;
    }

}