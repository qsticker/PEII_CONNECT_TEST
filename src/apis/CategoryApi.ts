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

    static async getAllQuizGroups(categoryId: string): Promise<string> {
        const result = await api.get(`/category/getAllQuizGroups/${categoryId}`);
        return result.data.quizGroups;
    }

    static async getAllCourseGroups(categoryId: string): Promise<string> {
        const result = await api.get(`/category/getAllCourseGroups/${categoryId}`);
        return result.data.courseGroups;
    }
    static async getAllQuizGroupsInNode(categoryNode: string): Promise<string> {
        const result = await api.get(`/category/getAllQuizGroupsInNode/${categoryNode}`);
        return result.data.quizGroups;
    }
    static async getNodeById(categoryNodeId: string): Promise<string> {
        const result = await api.post(`/category/retrieveByCategoryNodeId` , {categoryId : categoryNodeId } );
        return result.data;
    }
}