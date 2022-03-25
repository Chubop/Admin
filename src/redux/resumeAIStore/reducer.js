import { resumeAIConstants } from "./constants";

const initialState = { }

export function resumeAI(state = initialState, action) {
    switch(action.type) {
        case resumeAIConstants.GET_CONVERSION_RATE_REQUEST:
            return {
                ...state,
                stats: {},
                loading: true,
            }
        case resumeAIConstants.GET_CONVERSION_RATE_SUCCESS:
            return {
                ...state,
                stats: action.data,
                loading: false,
            }
        case resumeAIConstants.GET_CONVERSION_RATE_FAILURE:
            return {
                ...state,
                stats: {},
                loading: false,
                error: action.error.message,
            }
        default:
            return state
    }
}