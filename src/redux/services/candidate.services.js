import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'

export const candidateService = {
    createCandidate,
    getCandidate,
    getAllCandidates,
    deleteCandidate,
    updateCandidate,
}

async function createCandidate(candidate) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.post(
        `${API_ROOT}/candidate`,
        candidate,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )

    return response.data
}

async function getCandidate(cid) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.get(
        `${API_ROOT}/candidate/${cid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )

    let data = response.data
    return data
}

async function getAllCandidates(currentPage, order, orderBy) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const preference = JSON.parse(localStorage.getItem('preferences'))
    const rowsPerPage = preference['rowsPerPage']['candidatesPage']

    let response = await axios.get(
        `${API_ROOT}/candidate`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            params: {
                rowsPerPage: rowsPerPage,
                pageNumber: currentPage,
                order: order,
                orderBy: orderBy
            }
        }
    )
    let data = response.data
    let candidates = data.data
    for (let i = 0; i < candidates.length; i ++){
        let candidate = candidates[i]
        let applicants = candidate['applicants']
        candidate['numApplications'] = 0
        if (Array.isArray(applicants)){
            let nullIndex = applicants.indexOf(null)
            // Remove null from list if exists
            if (nullIndex !== -1){
                applicants = applicants.splice(nullIndex, 1)
            }
            candidate['numApplications'] = applicants.length
        }
    }
    let values = {
        candidates: candidates,
        totalCount: data.total_count
    }
    return values
}

async function deleteCandidate(cid) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.delete(
        `${API_ROOT}/candidate/${cid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

    )
    return response.data
}

async function updateCandidate(candidate) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    if (candidate.cid) {
        let response = await axios.put(
            `${API_ROOT}/candidate/${candidate.cid}`,
            candidate,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        return response.data
    }
}
