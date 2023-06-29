import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';
import { commodity } from '@/models/commodity'

export interface State {
    courseClassfication:  RootClassfication[],
    quizClassfication:  RootClassfication[],
    profile: ProfileModel | null, 
    shoppingCart : Map<commodity, number> | null;
}