import api from '@/apis/BaseApi';
import s3Api from '@/apis/S3BaseApi';

export default class RandomSelectApi {
    static async getRandomQuiz(name: string ,numberOfQuiz: number, categoryIdList : Array<string>, bundleId:string): Promise<string> {
        console.log("numberOfQuiz: " + numberOfQuiz);
        console.log("quizGroup: " + categoryIdList[0]);
        console.log("bundleId: " + bundleId);
        const result = await api.post(`/workspace/quiz-groups/random-select`, {name: name, numberOfQuiz: numberOfQuiz , categoryIdList: categoryIdList, bundleId: bundleId});
        return result.data;
    }
}