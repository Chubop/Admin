import axios from 'axios'
import { API_ROOT } from '../../settings/settings'

export const refreshService = {
    refresh,
}

async function refresh(){
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))

    try {
        let response = await axios.post(
            `${API_ROOT}/refresh`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}