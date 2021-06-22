export const API_ROOT = 'http://localhost:5000/admin'
// export const API_ROOT = 'https://todo-irfrsqnwrq-uc.a.run.app/admin'
export const MONGO_ROOT = 'https://marlonmongo-irfrsqnwrq-uc.a.run.app/admin'

export function UseBackendRoot(){
    let useMongo = JSON.parse(localStorage.getItem('useMongo'))
    if(useMongo){
        return MONGO_ROOT
    }else{
        return API_ROOT
    }
}