import { jobConstants } from '../constants'


const initialState = {}

export function job(state = initialState, action){
    switch(action.type){
        case jobConstants.CREATE_JOB_REQUEST:
        case jobConstants.DELETE_JOB_REQUEST:
        case jobConstants.GET_JOB_REQUEST:
        case jobConstants.UPDATE_JOB_REQUEST:
            return{
                ...state,
                job: null,
                loading: true,
                error: false,
            }
        case jobConstants.CREATE_JOB_SUCCESS:
        case jobConstants.GET_JOB_SUCCESS:
        case jobConstants.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                job: action.data.job,
                stats: action.data.stats,
                loading: false
            }
        case jobConstants.DELETE_JOB_SUCCESS:
            return{
                ...state,
                job: {},
                loading: false
            }
        case jobConstants.CREATE_JOB_FAILURE:
        case jobConstants.GET_JOB_FAILURE:
        case jobConstants.UPDATE_JOB_FAILURE:
        case jobConstants.DELETE_JOB_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}

export function jobs(state = initialState, action){
    switch(action.type){
        case jobConstants.GET_ALL_JOBS_REQUEST:
            return{
                ...state,
                jobs: null,
                loading: true,
                error: false,
            }
        case jobConstants.GET_ALL_JOBS_SUCCESS:
            return{
                ...state,
                jobs: action.data.jobs,
                stats: action.data.stats,
                loading: false
            }
        case jobConstants.GET_ALL_JOBS_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}