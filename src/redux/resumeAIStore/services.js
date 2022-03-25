import axios from 'axios'
import { ANALYTICS_ROOT } from '../../settings/settings'

export const resumeAIService = {
    getConversionRate
}

async function getConversionRate(days) {
    let response = await axios.get(
        `${ANALYTICS_ROOT}/conversion_rate/${days}`
    )

    return response.data
}