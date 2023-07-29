import api from '@/apis/BaseApi';
import s3Api from '@/apis/S3BaseApi';

export default class CategoryApi {

    static async getCoursePath(): Promise<string> {
        const result = await s3Api.get(`/courses.json`);
        return result.data;
    }

    static async getQuizPath(): Promise<string> {
        const result = await s3Api.get(`/quiz.json`);
        return result.data;
    }
}