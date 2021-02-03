import { refreshConstants } from '../constants'


const initialState = {}

export function refresh(state = initialState, action){
    switch(action.type){
        case refreshConstants.REFRESH_REQUEST:
            return{
                ...state,
                loading: true,
                error: false,
            }
        case refreshConstants.REFRESH_SUCCESS:
            return {
                ...state,
                loading: false,
                refresh: action.refresh
            }

        case refreshConstants.REFRESH_FAILURE:
            return {
                // ...state,
                errorStatus: true,
                error: action.error.message,
                loading: false,
            }

        default:
            return state 
    }
}