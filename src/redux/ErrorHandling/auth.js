import { current_env } from '../../settings/settings'
import { authActions } from '../authentication'

export function checkAuthError(dispatch, error){
    /* 
        Checking to see if 401 error, which means access token has expired 
        If in production environment, automatically generate a new token
    */
    if(error.response.status === 401){
        if (current_env === 'production'){
            dispatch(authActions.IAPSelf())
        }else{
            dispatch(authActions.logout())
        }
    }
}