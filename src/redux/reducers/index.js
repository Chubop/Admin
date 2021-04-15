import {combineReducers} from 'redux'

import { 
    authentication,
    resetPassword,
} from './auth.reducers'

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

export default combineReducers({
    authentication,
    applicant,
    applicants,
    candidate,
    candidates,
    hiringManager,
    hiringManagers,
    job,
    jobs,
    refresh,
    resetPassword,
})