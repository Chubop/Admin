import { botLogConstants } from './constants' 
import { botLogService } from './service'
import { checkAuthError } from '../ErrorHandling/auth'

export const botLogActions = {
    getAllBotLogs
}

function getAllBotLogs(numDays){
    return dispatch => {
        dispatch(request())

        botLogService.getAllBotLogs(numDays).then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }

    
    
    function request(){ return { type: botLogConstants.GET_ALL_BOT_LOGS_REQUEST, }}
    function success(data){ return { type: botLogConstants.GET_ALL_BOT_LOGS_SUCCESS, data}}
    function failure(error){return { type: botLogConstants.GET_ALL_BOT_LOGS_FAILURE, error}}
}