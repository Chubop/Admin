import { unsupJobConstants } from './constants'


export function unsupportedJob(state = {}, action){
    switch(action.type){
        case unsupJobConstants.GET_UNSUP_JOB_REQUEST:
            return{
                ...state,
                loading: true,
                error: false,
            }
        case unsupJobConstants.GET_UNSUP_JOB_SUCCESS:
            return{
                ...state,
                unsupJob: action.data,
                loading: false
            }
        case unsupJobConstants.GET_UNSUP_JOB_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}

export function unsupportedJobs(state = {}, action){
    switch(action.type){
        case unsupJobConstants.GET_ALL_UNSUP_JOB_REQUEST:
            return{
                ...state,
                loading: true,
                error: false,
            }
        case unsupJobConstants.GET_ALL_UNSUP_JOB_SUCCESS:
            return{
                ...state,
                unsupJobs: action.data,
                loading: false
            }
        case unsupJobConstants.GET_ALL_UNSUP_JOB_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}
