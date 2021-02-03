import axios from 'axios'
import { API_ROOT } from '../../settings/settings'

export const authService = {
    login,
    logout,
    register
}

async function login(credentials){
    try{
        let response = await axios.post(`${API_ROOT}/login`, credentials)
        let profile = response.data
        localStorage.setItem('profile', JSON.stringify(profile['profile']))
        localStorage.setItem('accessToken', JSON.stringify(profile['access_token']))
        return profile
    }
    catch(error){
        throw error
    }
}

function logout(){
    localStorage.removeItem('profile')
}

async function register(profile){
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
        localStorage.setItem('profile', JSON.stringify(profile['profile']))
        localStorage.setItem('accessToken', JSON.stringify(profile['access_token']))
        return profile
    }
    catch(error){
        throw error
    }
}
