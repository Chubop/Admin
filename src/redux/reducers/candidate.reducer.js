import { candidateConstants } from '../constants'


const initialState = {}

export function candidate(state = initialState, action){
    switch(action.type){
        case candidateConstants.CREATE_CANDIDATE_REQUEST:
        case candidateConstants.DELETE_CANDIDATE_REQUEST:
        case candidateConstants.GET_CANDIDATE_REQUEST:
        case candidateConstants.UPDATE_CANDIDATE_REQUEST:
            return{
                ...state,
                candidate: null,
                loading: true,
                error: false,
            }
        case candidateConstants.CREATE_CANDIDATE_SUCCESS:
        case candidateConstants.GET_CANDIDATE_SUCCESS:
        case candidateConstants.UPDATE_CANDIDATE_SUCCESS:
            return {
                ...state,
                candidate: action.data,
                loading: false
            }
        case candidateConstants.DELETE_CANDIDATE_SUCCESS:
            return{
                ...state,
                candidate: {},
                loading: false
            }
        case candidateConstants.CREATE_CANDIDATE_SUCCESS:
        case candidateConstants.GET_CANDIDATE_FAILURE:
        case candidateConstants.UPDATE_CANDIDATE_FAILURE:
        case candidateConstants.DELETE_CANDIDATE_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}

export function candidates(state = initialState, action){
    switch(action.type){
        case candidateConstants.GET_ALL_CANDIDATES_REQUEST:
            return{
                ...state,
                candidates: null,
                loading: true,
                error: false,
            }
        case candidateConstants.GET_ALL_CANDIDATES_SUCCESS:
            return{
                ...state,
                candidates: action.data.candidates,
                stats: action.data.stats,
                loading: false
            }
        case candidateConstants.GET_ALL_CANDIDATES_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}