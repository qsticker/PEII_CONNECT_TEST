export interface levelClass {
    cloumn : string;
    classes : Array<string>;
}

export interface levelClasses {
    levelClasses : Array<levelClass>;
}

const levelClass0 : levelClass = {
    cloumn : "版本", 
    classes : [ "北師大" , "人教", "外研" ],
}

const levelClass1 : levelClass = {
    cloumn : "冊別",
    classes : [ "第一冊" , "第二冊" , "第三冊" ],
}

const levelClass2 : levelClass = {
    cloumn : "測驗能力",
    classes : [ "聽力" , "讀寫" , "語法" ],
}

const levelClassesArray = new Array<levelClass>()

levelClassesArray.push( levelClass0 , levelClass1 , levelClass2);

export const levelClassesObj : levelClasses = {
    levelClasses : levelClassesArray,
}