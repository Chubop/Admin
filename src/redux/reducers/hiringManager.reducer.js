import { hmConstants } from '../constants'

const initialState = {}

export function hiringManager(state = initialState, action){
    switch(action.type){
        case hmConstants.CREATE_HM_REQUEST:
        case hmConstants.GET_HM_REQUEST:
        case hmConstants.DELETE_HM_REQUEST:
        case hmConstants.UPDATE_HM_REQUEST:
            return{
                ...state,
                hiringManager: null,
                loading: true,
                error: false,
            }
        case hmConstants.CREATE_HM_SUCCESS:
        case hmConstants.GET_HM_SUCCESS:
        case hmConstants.UPDATE_HM_SUCCESS:
            return {
                ...state,
                hiringManager: action.data.hiringManager,
                stats: action.data.stats,
                loading: false
            }
        case hmConstants.DELETE_HM_SUCCESS:
            return{
                ...state,
                hiringManager: {},
                loading: false
            }
        case hmConstants.CREATE_HM_FAILURE:
        case hmConstants.GET_HM_FAILURE:
        case hmConstants.UPDATE_HM_FAILURE:
        case hmConstants.DELETE_HM_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}

export function hiringManagers(state = initialState, action){
    switch(action.type){
        case hmConstants.GET_ALL_HMS_REQUEST:
            return{
                ...state,
                hiringManagers: null,
                loading: true,
                error: false,
            }
        case hmConstants.GET_ALL_HMS_SUCCESS:
            return{
                ...state,
                hiringManagers: action.data.profiles,
                totalCount: action.data.totalCount,
                loading: false
            }
        case hmConstants.GET_ALL_HMS_FAILURE:
            return {
                ...state,
                error: action.error.message,
                loading: false
            }

        default:
            return state 
    }
}