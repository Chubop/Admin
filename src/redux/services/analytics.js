export function analyzeApplicants(applicants, data) {
    let scores = { eli: [], fit: [], total: [] }
    let daysSince = []
    let totalEli = 0
    let totalFit = 0
    let totalTotal = 0
    let acceptedNum = 0
    let numScored = 0
    for (let i = 0; i < applicants.length; i++) {
        let applicant = applicants[i]

        if (!isNaN(applicant.total)){
            numScored += 1
            scores.eli.push(applicant.skill)
            totalEli += applicant.skill
            scores.fit.push(applicant.will)
            totalFit += applicant.will
            scores.total.push(applicant.total)
            totalTotal += applicant.total
        }

        if (applicant.created) {
            let secondsSince = (Date.now() / 1000) - applicant.created[0]
            daysSince.push(Math.floor(secondsSince/(60*60*24)))
        }
        if (applicant.status === "Sent to Recruiter")
            acceptedNum += 1
    }

    data['numApplicants'] = applicants.length
    data['numScored'] = numScored

    data['avgEli'] = numScored > 0 ? totalEli/numScored : 0
    data['avgFit'] = numScored > 0 ? totalFit/numScored : 0
    data['avgTotal'] = numScored > 0 ? totalTotal/numScored : 0

    data['daysSince'] = daysSince

    // for charts
    data['scores'] = scores

    data['acceptanceRate'] = acceptedNum/applicants.length * 100

    return data
}

export function analyzeJobs(jobs, data) {
    let daysSince = []
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i]
        if (job.created) {
            let secondsSince = (Date.now() / 1000) - job.created
            daysSince.push(Math.floor(secondsSince/(60*60*24)))
        }
    }

    data['numJobs'] = jobs.length
    data['daysSince'] = daysSince
    return data
}