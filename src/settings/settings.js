export const DEBUG = true
export const DEV_ENV = 'http://localhost:5000/admin'
export const STAGING_ENV = 'https://marlon-staging-irfrsqnwrq-uc.a.run.app/admin'
export const PRODUCTION_ENV = 'https://marlonmongo-irfrsqnwrq-uc.a.run.app/admin'
const current_env = process.env.REACT_ENV
export function UseBackendRoot(){
    switch(current_env){
        case 'development':
            return DEV_ENV
        case 'staging':
            return STAGING_ENV
        case 'production':
            return PRODUCTION_ENV
        default: 
            return PRODUCTION_ENV
    }
}