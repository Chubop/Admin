import {combineReducers} from 'redux'

import { 
    authentication,
    resetPassword,
    saveProfile,
    IAPSelf
} from '../authentication'

import { 
    applicant,
    applicants
} from './applicant.reducer'

import { 
    candidate,
    candidates
} from './candidate.reducer'

import { 
    hiringManager,
    hiringManagers
} from './hiringManager.reducer'

import { 
    job,
    jobs
} from './job.reducers'

import {
    refresh
} from './refresh.reducer'

import { 
    unsupportedJob,
    unsupportedJobs
} from '../Job/reducer'

import {
    resumeAI
} from '../resumeAIStore/reducer'

import {
    botLogs
} from '../BotLogs/reducer'

export default combineReducers({
    authentication,
    saveProfile,
    IAPSelf,
    applicant,
    applicants,
    botLogs,
    candidate,
    candidates,
    hiringManager,
    hiringManagers,
    job,
    jobs,
    unsupportedJob,
    unsupportedJobs,
    refresh,
    resetPassword,
    resumeAI
})