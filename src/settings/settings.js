export const DEBUG = true
export const DEV_ENV = 'http://localhost:5004/admin'
export const STAGING_ENV = 'https://marlon-staging-irfrsqnwrq-uc.a.run.app/admin'
export const PRODUCTION_ENV = 'https://marlonmongo-irfrsqnwrq-uc.a.run.app/admin'
export const current_env = process.env.REACT_APP_ENV

const ENDPOINTS = {
    "API_ROOT": "",
    "ANALYTICS_ROOT": "",
}

switch(current_env) {
    case 'development':
        ENDPOINTS['API_ROOT'] = "http://localhost:5004/admin"
        ENDPOINTS['ANALYTICS_ROOT'] = "http://localhost:5003"
        break
    case 'staging':
        ENDPOINTS['API_ROOT'] = "https://marlon-staging-irfrsqnwrq-uc.a.run.app/admin"
        ENDPOINTS['ANALYTICS_ROOT'] = "https://resumeaistorest-b2fvwpxmrq-uc.a.run.app"
        break
    case 'production':
    default: 
        ENDPOINTS['API_ROOT'] = "https://marlonmongo-irfrsqnwrq-uc.a.run.app/admin"
        ENDPOINTS['ANALYTICS_ROOT'] = "https://resumeaistore-b2fvwpxmrq-uc.a.run.app"
}

export function UseBackendRoot(){
    switch(current_env){
        case 'development':
            ENDPOINTS['ANALYTICS_ROOT'] = "https://resumeaistorest-b2fvwpxmrq-uc.a.run.app"
            return DEV_ENV
        case 'staging':
            ENDPOINTS['ANALYTICS_ROOT'] = "https://resumeaistorest-b2fvwpxmrq-uc.a.run.app"
            return STAGING_ENV
        case 'production':
        default: 
            ENDPOINTS['ANALYTICS_ROOT'] = "https://resumeaistore-b2fvwpxmrq-uc.a.run.app"
            return PRODUCTION_ENV
    }
}

export const API_ROOT = ENDPOINTS['API_ROOT']
export const ANALYTICS_ROOT = ENDPOINTS['ANALYTICS_ROOT']