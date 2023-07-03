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
    isHold: false,
}

const pass2 : pass = {
    type : "quiz-review",
    price: 20 ,
    name:  "中考真題測驗2",
    class: "中考真題",
    isHold: false,
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
    pass : pass2
}

const com3 : commodity = {

    type: "quiz",
    name:  "2014-中考真題測驗",
    class : "中考真題",
    pass : pass2
}

const com4 : commodity = {
    type: "quiz",
    name:  "2015-中考真題測驗",
    class : "中考真題",
    pass : pass
}

const com5 : commodity = {
    type: "course",
    name:  "and用在句首",
    class : "短語库",
    pass : pass
}


export const commoditys: Array<commodity> = [
    com1,
    com2,
    com3,
    com4
]