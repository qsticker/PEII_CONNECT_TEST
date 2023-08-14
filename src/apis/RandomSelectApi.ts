import api from '@/apis/BaseApi';
import s3Api from '@/apis/S3BaseApi';

export default class RandomSelectApi {
    static async getRandomQuiz(numberOfQuiz: number, quizGroup: Array<String>, bundleId:string): Promise<string> {
        console.log("numberOfQuiz: " + numberOfQuiz);
        console.log("quizGroup: " + quizGroup[0]);
        console.log("bundleId: " + bundleId);
        const result = await api.post(`/workspace/quiz-groups/random-select`, {name: "456", numberOfQuiz: numberOfQuiz , quizGroupIdList: quizGroup, bundleId: bundleId});
        return result.data;
    }
}