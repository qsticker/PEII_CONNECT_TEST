import api from '@/apis/BaseApi';
import vm from '@/main';

export default class ShopiingCartApi {

    // 在購物車加入 Product
    static async addProductToShoppingCart(sellPlanId: string, contents: []): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.post(`/shoppingcar/addContent/${shoppingCartId}`, {uuid: sellPlanId, contents: contents});
        return result.data;
    }

    // 查看 shoppingCar 的內容
    static async retriveShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.get(`/shoppingcar/getDetail/${shoppingCartId}`);
        return result.data;
    }

    // 在購物車移除一個 Product
    static async removeContentFromShoppingCart(productId: string): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.post(`/shoppingcar/removeContent/${shoppingCartId}/${productId}`);
        return result.data;
    }

    // 清空購物車
    static async cleanShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.post(`/shoppingcar/removeContent/${shoppingCartId}`);
        return result.data;
    }

    // 購買購物車內的所有內容
    static async checkoutShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("user").shoppingCar.uuid;
        const result = await api.post(`/shoppingcar/purchase/${shoppingCartId}`);
        return result.data;
    }

    
}