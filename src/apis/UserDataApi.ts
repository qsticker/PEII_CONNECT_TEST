import api from '@/apis/BaseApi';


export default class UserDataApi {

    static async getDetail(): Promise<string> {
        const result = await api.get(`/userspace/getDetail`);
        return result.data;
    }

}