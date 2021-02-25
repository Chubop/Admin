import { candidateConstants } from '../constants' 
import { candidateService } from '../services'

export const candidateActions = {
    createCandidate,
    getCandidate,
    deleteCandidate,
    updateCandidate,
    getAllCandidates,
}

function createCandidate(candidate){
    return dispatch => {
        dispatch(request())

        candidateService.createCandidate(candidate).then(
            data => {
                dispatch(success(data))
                dispatch(getAllCandidates())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(){ return { type: candidateConstants.CREATE_CANDIDATE_REQUEST, }}
    function success(data){ return { type: candidateConstants.CREATE_CANDIDATE_SUCCESS, data}}
    function failure(error){return { type: candidateConstants.CREATE_CANDIDATE_FAILURE, error}}
}

function getCandidate(cid){
    return dispatch => {
        dispatch(request())

        candidateService.getCandidate(cid).then(
            candidate => {
                dispatch(success(candidate))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    
    function request(){return {type: candidateConstants.GET_CANDIDATE_REQUEST, }}
    function success(data){return {type: candidateConstants.GET_CANDIDATE_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.GET_CANDIDATE_FAILURE, error}}
}

function deleteCandidate(jid, aid){
    return dispatch => {
        dispatch(request())

        candidateService.deleteCandidate(jid, aid).then(
            data => {
                dispatch(success(data))
                dispatch(getAllCandidates())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }
    function request(){return {type: candidateConstants.DELETE_CANDIDATE_REQUEST, }}
    function success(data){return {type: candidateConstants.DELETE_CANDIDATE_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.DELETE_CANDIDATE_FAILURE, error}}
}

function updateCandidate(candidate){
    return dispatch => {
        dispatch(request())

        candidateService.updateCandidate(candidate).then(
            data => {
                dispatch(success(data))
                dispatch(getAllCandidates())
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
            
        )
    }

    function request(){return {type: candidateConstants.UPDATE_CANDIDATE_REQUEST, }}
    function success(data){return {type: candidateConstants.UPDATE_CANDIDATE_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.UPDATE_CANDIDATE_FAILURE, error}}
}

function getAllCandidates(){
    return dispatch => {
        dispatch(request())

        candidateService.getAllCandidates().then(
            data => {
                dispatch(success(data))
            }
        ).catch(
            error => {
                dispatch(failure(error))
            }
        )
    }
    
    function request() {return {type: candidateConstants.GET_ALL_CANDIDATES_REQUEST, }}
    function success(data){return {type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.GET_ALL_CANDIDATES_FAILURE, error}}
}