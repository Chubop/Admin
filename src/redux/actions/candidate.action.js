import { candidateConstants } from '../constants' 
import { candidateService } from '../services'
import { checkAuthError } from '../ErrorHandling/auth'
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
                checkAuthError(dispatch, error)
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
                checkAuthError(dispatch, error)
            }
            
        )
    }
    
    function request(){return {type: candidateConstants.GET_CANDIDATE_REQUEST, }}
    function success(data){return {type: candidateConstants.GET_CANDIDATE_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.GET_CANDIDATE_FAILURE, error}}
}

function deleteCandidate(cid){
    return dispatch => {
        dispatch(request())

        candidateService.deleteCandidate(cid).then(
            data => {
                dispatch(success(data))
                dispatch(getAllCandidates())
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
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
                dispatch(getCandidate(candidate.cid))
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }

    function request(){return {type: candidateConstants.UPDATE_CANDIDATE_REQUEST, }}
    function success(data){return {type: candidateConstants.UPDATE_CANDIDATE_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.UPDATE_CANDIDATE_FAILURE, error}}
}

function getAllCandidates(currentPage, order, orderBy){
    return dispatch => {
        dispatch(request())

        candidateService.getAllCandidates(currentPage, order, orderBy).then(
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
    
    function request() {return {type: candidateConstants.GET_ALL_CANDIDATES_REQUEST, }}
    function success(data){
        console.log(data)
        return {type: candidateConstants.GET_ALL_CANDIDATES_SUCCESS, data}}
    function failure(error){return {type: candidateConstants.GET_ALL_CANDIDATES_FAILURE, error}}
}