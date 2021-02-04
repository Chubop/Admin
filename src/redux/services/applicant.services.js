import axios from 'axios'
import { API_ROOT } from '../../settings/settings'
import { analyzeApplicants } from './analytics'

export const applicantService = {
    createApplicant,
    getApplicant,
    getAllApplicants,
    deleteApplicant,
    updateApplicant,
}

async function createApplicant(applicant) {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.post(
        `${API_ROOT}/applicant`,
        applicant,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )

    return response.data
}

async function getApplicant(aid, jid) {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.get(
        `${API_ROOT}/applicant/${jid}/${aid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )

    let data = response.data
    return data
}

async function getAllApplicants() {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.get(
        `${API_ROOT}/applicant`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    let data = response.data
    let applicants = data.data
    // Sort applicants by creation time
    applicants = applicants.sort((a, b) => {
        if (a.created && b.created){
            if (a.created[0] < b.created[0])
                return 1
            if (a.created[0] > b.created[0])
                return -1
        }
        else if (a.created && !b.created) {
            // if comparing applicant that has used bot to one that has not
            return -1
        }
        return 0
    })
    let values = {
        applicants: applicants,
        stats: analyzeApplicants(applicants, {})
    }
    return values
}

async function deleteApplicant(jid, aid) {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.delete(
        `${API_ROOT}/applicant/${jid}/${aid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }

    )
    return response.data
}

async function updateApplicant(applicant) {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    if (applicant.jid && applicant.aid) {
        let response = await axios.put(
            `${API_ROOT}/applicant/${applicant.jid}/${applicant.aid}`,
            applicant,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        return response.data
    }
}
