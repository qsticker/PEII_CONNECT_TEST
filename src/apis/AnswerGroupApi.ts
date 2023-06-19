import api from '@/apis/BaseApi';
import { AnswerGroupRespondModel } from '@/apis/models/GetAnswerGroupModel';


export default class AnswerGroupApi {
  //static async check(quizCode: string): Promise<Status> {
  //  const result = await api.get(`answer-group/anwser-web?entranceCode=${quizCode}`);
  //  return result.data.status;
  //}

  static async create(quizCode: string): Promise<AnswerGroupRespondModel> {
    const result = await api.get(`answer-group/anwser-web?entranceCode=${quizCode}`);
    return result.data;
  }

  static async submit(quizCode: string, ansSet: any): Promise<void> {
    await api.post(`answer-group/save-Ans/${quizCode}/submit`, ansSet);
  }

  static async save(quizCode: string, ansSet: any): Promise<void> {
    await api.post(`answer-group/save-Ans/${quizCode}/tempSubmit`, ansSet);
  }

  static async browserSubmit(quizCode: string, body: any): Promise<string> {
    const result = await api.post(`answer-group/from-browser/${quizCode}`, body);
    return result.data.resultViewer;
  }
}