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

export interface AnswerGroupResultModel {
    status: Status;
  
    uuid: string;
    
    timeSpent : number;

    totalScore : number;

    scoreGot : number;

    correctRate : number;

    sourceQuizGroupId : string;

    sourceQuizGroupSize : number;

    quizEventId : string;

    answerList : Array<unknown>;
}

export class  AnswerGroupResultRespondModel implements AnswerGroupResultModel{
    status: Status;
  
    uuid: string;
    
    timeSpent : number;

    totalScore : number;

    scoreGot : number;

    correctRate : number;

    sourceQuizGroupId : string;

    sourceQuizGroupSize : number;

    quizEventId : string;

    answerList : Array<unknown>;

    constructor(status: Status, uuid:string , timeSpent : number , totalScore : number , scoreGot : number , correctRate : number , sourceQuizGroupId : string , sourceQuizGroupSize : number ,quizEventId : string, answerList : Array<unknown>) {
        this.status = status;
        this.uuid = uuid;
        this.timeSpent = timeSpent;
        this.totalScore = totalScore;
        this.scoreGot = scoreGot;
        this.correctRate = correctRate;
        this.sourceQuizGroupId = sourceQuizGroupId;
        this.sourceQuizGroupSize = sourceQuizGroupSize;
        this.quizEventId = quizEventId;
        this.answerList = answerList;
    }
}
  