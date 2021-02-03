import { jobConstants } from '../constants' 
import { jobService } from '../services'

export const jobActions = {
    createJob,
    getJob,
    deleteJob,
    updateJob,
    getAllJobs,
}

function createJob(job){
    return dispatch => {
        dispatch(request())

        jobService.createJob(job).then(
            data => {
                dispatch(success(data))
                dispatch(getAllJobs())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(){ return { type: jobConstants.CREATE_JOB_REQUEST, }}
    function success(data){ return { type: jobConstants.CREATE_JOB_SUCCESS, data}}
    function failure(error){return { type: jobConstants.CREATE_JOB_FAILURE, error}}
}

function getJob(jid){
    return dispatch => {
        dispatch(request())

        jobService.getJob(jid).then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    
    function request(){return {type: jobConstants.GET_JOB_REQUEST, }}
    function success(data){return {type: jobConstants.GET_JOB_SUCCESS, data}}
    function failure(error){return {type: jobConstants.GET_JOB_FAILURE, error}}
}

function deleteJob(jid){
    return dispatch => {
        dispatch(request())

        jobService.deleteJob(jid).then(
            data => {
                dispatch(success(data))
                dispatch(getAllJobs())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    function request(){return {type: jobConstants.DELETE_JOB_REQUEST, }}
    function success(data){return {type: jobConstants.DELETE_JOB_SUCCESS, data}}
    function failure(error){return {type: jobConstants.DELETE_JOB_FAILURE, error}}
}

function updateJob(job){
    return dispatch => {
        dispatch(request())

        jobService.updateJob(job).then(
            data => {
                dispatch(success(data))
                dispatch(getAllJobs())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )
    }

    function request(){return {type: jobConstants.UPDATE_JOB_REQUEST, }}
    function success(data){return {type: jobConstants.UPDATE_JOB_SUCCESS, data}}
    function failure(error){return {type: jobConstants.UPDATE_JOB_FAILURE, error}}
}

function getAllJobs(){
    return dispatch => {
        dispatch(request())

        jobService.getAllJobs().then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )
    }
    
    function request() {return {type: jobConstants.GET_ALL_JOBS_REQUEST, }}
    function success(data){return {type: jobConstants.GET_ALL_JOBS_SUCCESS, data}}
    function failure(error){return {type: jobConstants.GET_ALL_JOBS_FAILURE, error}}
}