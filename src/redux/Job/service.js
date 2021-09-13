import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'

export const unsupJobService = {
    getUnsupportedJob,
    getAllUnsupportedJobs
}


async function getUnsupportedJob(id){
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        // Query for a single job
        let response = await axios.get(
            `${API_ROOT}/unsup_job/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        return response.data.data
}

async function getAllUnsupportedJobs(id){
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        let response = await axios.get(
            `${API_ROOT}/unsup_job`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        return response.data.data
}