import { refreshConstants } from '../constants' 
import { refreshService } from '../services'

export const refreshActions = {
    refresh,
}

function refresh(refresh){
    return dispatch => {
        dispatch(request(refresh))

        refreshService.refresh(refresh).then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(refresh){ return { type: refreshConstants.REFRESH_REQUEST, refresh}}
    function success(data){ return { type: refreshConstants.REFRESH_SUCCESS, data}}
    function failure(error){return { type: refreshConstants.REFRESH_FAILURE, error}}
}