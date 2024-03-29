import { AnswerInterface , ClickAreaModel , TextField , ImageField , Audio , ContentModel , ActionModel, blankField} from '@/models/QuizModel';
/*
export interface AnswerModel {
    userAnswer: string[];
    sourceQuiz: QuizTemplateModel;
    uuid: string;
    timeSpent: number;
    multipleSelect: boolean;
    isBlankFill: boolean;
    blankFillAnswer: string;
}
*/

export interface AnswerSubmitFormatModel {
  uuid : string;
  timeSpent: number;
  userAnswer: Array<string>;
  blankFillAnswer : any;
}

export interface AnswerSubmitFormatSet {
  ansSet : Array<AnswerSubmitFormatModel>;
}

export class Answer implements AnswerInterface {
    templateId = "";

    templateName = ""

    type = "";

    userAnswer = [] as string[];

    timeSpent = 0;

    clickAreas = new Array<ClickAreaModel>();

    multipleSelect = false;
    followPreviousQuiz = false;
  
    blankFillAnswer = {} as any;
    realBlankFillAnswer = {} as any;
    isBlankFill = false;
    score = 5;
    uuid = ""
    realAnswer = [] as string[];

    constructor(userAnswer: [], sourceQuiz: any | JSON , uuid: string, timeSpent: number,
      multipleSelect: boolean, isBlankFill: boolean, blankFillAnswer: any | JSON, score : number) {
      
      //console.log( sourceQuiz.clickAreas[0] )
      const clickAreaList = new Array<ClickAreaModel>()
      for(let i=0 ; i < sourceQuiz.clickAreas.length ; i++ ){
        const clickArea = sourceQuiz.clickAreas[i]

        const textField : TextField = {
          enabled: clickArea.content.textField.enabled ,
          paddingX: clickArea.content.textField.paddingX ,
          paddingY: clickArea.content.textField.paddingY ,
          size: clickArea.content.textField.size ,
          text: clickArea.content.textField.text ,
        }

        const imageField : ImageField = {
          enabled: clickArea.content.imageField.enabled ,
          paddingX: clickArea.content.imageField.paddingX ,
          paddingY: clickArea.content.imageField.paddingY ,
          size: clickArea.content.imageField.size ,
          radius : clickArea.content.imageField.radius ,
          url : clickArea.content.imageField.url ,
        }

        const audioField : Audio = {
          enabled: clickArea.content.audioField.enabled,
          url : clickArea.content.audioField.url ,
        }

        const blankField : blankField = {
          enabled: clickArea.content.blankField.enabled,
          blankAnswer : '' ,
        }

        if( clickArea.content.blankField.answer != undefined  ){
          if( clickArea.content.blankField.answer != ""){
            blankField.blankAnswer = clickArea.content.blankField.answer
          }
        }
        
        const contentModel : ContentModel = {
          Audio : audioField,
          textField : textField ,
          imageField: imageField,
          blankField : blankField,
        }

        const actionModel : ActionModel = {
          type : clickArea.action.type,
        }

        const clickAreaModel: ClickAreaModel = {
          label : clickArea.label,
          action : actionModel,
          content : contentModel
        }
        clickAreaList.push( clickAreaModel )
      } 

      this.clickAreas = clickAreaList;

      //this.sourceQuiz = sourceQuiz;
      if (userAnswer === null || userAnswer === undefined) {
        this.userAnswer  = [];
      } else {
        this.userAnswer = userAnswer;
      }
      this.templateName = sourceQuiz.templateName;
      this.templateId = sourceQuiz.templateId;

      this.timeSpent = timeSpent;
      this.multipleSelect = multipleSelect;
      this.isBlankFill = isBlankFill;
      this.blankFillAnswer = blankFillAnswer;
      this.uuid = uuid;
      this.score = score
    }

    public checkSignleQuestion() {
      const checkResult = false;
      for (let i = 0; i < this.userAnswer.length; i += 1) {
        if (this.userAnswer[i] !== '' && this.userAnswer[i] !== undefined && this.userAnswer[i] !== null) {
          return true;
        }
      }
      return checkResult;
    }

    public getSubmitFormat() : AnswerSubmitFormatModel{
      const asnwerSubmitFormat : AnswerSubmitFormatModel = {
        uuid : this.uuid,
        timeSpent : this.timeSpent,
        userAnswer : this.userAnswer, 
        blankFillAnswer : this.blankFillAnswer
      };
      return asnwerSubmitFormat;
    }

    public static getSubmitJson( answerSubmitFormatModels : Array<AnswerSubmitFormatModel> ) : AnswerSubmitFormatSet{
      const answerSubmitFormatSet : AnswerSubmitFormatSet = {
        ansSet : answerSubmitFormatModels
      }
      return answerSubmitFormatSet;
    }

    public setRealAnswer( realAnswer : Array<string> ){
      this.realAnswer = realAnswer;
    }

    public setRealBlankFillAnswer( realBlankFillAnswer: any ){
      this.realBlankFillAnswer = realBlankFillAnswer;
    }
}