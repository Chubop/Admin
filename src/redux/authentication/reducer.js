import { authConstants } from './constant'

let profile = JSON.parse(localStorage.getItem('profile'))
const initialState = profile ? { loggedIn: true, profile} : {}

export function authentication(state = initialState, action){
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            return{
                loggingIn: true, 
                profile: action.profile
            }
        case authConstants.LOGIN_SUCCESS:
            return{
                loggedIn: true,
                profile: action.profile
            }
        case authConstants.REGISTER_REQUEST:
            return{
                registering: true,
                profile: action.profile
            }
        case authConstants.REGISTER_SUCCESS:
            return{
                profile: action.profile,
                loggedIn: true,
            }

        case authConstants.LOGIN_FAILURE:
        case authConstants.REGISTER_FAILURE:
            return{ 
                errorStatus: true,
                error: action.error
            }
        case authConstants.LOGOUT:
            return {}

        default:
            return state

    }
}

export function saveProfile(state = { loading: false, }, action){
    switch(action.type){
        case authConstants.SAVE_REQUEST:
            return {
                attribute: action.attribute,
                loading: true,
            }

        case authConstants.SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case authConstants.SAVE_FAILURE:
            return {
                loading: false, 
                attribute: action.attribute, 
                error: action.error
            }

        default:
            return state
    
    }
}

export function resetPassword(state = {}, action){
    switch(action.type){
        case authConstants.RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case authConstants.RESET_PASSWORD_SUCCESS:
            return {}
        case authConstants.RESET_PASSWORD_FAILURE:
            return {error: action.error}
        default:
            return state 
    }
}

export function IAPSelf(state = {}, action){
    switch(action.type){
        case authConstants.IAP_SELF_REQUEST:
            return {
                loading: true
            }
        case authConstants.IAP_SELF_SUCCESS:
            return {}
        case authConstants.IAP_SELF_FAILURE:
            return {error: action.error}
        default:
            return state 
    }
}