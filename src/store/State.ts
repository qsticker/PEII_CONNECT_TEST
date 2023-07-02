import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';
import { commodity } from '@/models/commodity'

export interface State {
    courseClassfication:  RootClassfication[],
    quizClassfication:  RootClassfication[],
    profile: ProfileModel | null, 
    shoppingCart : Map<commodity, number> | null;
    userContainPasses : Map<commodity, number> | null; //retrieve this information by api ( maybe those can contain in user's profile)
}