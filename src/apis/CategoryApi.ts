import api from '@/apis/BaseApi';


export default class CategoryApi {

    static async getCoursePath(): Promise<string> {
        const result = await api.get(`/category/root/course`);
        return result.data;
    }

    static async getQuizPath(): Promise<string> {
        const result = await api.get(`/category/root/quiz`);
        return result.data;
    }
}