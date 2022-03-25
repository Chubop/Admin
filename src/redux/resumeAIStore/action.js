import { checkAuthError } from "../ErrorHandling/auth"
import { resumeAIConstants } from "./constants"
import { resumeAIService } from "./services"

export const resumeAIActions = {
    getConversionRate,
}

function getConversionRate(days) {
    return dispatch => {
        dispatch(request())

        resumeAIService.getConversionRate(days).then(
            stats => {
                dispatch(success(stats))
            }
        ).catch(
            error => {
                dispatch(failure(error))
                // TODO add authentication in skills ai backend
                // checkAuthError(dispatch, error)
            }
        )

    }

    function request() { return {type: resumeAIConstants.GET_CONVERSION_RATE_REQUEST }}
    function success(data) { return {type: resumeAIConstants.GET_CONVERSION_RATE_SUCCESS, data }}
    function failure(error) { return {type: resumeAIConstants.GET_CONVERSION_RATE_FAILURE, error }}
}