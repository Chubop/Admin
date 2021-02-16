import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { jobActions } from '../../redux/actions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import {
    Select,
    FormControl,
    MenuItem,
    Input,
    Slider,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';

// Custom components
import { ChipList } from '../General';
import { deepCopy, EditModal } from '../General';
import { printFormat } from '../../functions';
import { ArrowForward } from '@material-ui/icons';

const answerOptionsList = {
    // years of work experience
    '0': ["No experience", "Less than 1 Year", "1 - 2 Years", "2 - 4 Years", "4+ Years", "Any"],
    // type of work experience
    '1': ["Self-Employed", "Part Time", "Contractor", "Internship", "Full Time", "Multiple", "Any"],
    // tech stack 
    '2' : "",
    // level of education
    '4': ["None", "High School Diploma", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Ph.D"],
    // ui designer type
    '11': ["Visual Design", "Product Design (Mix of both)", "User Experience Design", "Any"],
    // web v mobile
    '12': ["Web Design", "Mobile Design"],
    // essential skill '3' : '', // TODO able to change this here and in the chatbot
    // has cs degree  '5' : [],
    // coding projects/hackathon '6' : [],
    // timely  '7' : [],
    // team or solo  '8' : [],
    // superpower  '9' : [],
    // has portfolio  '10' : [],
    // ui tools '13' : [],
}

const useStyles = makeStyles((theme) => ({
    chipTitle: {
        marginTop: '8px'
    },
    formControl: {
        minWidth: '1000px',
    },
}));

export function QuestionsModal(props) {
    const dispatch = useDispatch();

    // Get job details and load into inputs
    const jobState = useSelector(state => state.job)
    const { job, loading, error } = jobState
    const { question: questions, jid } = job
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        if (questions) {
            let initial = deepCopy(questions)
            setInputs(initial)
        }
    }, [questions])

    const [QIDs, setQIDS] = useState([])
    // Get list of QIDs for mapping rows
    useEffect(() => {
        let qids = []
        for (const qid in questions) {
            qids.push(qid)
        }
        setQIDS(qids)
    }, [questions])


    // Render
    return (
        <EditModal
            title={'Edit Question Preferences'}
            // redux action to dispatch when saving
            onSave={() => dispatch(jobActions.updateQuestions(inputs, jid))}

            // data
            initial={questions}
            edited={inputs}
            loading={loading}
            error={error}
            changeRender={(change) => {
                const [qid, initial, final] = change
                let prefChange = initial.pref_ans !== final.pref_ans
                let impChange = initial.imp !== final.imp
                return (
                    <>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" > {questions[qid].question} </Typography>
                                {prefChange &&
                                    <TableRow>
                                        <TableCell> <Typography variant="body2" > {printFormat(initial.pref_ans)} </Typography> </TableCell>
                                        <TableCell> <ArrowForward /> </TableCell>
                                        <TableCell> <Typography variant="body2" > {printFormat(final.pref_ans)} </Typography> </TableCell>
                                    </TableRow>
                                }
                                {impChange &&
                                    <TableRow>
                                        <TableCell>
                                            <Slider value={initial.imp} style={{ width: '75px' }} aria-labelledby="discrete-slider-custom" min={1} max={5}
                                                marks={[{ value: initial.imp, label: initial.imp }]}
                                            />
                                        </TableCell>
                                        <TableCell> <ArrowForward /> </TableCell>
                                        <TableCell>
                                            <Slider value={final.imp} style={{ width: '75px' }} aria-labelledby="discrete-slider-custom" min={1} max={5}
                                                marks={[{ value: final.imp, label: final.imp }]}
                                            />
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableCell>
                        </TableRow>
                    </>
                )
            }}
            {...props}
        >
            <Content
                QIDs={QIDs}
                inputs={inputs}
                setInputs={setInputs}
            />
        </EditModal>
    );
}

const Content = (props) => {
    const { inputs, setInputs, QIDs } = props;

    const handlePrefChange = (value, qid) => {
        let newInputs = { ...inputs, [qid]: { ...inputs[qid], pref_ans: value } }
        setInputs(newInputs)
    }

    const handleImpChange = (value, qid) => {
        let newInputs = { ...inputs, [qid]: { ...inputs[qid], imp: value } }
        setInputs(newInputs)
    }
    if (!inputs)
        return <div />
    return (
        <TableContainer>
            <Table> <TableBody>
                {QIDs.map((qid) => {
                    let question = inputs[qid]
                    let imp = question.imp
                    return (
                        <TableRow >
                            <TableCell style={{ width: '50%' }}> {question.question} </TableCell>
                            <TableCell>
                                <Slider
                                    // Slider is for question importance
                                    defaultValue={imp}
                                    onChangeCommitted={(e, value) => { handleImpChange(value, qid) }}
                                    style={{ width: '75px' }}
                                    aria-labelledby="discrete-slider-custom"
                                    valueLabelDisplay="auto"
                                    marks={[{ value: 1, label: 'Less' }, { value: 5, label: 'More' }]}
                                    step={1} min={1} max={5}
                                />
                            </TableCell>
                            <TableCell>
                                <EditPrefAns question={question} handleChange={handlePrefChange} />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody> </Table>
        </TableContainer>
    )
}

const EditPrefAns = (props) => {
    const { question, handleChange } = props

    let qid = question.qid
    let prefAns = question.pref_ans
    let options = answerOptionsList[qid]

    if (options) {
        if (Array.isArray(prefAns))
            return (<ChipList labels={options} selected={prefAns} setSelected={(value) => handleChange(value, qid)} />)
        else
            return (
                <FormControl>
                    <Select
                        input={<Input />}
                        value={prefAns || " "}
                        onChange={(e) => handleChange(e.target.value, qid)}
                    >
                        {options.map((option) => (
                            <MenuItem value={option} key={option}> {option} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
    }
    // if (options === '') {
    //     return (
    //         <TextField
    //             autoFocus
    //             margin="dense"
    //             id={qid}
    //             value={prefAns}
    //             onChange={(e,value) => handleChange(value, qid)}
    //             fullWidth
    //         />
    //     )
    // }

    return (<div>N/A</div>)
}