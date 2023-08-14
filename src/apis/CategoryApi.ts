import api from '@/apis/BaseApi';
import s3Api from '@/apis/S3BaseApi';

export default class CategoryApi {

    static async getCoursePath(): Promise<string> {
        const result = await s3Api.get(`/courses.json`);
        return result.data;
    }//https://peiiquizs.s3.ap-northeast-1.amazonaws.com/courses.json

    static async getQuizPath(): Promise<string> {
        const result = await s3Api.get(`/quiz.json`);
        return result.data;
    }

    static async getAllQuizGroups(sellPlanId: string): Promise<string> {
        const result = await api.get(`/category/getAllQuizGroups/${sellPlanId}`);
        return result.data.quizGroups;
    }

    static async getAllCourseGroups(sellPlanId: string): Promise<string> {
        const result = await api.get(`/category/getAllCourseGroups/${sellPlanId}`);
        return result.data.courseGroups;
    }
    static async getAllQuizGroupsInNode(categoryNode: string): Promise<string> {
        const result = await api.get(`/category/getAllQuizGroupsInNode/${categoryNode}`);
        return result.data.quizGroups;
    }
}