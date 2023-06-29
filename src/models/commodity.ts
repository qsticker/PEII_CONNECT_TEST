export interface pass {
    type: string; //quiz or course
    price: number;
    name: string;
    class : string; //人教版/uinit1 ...
    isHold: boolean;
}

export interface commodity {
    //uuid : string;
    type: string; //quiz or course
    name: string;
    class : string; //人教版/uinit1 ...
    pass : pass; //人教板第一冊
}

const pass : pass = {
    type : "quiz-review",
    price: 20 ,
    name:  "中考真題測驗",
    class: "中考真題",
    isHold: true
}

const com1 : commodity = {

    type: "quiz",
    name:  "2012-中考真題測驗",
    class : "中考真題",
    pass : pass
}

const com2 : commodity = {

    type: "quiz",
    name:  "2013-中考真題測驗",
    class : "中考真題",
    pass : pass
}

const com3 : commodity = {

    type: "quiz",
    name:  "2014-中考真題測驗",
    class : "中考真題",
    pass : pass
}

const com4 : commodity = {

    type: "quiz",
    name:  "2015-中考真題測驗",
    class : "中考真題",
    pass : pass
}


export const commoditys: Array<commodity> = [
    com1,
    com2,
    com3,
    com4
]