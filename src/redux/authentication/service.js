import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'

export const authService = {
    login,
    logout,
    register,
    resetPassword,
    saveProfile,
    IAPSelf,
    IAPBackendLogin,
}

async function login(credentials){
    /* 
        {
            "access_token": ${access_token}
            "profile": ${profile}
        }
    */

    const API_ROOT = UseBackendRoot()

    try{
        let response = await axios.post(`${API_ROOT}/login`, credentials)
        let data = response.data

        localStorage.setItem('profile', JSON.stringify(data['profile']))
        localStorage.setItem('accessToken', JSON.stringify(data['access_token']))

        return data['profile']
    }catch(error){
        throw error
    }
}

function logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('profile')
    localStorage.removeItem('preferences')
}

async function register(profile){
    const API_ROOT = UseBackendRoot()

    try{
        let response = await axios.post(
            `${API_ROOT}/new_signup`,
            profile,
            {
                url: `${API_ROOT}/new_signup`,
                headers: {
                    'Access-Control-Allow-Credentials': true
                },
                withCredentials: true,
                crossorigin: true,
            }
        )
        let data = response.data
        profile = data['profile']
        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('accessToken', JSON.stringify(data['access_token']))

        return profile
    }catch(error){
        throw error
    }
}

async function resetPassword(credentials){
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
    
    try{
        let response = await axios.post(
            `${API_ROOT}/reset_password`,
            {
                password: credentials.password
            },
            {   
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        ) 

        let data = response.data
        let profile = data['profile']

        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('accessToken', JSON.stringify(data['access_token']))

        return profile

    }catch(error){
        throw error 
    }
}

async function saveProfile(attribute){
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))

    try {
        await axios.put(
            `${API_ROOT}/profile`,
            attribute,
            {   
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        return

    }catch(error){
        throw error
    }

}

async function IAPSelf(){
    let res = await(axios.get('/'))
    let token = res.headers["x-goog-iap-jwt-assertion"]
    // Send Backend a request to check header    
    return IAPBackendLogin(token)
}

async function IAPBackendLogin(token){
    /*
        Logging into the backend with IAP credentials

    */

    const API_ROOT = UseBackendRoot()

    try{
        let response = await axios.post(`${API_ROOT}/login`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        let data = response.data

        localStorage.setItem('profile', JSON.stringify(data['profile']))
        localStorage.setItem('accessToken', JSON.stringify(data['access_token']))

        return data['profile']
    }catch(error){
        throw error
    }
}