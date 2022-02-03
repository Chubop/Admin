import { unsupJobConstants } from './constants' 
import { unsupJobService } from './service'
import { checkAuthError } from '../ErrorHandling/auth'

export const unsupportedJobActions = {
    getUnsupJobs,
    getAllUnsupJobs
}

function getUnsupJobs(jid){
    return dispatch => {
        dispatch(request())

        unsupJobService.getUnsupportedJob(jid).then(
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

    
    
    function request(){ return { type: unsupJobConstants.GET_UNSUP_JOB_REQUEST, }}
    function success(data){ return { type: unsupJobConstants.GET_UNSUP_JOB_SUCCESS, data}}
    function failure(error){return { type: unsupJobConstants.GET_UNSUP_JOB_FAILURE, error}}
}

function getAllUnsupJobs(){
    return dispatch => {
        dispatch(request())

        unsupJobService.getAllUnsupportedJobs().then(
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


    function request(){ return { type: unsupJobConstants.GET_ALL_UNSUP_JOB_REQUEST, }}
    function success(data){ return { type: unsupJobConstants.GET_ALL_UNSUP_JOB_SUCCESS, data}}
    function failure(error){return { type: unsupJobConstants.GET_ALL_UNSUP_JOB_FAILURE, error}}
}
