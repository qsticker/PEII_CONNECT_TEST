export interface AreaModel {
    x: number;
    y: number;
    width: number;
    height: number;
  }

export interface ContentModel {
    Audio : Audio;
    textField: TextField;
    imageField: ImageField;
}

export interface TextField {
  enabled: boolean;
  paddingX: number;
  paddingY: number;
  size: number;
  text: string;
}

export interface Audio {
  enabled: boolean;
  url: string;
}


export interface ImageField {
  enabled: boolean;
  paddingX: number;
  paddingY: number;
  size: number;
  radius: number;
  url: string;
}

export interface ActionModel {
  type: string;
}

export interface ClickAreaModel {
    label: string;
    action: ActionModel;
    content: ContentModel;
}

export interface QuizTemplateModel {
    templateId: string;
    templateName: string;
    type: string;
    answerSet: string[];
    timeLimit: number;
    clickAreas: Array<ClickAreaModel>;
    multipleSelect?: boolean;
    difficulty?: string;
    giveAwayScore?: boolean;
    followPreviousQuiz?: boolean;
  
    enableSolution?: boolean;
    solution?: string;
    isBlankFill?: boolean;
    score?: number;
  }