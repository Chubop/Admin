import React, { useEffect, useState } from 'react'

// MUI
import {
    Slider,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Typography,
    IconButton,
    Popover,
} from '@material-ui/core'

// Custom
import { printFormat } from '../../functions'
import { QuestionScoresChart } from './QuestionScoresChart'
import { ZoomIn } from '@material-ui/icons'
import { Link } from 'react-router-dom'

export function QuestionsTable(props) {
    const { questions, stats, zeros, distribution, jid, common } = props

    // Get list of QIDs for mapping rows
    const [QIDs, setQIDS] = useState([])
    useEffect(() => {
        let qids = []
        for (const qid in questions) {
            qids.push(qid)
        }
        setQIDS(qids)
    }, [questions])

    const [zerosOpen, setZerosOpen] = useState({})
    const [anchorEls, setAnchorEls] = useState({})
    useEffect(() => {
        for (const qid in QIDs) {
            setZerosOpen({...zeros, [qid]: false})
            setAnchorEls({...anchorEls, [qid]: false})
        }
    }, [QIDs])

    if (!questions || !QIDs) 
        return <div/>
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography> Question </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography> Preferred Answer </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography> Weight </Typography>
                        </TableCell>
                        {
                            zeros &&
                            <TableCell align="right">
                                <Typography> Zeros </Typography>
                            </TableCell>
                        }
                        {
                            distribution &&
                            <TableCell align="center">
                                <Typography> Distribution </Typography>
                            </TableCell>
                        }
                        {
                            common &&
                            <TableCell align="center">
                                <Typography> Common Answers </Typography>
                            </TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        QIDs.map((qid) => {
                            let question = questions[qid]
                            let scores = stats.scoresPerQuestion[qid]
                            return (
                                <TableRow key={`question-table-${qid}`}>
                                    <TableCell>
                                        {question.question}
                                    </TableCell>
                                    <TableCell>
                                        {printFormat(question.pref_ans)}
                                    </TableCell>
                                    <TableCell>
                                        <Slider value={question.imp} style={{ width: '75px', padding: '0px' }} aria-labelledby="discrete-slider-custom" min={1} max={5} disabled />
                                    </TableCell>
                                    { zeros &&
                                        <TableCell align="right" style={{ padding: '0px' }}>
                                            {scores.zero.length}
                                            <IconButton disabled={scores.zero.length == 0}
                                                onClick={(event) => {
                                                    setZerosOpen({ ...zeros, [qid]: true })
                                                    setAnchorEls({ ...anchorEls, [qid]: event.currentTarget })
                                                }}>
                                                <ZoomIn />
                                            </IconButton>
                                            <ZerosPopover applicants={scores['zero']} qid={qid} jid={jid} open={zerosOpen[qid] || false} anchorEl={anchorEls[qid]}
                                                handleClose={() => {
                                                    setZerosOpen({ ...zeros, [qid]: false });
                                                    setAnchorEls({ ...anchorEls, [qid]: null })
                                                }}
                                            />
                                        </TableCell>
                                    }
                                    {distribution &&
                                        <TableCell style={{ padding: '0px' }}>
                                            <QuestionScoresChart data={scores.total} zoom />
                                        </TableCell>
                                    }
                                    {common &&
                                        <TableCell style={{ padding: '0px' }}>
                                            <Table>
                                                <TableBody>
                                                    {
                                                        scores.mostCommon.slice(0, 3).map((answer) => {
                                                            return (
                                                                <TableRow key={answer}> 
                                                                    <TableCell> {answer} </TableCell>
                                                                    <TableCell align='right'> {scores.answerFrequency[answer]} </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function ZerosPopover(props) {
    const { applicants, open, handleClose, jid, qid, anchorEl } = props

    return (
        <Popover
            id={`zeros-popover-${qid}`}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Table>
                <TableBody>
                    {
                        applicants.map((applicant) => {
                            return (
                                <TableRow key={`zero-popover-row-${qid}-${applicant.aid}`}>
                                    <TableCell>
                                        <Typography >
                                            <Link to={`/applications/${jid}/${applicant.aid}`}>
                                                {applicant.name}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography >
                                            {printFormat(applicant.answer)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Popover>
    )
}