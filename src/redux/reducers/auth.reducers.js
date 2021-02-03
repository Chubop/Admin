import { authConstants } from '../constants'


let profile = JSON.parse(localStorage.getItem('profile'))
const initialState = profile ? { loggedIn: true, profile} : {}

export function authentication(state = initialState, action){
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            return{
                loggingIn: true, 
                profile: action.profile,
                error: false
            }

        case authConstants.REGISTER_REQUEST:
            return{
                registering: true,
                profile: action.profile,
                error: false
            }

        case authConstants.LOGIN_SUCCESS:
        case authConstants.REGISTER_SUCCESS:
            return{
                loggedIn: true, 
                profile: action.profile
            }

        case authConstants.LOGIN_FAILURE:
        case authConstants.REGISTER_FAILURE:
            return{ 
                errorStatus: true,
                error: action.error.message
            }
        case authConstants.LOGOUT:
            return {}

        default:
            return state

    }
}