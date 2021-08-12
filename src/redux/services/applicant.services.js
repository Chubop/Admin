import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'
import { analyzeApplicants } from './analytics'

export const applicantService = {
    createApplicant,
    getApplicant,
    getAllApplicants,
    deleteApplicant,
    updateApplicant,
}

async function createApplicant(applicant) {
    const API_ROOT = UseBackendRoot()
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
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.get(
        `${API_ROOT}/applicant/${jid}/${aid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    let applicant = response.data

    if (!applicant.name && applicant.first_name && applicant.last_name) {
        applicant['name'] = applicant.first_name + " " + applicant.last_name
    }

    return applicant
}

async function getAllApplicants(currentPage, order, orderBy) {
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const preference = JSON.parse(localStorage.getItem('preferences'))
    const rowsPerPage = preference['rowsPerPage']['applicantsPage']
    let response = await axios.get(
        `${API_ROOT}/applicant`,
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
    console.log(data)
    let applicants = data.data
    // Sort applicants by creation time
    applicants = applicants.sort((a, b) => {
        if (a.created && b.created){
            let aCreated = a.created
            let bCreated = b.created
            if (aCreated[0])
                aCreated = aCreated[0]
            if (bCreated[0])
                bCreated = bCreated[0]

            if (aCreated < bCreated)
                return 1
            if (aCreated > bCreated)
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
        totalCount: data.total_count,
        stats: analyzeApplicants(applicants, {}, {getBadNames: true, getAutoDecisionStats: true})
    }
    return values
}

async function deleteApplicant(jid, aid) {
    const API_ROOT = UseBackendRoot()
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
    const API_ROOT = UseBackendRoot()
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
