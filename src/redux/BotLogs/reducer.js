import { botLogConstants } from './constants'

export function botLogs(state = {}, action){
    switch(action.type){
        case botLogConstants.GET_ALL_BOT_LOGS_REQUEST:
            return{
                ...state,
                botLogs: {
                    allLogs: {},
                    byJob : {},
                },
                loading: true,
            }
        case botLogConstants.GET_ALL_BOT_LOGS_SUCCESS:
            return{
                ...state,
                botLogs: action.data,
                loading: false
            }
        case botLogConstants.GET_ALL_BOT_LOGS_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}
