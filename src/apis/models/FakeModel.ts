import { TextField , ImageField , Audio , ContentModel , ActionModel , ClickAreaModel} from '@/apis/models/QuizModel';



const audio1 : Audio = {
    enabled: true,
    url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
}

const imageField1 : ImageField = {
    paddingX : 100,
    size : 90,
    radius: 16,
    enabled: true,
    url: 'https://storage.googleapis.com/quiz-storage/quiz-images/Ro4W5pJbFQ7inrP',
    paddingY: 80
}

const textField1 : TextField = {
    enabled: true,
    paddingX: 80,
    paddingY: 100,
    size: 10,
    text: "Course Timetable \nStandard Course	Mon－Fri	20 lessons	9:30-12:30 \nIntensive Course	Mon－Fri	20 lessons	9:30-12:30 \n		20 lessons	13:30-14:30 \nEvaluation\nStudent are placed into classes according to their current language skills. The majority of them take on online language test before starting their programme. However, if this is not available, \nstudents sit the exam on the first Monday of their course.\nLearning materials are provided to students throughout their course, and there will never be more than 15 participants in each class.\nArrivals and Transfer\nOur programme offers the full package—students are take good care of from the start through to the very end. They are collected from the airport upon arrival and brought\nto their accommodation in comfort. Werequire the student's full details at least 4 weeks in advance.\nMeals/Allergies(过敏)/Special Dietary Requirements\nStudents are provided with breakfast\ndinner and either a cooked or packed lunch (which consists of a sandwich, a drink and adessert). Snacks outside of meal times may be purchased by the student individually.\nWe ask that you let us know of any allergies or dietary requirements as well as information about any medicines you take. Depending on the type of allergies and/ or dietary requirements, an extra charge may be made\nfor providing special food."
}


const click1 : ContentModel = {
    Audio : audio1,
    imageField : imageField1,
    textField : textField1
}

const audio2 : Audio = {
    enabled: false,
    url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
}

const imageField2 : ImageField = {
    paddingX : 100,
    size : 90,
    radius: 16,
    enabled: false,
    url: 'https://storage.googleapis.com/quiz-storage/quiz-images/Ro4W5pJbFQ7inrP',
    paddingY: 80
}

const textField2 : TextField = {
    enabled: true,
    paddingX: 80,
    paddingY: 100,
    size: 10,
    text : "It focuses on speaking."
}


const click2 : ContentModel = {
    Audio : audio2,
    imageField : imageField2,
    textField : textField2
}

const audio3 : Audio = {
    enabled: false,
    url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
}

const imageField3 : ImageField = {
    paddingX : 100,
    size : 90,
    radius: 16,
    enabled: false,
    url: 'https://storage.googleapis.com/quiz-storage/quiz-images/Ro4W5pJbFQ7inrP',
    paddingY: 80
}

const textField3 : TextField = {
    enabled: true,
    paddingX: 80,
    paddingY: 100,
    size: 10,
    text : "It is less effective."
}


const click3 : ContentModel = {
    Audio : audio3,
    imageField : imageField3,
    textField : textField3
}

const audio4 : Audio = {
    enabled: false,
    url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
}

const imageField4 : ImageField = {
    paddingX : 100,
    size : 90,
    radius: 16,
    enabled: false,
    url: 'https://storage.googleapis.com/quiz-storage/quiz-images/Ro4W5pJbFQ7inrP',
    paddingY: 80
}

const textField4 : TextField = {
    enabled: true,
    paddingX: 80,
    paddingY: 100,
    size: 10,
    text : "It includes extra lessons."
}


const click4 : ContentModel = {
    Audio : audio4,
    imageField : imageField4,
    textField : textField4
}

const audio5 : Audio = {
    enabled: false,
    url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
}

const imageField5 : ImageField = {
    paddingX : 100,
    size : 90,
    radius: 16,
    enabled: false,
    url: 'https://storage.googleapis.com/quiz-storage/quiz-images/Ro4W5pJbFQ7inrP',
    paddingY: 80
}

const textField5 : TextField = {
    enabled: true,
    paddingX: 80,
    paddingY: 100,
    size: 10,
    text : "It give you confidence."
}


const click5 : ContentModel = {
    Audio : audio5,
    imageField : imageField5,
    textField : textField5
}
const titleAction : ActionModel = {
    type : "title"
}

const answerAction : ActionModel = {
    type : "answer"
}

const clickArea1 : ClickAreaModel ={
    label : 'title',
    action: titleAction,
    content: click1,
}

const clickArea2 : ClickAreaModel ={
    label : 'A',
    action: answerAction,
    content: click2,
}

const clickArea3 : ClickAreaModel ={
    label : 'B',
    action: answerAction,
    content: click3,
}

const clickArea4 : ClickAreaModel ={
    label : 'C',
    action: answerAction,
    content: click4,
}

const clickArea5 : ClickAreaModel ={
    label : 'D',
    action: answerAction,
    content: click5,
}

export const clickAreas : Array<ClickAreaModel> = [

    clickArea1,
    clickArea2,
    clickArea3,
    clickArea4,
    clickArea5
]

