import axios from 'axios'
import { API_ROOT } from '../../settings/settings'
import { analyzeApplicants } from './analytics'

export const hmService = {
    createHM,
    getHM,
    getAllHMs,
    deleteHM,
    updateHM,
}

async function createHM(hm){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.post(
        `${API_ROOT}/hiring-manager`,
        hm,
        {   
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    return response.data
}

async function getHM(id){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        let response = await axios.get(
            `${API_ROOT}/hiring-manager/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        return getHMstats(response.data)
}

async function getAllHMs(){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        // Query for all hiring managers
        let response = await axios.get(
            `${API_ROOT}/hiring-manager`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        let hiringManagers = response.data.data
        return hiringManagers
}

async function deleteHM(hmid){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.delete(
        `${API_ROOT}/hiring-manager/${hmid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    return response.data
}

async function updateHM(hm){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    if (hm.hmid){
        let response = await axios.put(
            `${API_ROOT}/hiring-manager/${hm.hmid}`,
            hm,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        return getHMstats(response.data)
    }
}

function getHMstats(hm) {
    let hiringManager = hm
    let jobs = hiringManager.jobs
    let stats = {}
    // default
    stats['numApplicants'] = 0

    if (jobs) {
        let applicants = []
        for (let i = 0; i < jobs.length; i++)
            applicants = applicants.concat(jobs[i].applicants)
        if (applicants.length > 0) {
            stats = analyzeApplicants(applicants, stats)
            hiringManager['applicants'] = applicants
        }
    }
    let values = {
        hiringManager: hiringManager,
        stats: stats
    }
    return values
}