import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'

export const authService = {
    login,
    logout,
    register,
    resetPassword,
}

async function login(credentials){
    const API_ROOT = UseBackendRoot()
    try{
        let response = await axios.post(`${API_ROOT}/login`, credentials)
        let data = response.data
        localStorage.setItem('profile', JSON.stringify(data['profile']))
        localStorage.setItem('accessToken', JSON.stringify(data['access_token']))
        return data['profile']
    }
    catch(error){
        throw error
    }
}

function logout(){
    localStorage.removeItem('profile')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('preferences')
}

async function register(profile){
    const API_ROOT = UseBackendRoot()
    try{
        let response = await axios.post(
            `${API_ROOT}/signup`,
            profile,
            {
                url: `${API_ROOT}/signup`,
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
    }
    catch(error){
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

