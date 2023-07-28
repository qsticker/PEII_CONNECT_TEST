import api from '@/apis/BaseApi';


export default class CategoryApi {

    static async getSellPlans(categoryId: string): Promise<string> {
        const result = await api.post(`/sellplan/retrieveByCategoryNodeId`, {categoryId: categoryId});
        return result.data;
    }

}