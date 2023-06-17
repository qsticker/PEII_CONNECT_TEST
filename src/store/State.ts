import { RootClassfication } from '@/apis/models/RootClassfication'
import { ProfileModel } from '@/apis/models/Profile';

export interface State {
    courseClassfication:  RootClassfication[],
    profile: ProfileModel | null, 
}