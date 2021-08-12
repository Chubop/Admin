import { applicantConstants } from '../constants'


const initialState = {}

export function applicant(state = initialState, action){
    switch(action.type){
        case applicantConstants.CREATE_APPLICANT_REQUEST:
        case applicantConstants.DELETE_APPLICANT_REQUEST:
        case applicantConstants.GET_APPLICANT_REQUEST:
        case applicantConstants.UPDATE_APPLICANT_REQUEST:
            return{
                ...state,
                applicant: null,
                loading: true,
                error: false,
            }
        case applicantConstants.CREATE_APPLICANT_SUCCESS:
        case applicantConstants.GET_APPLICANT_SUCCESS:
        case applicantConstants.UPDATE_APPLICANT_SUCCESS:
            return {
                ...state,
                applicant: action.data,
                loading: false
            }
        case applicantConstants.DELETE_APPLICANT_SUCCESS:
            return{
                ...state,
                applicant: {},
                loading: false
            }
        case applicantConstants.CREATE_APPLICANT_SUCCESS:
        case applicantConstants.GET_APPLICANT_FAILURE:
        case applicantConstants.UPDATE_APPLICANT_FAILURE:
        case applicantConstants.DELETE_APPLICANT_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}

export function applicants(state = initialState, action){
    switch(action.type){
        case applicantConstants.GET_ALL_APPLICANTS_REQUEST:
            return{
                ...state,
                applicants: null,
                loading: true,
                error: false,
            }
        case applicantConstants.GET_ALL_APPLICANTS_SUCCESS:
            return{
                ...state,
                applicants: action.data.applicants,
                totalCount: action.data.totalCount,
                stats: action.data.stats,
                loading: false
            }
        case applicantConstants.GET_ALL_APPLICANTS_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}