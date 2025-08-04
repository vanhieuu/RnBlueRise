import { ThemeType } from "@theme";
import {SLICE_NAME} from '@config/type'

export interface AppState{
    theme:ThemeType,
    loadingApp:boolean,
    showDialog:boolean,
    internetState?:any,
    showLoadingScreen:boolean,
    listStatus:any[]
}


