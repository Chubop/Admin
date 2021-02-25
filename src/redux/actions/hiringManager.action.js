import { hmConstants } from '../constants' 
import { hmService } from '../services'

export const hmActions = {
    createHM,
    getHM,
    deleteHM,
    updateHM,
    getAllHMs,
}

function createHM(hm){
    return dispatch => {
        dispatch(request())

        hmService.createHM(hm).then(
            data => {
                dispatch(success(data))
                dispatch(getAllHMs())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(){ return { type: hmConstants.CREATE_HM_REQUEST, }}
    function success(data){ return { type: hmConstants.CREATE_HM_SUCCESS, data}}
    function failure(error){return { type: hmConstants.CREATE_HM_FAILURE, error}}
}

function getHM(hmid){
    return dispatch => {
        dispatch(request())

        hmService.getHM(hmid).then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    
    function request(){return {type: hmConstants.GET_HM_REQUEST, }}
    function success(data){return {type: hmConstants.GET_HM_SUCCESS, data}}
    function failure(error){return {type: hmConstants.GET_HM_FAILURE, error}}
}

function deleteHM(hm){
    return dispatch => {
        dispatch(request())

        hmService.deleteHM(hm).then(
            data => {
                dispatch(success(data))
                dispatch(getAllHMs())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    function request(){return {type: hmConstants.DELETE_HM_REQUEST, }}
    function success(data){return {type: hmConstants.DELETE_HM_SUCCESS, data}}
    function failure(error){return {type: hmConstants.DELETE_HM_FAILURE, error}}
}

function updateHM(hm){
    return dispatch => {
        dispatch(request())

        hmService.updateHM(hm).then(
            data => {
                dispatch(success(data))
                dispatch(getAllHMs())
                dispatch(getHM(hm.hmid))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(){return {type: hmConstants.UPDATE_HM_REQUEST, }}
    function success(data){return {type: hmConstants.UPDATE_HM_SUCCESS, data}}
    function failure(error){return {type: hmConstants.UPDATE_HM_FAILURE, error}}
}

function getAllHMs(){
    return dispatch => {
        dispatch(request())

        hmService.getAllHMs().then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )
    }
    
    function request() {return {type: hmConstants.GET_ALL_HMS_REQUEST, }}
    function success(data){return {type: hmConstants.GET_ALL_HMS_SUCCESS, data}}
    function failure(error){return {type: hmConstants.GET_ALL_HMS_FAILURE, error}}
}