import axios from 'axios'
import { UseBackendRoot } from '../../settings/settings'

export const botLogService = {
    getAllBotLogs
}

async function getAllBotLogs(numDays){
    const API_ROOT = UseBackendRoot()
    let accessToken = JSON.parse(localStorage.getItem('accessToken'))
        let response = await axios.get(
            `${API_ROOT}/bot_logs/${numDays}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            }
        )

        return response.data.data
}