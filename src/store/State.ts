import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';
import { pass} from '@/models/commodity'

export interface State {
    courseClassfication:  RootClassfication[],
    quizClassfication:  RootClassfication[],
    profile: ProfileModel | null, 
    shoppingCart : Map<pass, number> | null;
    userContainPasses : Map<pass, number> | null; //retrieve this information by api ( maybe those can contain in user's profile)
    sellPlanId: string;
    shoppingCartSize: number;
}