import {combineReducers} from 'redux'

import { 
    authentication,
} from './auth.reducers'

import { 
    applicant,
    applicants
} from './applicant.reducer'

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
    hiringManager,
    hiringManagers,
    job,
    jobs,
    refresh
})