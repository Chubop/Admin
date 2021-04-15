export function analyzeApplicants(applicants, data, {getMilestones, getBadNames, analyzeAnswers}) {
    let scores = { eli: [], fit: [], total: [] }
    let daysSince = []
    let totalEli = 0
    let totalFit = 0
    let totalTotal = 0
    let numAccepted = 0
    let numRejected = 0
    let numWaiting = 0
    let numScored = 0
    let scoresPerQuestion = {}
    // Bad Names
    let badNames = []
    let noGreenhouse = []
    // Milestones
    let lastActionTime = null
    let firstApplicationTime = null
    let firstRejectionTime = null
    let firstApprovalTime = null

    // Loop through all applicants
    for (let i = 0; i < applicants.length; i++) {
        let applicant = applicants[i]

        if (getBadNames) {
            // Check applicant name for alerts
            if (applicant.name) {
                let name = applicant.name
                // If applicant likely has an incorrectly entered name
                if (!/^[a-zA-Z \-.]+$/.test(name) || name == 'Marlon')
                    badNames.push(applicant) // alert
                if (!applicant.greenhouse_cid)
                    noGreenhouse.push(applicant) // alert
            }
            else {
                if (applicant.first_name && applicant.last_name) {
                    applicant['name'] = applicant.first_name + " " + applicant.last_name
                }
            }
        }

        // If applicant is screened, analyze scores
        if (!isNaN(applicant.total)){
            // Add to number of screened/scored applicants
            numScored += 1

            // For score distribution charts
            scores.eli.push(applicant.skill)
            scores.fit.push(applicant.will)
            scores.total.push(applicant.total)
            
            // For average scores
            totalEli += applicant.skill
            totalFit += applicant.will
            totalTotal += applicant.total
        
            if (analyzeAnswers) {
                // For analyzing each question
                for (const qid in applicant['scoredAnswers']) {
                    let answer = applicant['scoredAnswers'][qid]
                    if (!scoresPerQuestion[qid])
                        scoresPerQuestion[qid] = { total: [], eli: [], fit: [], zero: [], answer: [] }
                    // For question score distribution charts
                    scoresPerQuestion[qid]['total'].push(answer.total)
                    scoresPerQuestion[qid]['eli'].push(answer.skill)
                    scoresPerQuestion[qid]['fit'].push(answer.will)
                    // For 'zero' alert
                    if (answer.total === 0)
                        scoresPerQuestion[qid]['zero'].push({ aid: applicant.aid, name: applicant.name, answer: answer.answer })
                    scoresPerQuestion[qid]['answer'].push(answer.answer)
                }
            }
        }

        if (getMilestones) {
            // Check applicant logs for milestones
            if (applicant.actionLog && applicant.actionLog.length > 0) {
                const { actionLog } = applicant
                for (let j = 0; j < actionLog.length; j++) {
                    let entry = actionLog[j]

                    if (entry.action == 'advanced') {
                        if (!firstApprovalTime || entry.time < firstApprovalTime)
                            firstApprovalTime = entry.time
                    }
                    else if (entry.action == 'rejected') {
                        if (!firstRejectionTime || entry.time < firstRejectionTime)
                            firstRejectionTime = entry.time
                    }
                }
                let lastAction = actionLog[actionLog.length - 1]
                if (!lastActionTime || lastAction.time > lastActionTime)
                    lastActionTime = lastAction.time
            }
        }
        
        // For recent applicants
        if (applicant.created) {
            let created = applicant.created
            if (created[0]) {
                created = created[0]
            }
            if (!firstApplicationTime || created < firstApplicationTime ) {
                firstApplicationTime = created
            }
            let seconds = (Date.now() / 1000) - created
            let days = Math.floor(seconds/(60*60*24))
            daysSince.push(days)
        }

        // For acceptance rate
        if (applicant.status === "Sent to Recruiter")
            numAccepted += 1
        else if (applicant.status === "Rejected")
            numRejected += 1
        else if (applicant.status === 'Applied')
            numWaiting += 1
    }

    for (const qid in scoresPerQuestion) {
        [scoresPerQuestion[qid]['answerFrequency'], scoresPerQuestion[qid]['mostCommon']] = mostCommon(scoresPerQuestion[qid]['answer'])
    }

    // Number of applicants in different stages
    data['numApplicants'] = applicants.length
    data['numScored'] = numScored
    data['rejected'] = numRejected
    data['accepted'] = numAccepted
    data['waiting'] = numWaiting

    // Average Scores
    data['avgEli'] = numScored > 0 ? totalEli/numScored : 0
    data['avgFit'] = numScored > 0 ? totalFit/numScored : 0
    data['avgTotal'] = numScored > 0 ? totalTotal/numScored : 0

    // Data for charts
    data['scores'] = scores
    data['daysSince'] = daysSince
    data['scoresPerQuestion'] = scoresPerQuestion

    // Data for alerts
    data['alerts'] = {
        badNames: badNames,
        noGreenhouse: noGreenhouse,
    }

    // Milestones
    data['firstScreened'] = firstApplicationTime
    data['firstRejected'] = firstRejectionTime
    data['firstApproved'] = firstApprovalTime
    data['lastAction'] = lastActionTime

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

function mostCommon(arr) {
    if (arr.length == 0)
        return null
    let numEach = {}
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i]
        if (typeof numEach[value] == 'undefined') 
            numEach[value] = 0
        numEach[value]++
    }
    arr = Object.keys(numEach)
    arr.sort((a, b) => {
        if (numEach[a] > numEach[b])
            return -1
        if (numEach[a] < numEach[b])
            return 1
        return 0
    })

    return [numEach, arr]
}