import { authConstants } from '../constants'
import { authService } from '../services'

export const authActions = { 
    login,
    logout, 
    register,
    resetPassword,
}

function login(credentials){
    return dispatch => {
        dispatch(request(credentials))

        authService.login(credentials).then(
                profile => {
                    dispatch(success(profile))
                
                    // TODO: Manage History 
                },
            ).catch(
                error => {
                    dispatch(failure(error))
                }
            )

    }

    function request(profile){ return {type: authConstants.LOGIN_REQUEST, profile}}
    function success(profile){ return {type: authConstants.LOGIN_SUCCESS, profile}}
    function failure(error){ return { type: authConstants.LOGIN_FAILURE, error}}
}

function logout(){
    authService.logout()
    return { type: authConstants.LOGOUT}
}

function register(profile){
    return dispatch => {
        dispatch(request(profile))

        authService.register(profile).then(
            profile => {
                dispatch(success(profile))
                // TODO: Manage History
            },
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )

    }


    function request(profile){ return { type: authConstants.REGISTER_REQUEST, profile}}
    function success(profile){ return { type: authConstants.REGISTER_SUCCESS, profile}}
    function failure(error){ return { type: authConstants.REGISTER_FAILURE, error}}
}

function resetPassword(credentials){
    return dispatch => {
        dispatch(request())

        authService.resetPassword(credentials).then(
                profile => {
                    dispatch(success(profile))
                    dispatch(loginSuccess())
                }
            ).catch(
                error => {
                    dispatch(failure(error))
                }
            )

    }

    function request(){ return { type: authConstants.RESET_PASSWORD_REQUEST}}
    function success(profile){ return { type: authConstants.RESET_PASSWORD_SUCCESS, profile}}
    function loginSuccess(profile){ return {type: authConstants.LOGIN_SUCCESS, profile}}
    function failure(error){ return { type: authConstants.RESET_PASSWORD_FAILURE, error}}
}
