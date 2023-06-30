export interface  levelClass {
    levelName : string;
    classes : Array<string>;
}

export interface levelClasses {
    rootLevel : levelClass;
    classMap : Map<string ,levelClasses > | null;
    isLeaf : boolean;
}

const levelClass0 : levelClass = {
    levelName : "版本", 
    classes : [ "北師大" , "人教"],
}

const levelClass1 : levelClass = { //北師大
    levelName : "冊別",
    classes : [ "第一冊" , "第二冊" , "第三冊" ],
}

const levelClass2 : levelClass = { //人教
    levelName : "冊別",
    classes : [ "第一冊" , "第二冊"  ],
}




const levelClass4 : levelClass = { //
    levelName : "unit",
    classes : [ "unit1" , "unit2"  ],
}

const levelClass5 : levelClass = { //
    levelName : "unit",
    classes : [ "unit3" , "unit4"  ],
}

const levelClass6 : levelClass = { //
    levelName : "unit",
    classes : [ "unit5"   ],
}

const leaf1 : levelClasses = {
    rootLevel : levelClass4,
    classMap : null,
    isLeaf : true,
}


const leaf2 : levelClasses = {
    rootLevel : levelClass5,
    classMap : null,
    isLeaf : true,
}

const leaf3 : levelClasses = {
    rootLevel : levelClass6,
    classMap : null,
    isLeaf : true,
}

const node1ClassMap = new  Map<string ,levelClasses >();

node1ClassMap.set("第一冊" ,leaf1 );
node1ClassMap.set("第二冊" ,leaf2 );
node1ClassMap.set("第三冊" ,leaf3 );

const node1 : levelClasses = {
    rootLevel : levelClass1,
    classMap : node1ClassMap,
    isLeaf : false,
}

const node2ClassMap = new  Map<string ,levelClasses >();

node2ClassMap.set("第一冊" ,leaf1 );
node2ClassMap.set("第二冊" ,leaf2 );


const node2 : levelClasses = {
    rootLevel : levelClass2,
    classMap : node2ClassMap,
    isLeaf : false,
}

const quizunitClassMap = new  Map<string ,levelClasses >();
quizunitClassMap.set("北師大" , node1)
quizunitClassMap.set("人教" , node2)


export const quizunitRoot : levelClasses = {
    rootLevel : levelClass0,
    classMap : quizunitClassMap,
    isLeaf : false,
}


//const levelClass2 : levelClass = {
//    levelName : "單元",
//    classes : [ "unit1" , "unit2" , "unit3" ],
//}

const reviewLevelClass0 : levelClass = {
    levelName : "級別", 
    classes : [ "初中真題" , "高中真題" ],
}

const reviewLevelClass1 : levelClass = {
    levelName : "年度", 
    classes : [ "2012" , "2013", "2014" ],
}

const reviewLevelClass2 : levelClass = {
    levelName : "出處",
    classes : [ "北京" , "上海" , "重慶" ],
}


const courseLevelClass0 : levelClass = {
    levelName : "课程", 
    classes : [ "TOFEL IBT" , "短語库" , "中/高考真題" ],
}

const courseLevelClass1 : levelClass = {
    levelName : "類別", 
    classes : [ "單詞" , "短語" ],
}

//map key class -> it's sub classes

const courseLevelClassesArray = new Array<levelClass>()

courseLevelClassesArray.push( courseLevelClass0  )
//reviewquizunitLevelClassesArray.push( reviewLevelClass0 ,reviewLevelClass1 , reviewLevelClass2 );

