import { applicantConstants } from '../constants' 
import { applicantService } from '../services'
import { checkAuthError } from '../ErrorHandling/auth'
export const applicantActions = {
    createApplicant,
    getApplicant,
    deleteApplicant,
    updateApplicant,
    getAllApplicants,
    getAllApplicantsStats
}

function createApplicant(applicant){
    return dispatch => {
        dispatch(request())

        applicantService.createApplicant(applicant).then(
            data => {
                dispatch(success(data))
                dispatch(getAllApplicants())
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }

    function request(){ return { type: applicantConstants.CREATE_APPLICANT_REQUEST, }}
    function success(data){ return { type: applicantConstants.CREATE_APPLICANT_SUCCESS, data}}
    function failure(error){return { type: applicantConstants.CREATE_APPLICANT_FAILURE, error}}
}

function getApplicant(aid, jid){
    return dispatch => {
        dispatch(request())

        applicantService.getApplicant(aid, jid).then(
            applicant => {
                dispatch(success(applicant))
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }
    
    function request(){return {type: applicantConstants.GET_APPLICANT_REQUEST, }}
    function success(data){return {type: applicantConstants.GET_APPLICANT_SUCCESS, data}}
    function failure(error){return {type: applicantConstants.GET_APPLICANT_FAILURE, error}}
}

function deleteApplicant(jid, aid, refreshPage){
    return dispatch => {
        dispatch(request())

        applicantService.deleteApplicant(jid, aid).then(
            data => {
                dispatch(success(data))
                refreshPage()
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }
    function request(){return {type: applicantConstants.DELETE_APPLICANT_REQUEST, }}
    function success(data){return {type: applicantConstants.DELETE_APPLICANT_SUCCESS, data}}
    function failure(error){return {type: applicantConstants.DELETE_APPLICANT_FAILURE, error}}
}

function updateApplicant(applicant){
    return dispatch => {
        dispatch(request())

        applicantService.updateApplicant(applicant).then(
            data => {
                dispatch(success(data))
                dispatch(getAllApplicants())
                dispatch(getApplicant(applicant.aid))
            }
        ).catch(
            error => {
                dispatch(failure(error))
                checkAuthError(dispatch, error)
            }
            
        )
    }

    function request(){return {type: applicantConstants.UPDATE_APPLICANT_REQUEST, }}
    function success(data){return {type: applicantConstants.UPDATE_APPLICANT_SUCCESS, data}}
    function failure(error){return {type: applicantConstants.UPDATE_APPLICANT_FAILURE, error}}
}

function getAllApplicants(currentPage, order, orderBy){
    return dispatch => {
        dispatch(request())

        applicantService.getAllApplicants(currentPage, order, orderBy).then(
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
    
    function request() {return {type: applicantConstants.GET_ALL_APPLICANTS_REQUEST, }}
    function success(data){return {type: applicantConstants.GET_ALL_APPLICANTS_SUCCESS, data}}
    function failure(error){return {type: applicantConstants.GET_ALL_APPLICANTS_FAILURE, error}}
}

function getAllApplicantsStats(numDays) {
    return dispatch => {
        dispatch(request())

        applicantService.getAllApplicantsStats(numDays).then(
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
    
    function request() {return {type: applicantConstants.GET_ALL_APPLICANTS_STATS_REQUEST, }}
    function success(data){return {type: applicantConstants.GET_ALL_APPLICANTS_STATS_SUCCESS, data}}
    function failure(error){return {type: applicantConstants.GET_ALL_APPLICANTS_STATS_FAILURE, error}}

}