
export interface commodity {
    //uuid : string;
    type: string; //quiz or course
    price: number;
    name: string;
    class : string; //人教版/uinit1 ...
    isHold: boolean;
}

const com1 : commodity = {
    type: "quiz",
    price: 20 ,
    name:  "2012-中考真題測驗",
    class : "中考真題",
    isHold : false
}

const com2 : commodity = {
    type: "quiz",
    price: 20 ,
    name:  "2013-中考真題測驗",
    class : "中考真題",
    isHold : false
}

const com3 : commodity = {
    type: "quiz",
    price: 20 ,
    name:  "2014-中考真題測驗",
    class : "中考真題",
    isHold : false
}

const com4 : commodity = {
    type: "quiz",
    price: 20 ,
    name:  "2015-中考真題測驗",
    class : "中考真題",
    isHold : false
}


export const commoditys: Array<commodity> = [
    com1,
    com2,
    com3,
    com4
]