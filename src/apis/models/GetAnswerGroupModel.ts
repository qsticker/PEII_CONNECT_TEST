enum Status {
    SUBMMITED = 'SUBMMITED',
    TEMP_SUBMITTED = 'TEMP_SUBMITTED',
    STARTED = 'STARTED',
    EMPTY_INPUT = 'EMPTY_INPUT',
    NOT_EXISTING = 'NOT_EXISTING',
    INITIAL = 'INITIAL',
    NETWORK_ERROR = 'NETWORK_ERROR',
    TRY_AGAIN = 'TRY_AGAIN'
}

export interface AnswerGroupModel {
        status: Status;
      
        uuid: string;
      
        ownerId: string;
      
        sourceQuizGroupId: string;
      
        sourceQuizGroupName: string;
      
        shortId: string;
      
        amount: number;
      
        answerList: any;
      
        eyeballDetect: boolean;
}
      
export class  AnswerGroupRespondModel implements AnswerGroupModel {
    status: Status;
      
    uuid: string;
      
    ownerId: string;
      
    sourceQuizGroupId: string;
      
    sourceQuizGroupName: string;
      
    shortId: string;
      
    amount: number;
      
    answerList: Array<unknown>;
      
    eyeballDetect: boolean;
      
    constructor(status: Status, uuid: string, ownerId: string, sourceQuizGroupId: string, sourceQuizGroupName: string, shortId: string, amount: number, answerList: any, eyeballDetect: boolean) {
        this.status = status;
        this.uuid = uuid;
        this.ownerId = ownerId;
        this.sourceQuizGroupId = sourceQuizGroupId;
        this.sourceQuizGroupName = sourceQuizGroupName;
        this.shortId = shortId;
        this.amount = amount;
        this.answerList = answerList;
        this.eyeballDetect = eyeballDetect;
    }
}
    