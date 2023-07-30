import api from '@/apis/BaseApi';
import vm from '@/main';

export default class ShopiingCartApi {

    // 在購物車加入 Product（需要sellPlanId 和 Contents）
    static async addProductToShoppingCartWithContents(sellPlanId: string, contents: [], shoppingCartId: string): Promise<string> {
        const result = await api.post(`/shoppingcar/addContent/${shoppingCartId}`, {uuid: sellPlanId, contents: contents});
        return result.data;
    }

    // 在購物車加入 Product（只需要sellPlanId，不需要 Contents）
    static async addProductToShoppingCart(sellPlanId: string, shoppingCartId: string): Promise<string> {
        const result = await api.post(`/shoppingcar/addContent/${shoppingCartId}`, {uuid: sellPlanId, contents: []});
        return result.data;
    }

    // 查看 shoppingCar 的內容
    static async retriveShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("shoppingCarUuid");
        const result = await api.get(`/shoppingcar/getDetail/${shoppingCartId}`);
        return result.data;
    }

    // 在購物車移除一個 Product
    static async removeContentFromShoppingCart(productId: string): Promise<string> {
        const shoppingCartId = vm.$cookies.get("shoppingCarUuid");
        const result = await api.post(`/shoppingcar/removeContent/${shoppingCartId}/${productId}` , {} );
        return result.data;
    }

    // 清空購物車
    static async cleanShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("shoppingCarUuid");
        const result = await api.post(`/shoppingcar/removeContent/${shoppingCartId}` , {} );
        return result.data;
    }

    // 購買購物車內的所有內容
    static async checkoutShoppingCart(): Promise<string> {
        const shoppingCartId = vm.$cookies.get("shoppingCarUuid");
        const result = await api.post(`/shoppingcar/purchase/${shoppingCartId}` , {} );
        return result.data;
    }

    
}