import { authConstants } from './constant'
import { authService } from './service'
import { checkAuthError } from '../ErrorHandling/auth'

export const authActions = { 
    login,
    logout, 
    register,
    resetPassword,
    saveProfile,
    IAPSelf
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

function saveProfile(attribute){
    return dispatch => {
        dispatch(request(attribute))

        authService.saveProfile(attribute).then(
            attribute => {
                dispatch(success(attribute))
            },
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
        )

    }


    function request(attribute){ return { type: authConstants.SAVE_REQUEST, attribute}}
    function success(attribute){ return { type: authConstants.SAVE_SUCCESS, attribute}}
    function failure(error){ return { type: authConstants.SAVE_FAILURE, error}}
}


function IAPSelf(){
    return dispatch => {
        dispatch(request())

        authService.IAPSelf().then(
            data => {
                dispatch(success(data))
            },
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )

    }


    function request(){ return { type: authConstants.IAP_SELF_REQUEST}}
    function success(data){ return { type: authConstants.LOGIN_SUCCESS, data}}
    function failure(error){ return { type: authConstants.IAP_SELF_FAILURE, error}}

}