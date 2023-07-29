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
    price: number;
    showImageUrl: string;
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

const pass3 : pass = {
    type : "course",
    price: 20 ,
    name:  "短語庫",
    class: "短語庫",
    isHold: false,
}
const com1 : commodity = {

    type: "quiz",
    name:  "2012-中考真題測驗",
    class : "中考真題",
    pass : pass,
    price: 0,
    showImageUrl: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/sellPlanImage/%E7%B6%B2%E7%AB%99%E8%AA%B2%E7%A8%8B%E5%9C%96%E6%AA%94/%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A1%8C/%C3%B1%C3%B1%C2%AA%E2%95%A5%C2%BBu%E2%94%9CD-2018.jpg",
}

const com2 : commodity = {

    type: "quiz",
    name:  "2013-中考真題測驗",
    class : "中考真題",
    pass : pass2,
    price: 0,
    showImageUrl: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/sellPlanImage/%E7%B6%B2%E7%AB%99%E8%AA%B2%E7%A8%8B%E5%9C%96%E6%AA%94/%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A1%8C/%C3%B1%C3%B1%C2%AA%E2%95%A5%C2%BBu%E2%94%9CD-2018.jpg",
}

const com3 : commodity = {

    type: "quiz",
    name:  "2014-中考真題測驗",
    class : "中考真題",
    pass : pass2,
    price: 0,
    showImageUrl: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/sellPlanImage/%E7%B6%B2%E7%AB%99%E8%AA%B2%E7%A8%8B%E5%9C%96%E6%AA%94/%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A1%8C/%C3%B1%C3%B1%C2%AA%E2%95%A5%C2%BBu%E2%94%9CD-2018.jpg",
}

const com4 : commodity = {
    type: "quiz",
    name:  "2015-中考真題測驗",
    class : "中考真題",
    pass : pass,
    price: 0,
    showImageUrl: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/sellPlanImage/%E7%B6%B2%E7%AB%99%E8%AA%B2%E7%A8%8B%E5%9C%96%E6%AA%94/%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A1%8C/%C3%B1%C3%B1%C2%AA%E2%95%A5%C2%BBu%E2%94%9CD-2018.jpg",
}

const com5 : commodity = {
    type: "course",
    name:  "and用在句首",
    class : "短語库",
    pass : pass3,
    price: 0,
    showImageUrl: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/sellPlanImage/%E7%B6%B2%E7%AB%99%E8%AA%B2%E7%A8%8B%E5%9C%96%E6%AA%94/%E4%B8%AD%E8%80%83%E7%9C%9F%E9%A1%8C/%C3%B1%C3%B1%C2%AA%E2%95%A5%C2%BBu%E2%94%9CD-2018.jpg",
}


export const commoditys: Array<commodity> = [
    com1,
    com2,
    com3,
    com4
]

export const courses: Array<commodity> = [
    com5
]