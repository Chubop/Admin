import axios from 'axios'
import { API_ROOT } from '../../settings/settings'

import { analyzeApplicants, analyzeJobs } from './index'

export const jobService = {
    createJob,
    getJob,
    getAllJobs,
    deleteJob,
    updateJob,
    rescoreJob,
    updateQuestions,
}

async function createJob(job){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.post(
        `${API_ROOT}/job`,
        job,
        {   
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )

    return response.data
}

async function getJob(id){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        // Query for a single job
        let response = await axios.get(
            `${API_ROOT}/job/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        let job = response.data
        let stats = {}
        if (job.applicants){
            // Sort applicants by creation time
            job.applicants = job.applicants.sort((a, b) => {
                if (a.created && b.created){
                    if (a.created[0] < b.created[0])
                        return 1
                    if (a.created[0] > b.created[0])
                        return -1
                }
                else if (a.created &&  !b.created) {
                    // if comparing applicant that has used bot to one that has not
                    return -1
                }
                return 0
            })
            stats = analyzeApplicants(job.applicants, stats)
        }
        let data = {
            job: job,
            stats: stats
        }
        return data
}

async function getAllJobs(){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    // Query for all jobs
    let response = await axios.get(
        `${API_ROOT}/job`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    let jobs = response.data.data
    jobs = jobs.sort((a, b) => {
        if (a.created && b.created) {
            if (a.created < b.created)
                return 1
            if (a.created > b.created)
                return -1
        }
        return 0
    })
    let stats = {}
    if (jobs) {
        stats = analyzeJobs(jobs, stats)
    }
    let data = {
        jobs: jobs,
        stats: stats
    }
    return data
}

async function deleteJob(jid){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.delete(
        `${API_ROOT}/job/${jid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    return response.data
}

async function updateJob(job){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    if (job.jid) {
        let response = await axios.put(
            `${API_ROOT}/job/${job.jid}`,
            job,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )
        job = response.data
        let stats = {}
        if (job.applicants) {
            stats = analyzeApplicants(job.applicants, stats)
        }
        let data = {
            job: job,
            stats: stats
        }
        return data
    }
}

async function rescoreJob(jid){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.post(
        `${API_ROOT}/rescore/${jid}`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    return response.data
}

async function updateQuestions(questions, jid){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    let response = await axios.put(
        `${API_ROOT}/question`,
        { questions: questions, jid: jid, },
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }
    )
    return response.data
}