import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { jobActions } from '../../redux/actions';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    DialogContentText,
    Select,
    FormControl,
    MenuItem,
    Input,
    InputLabel,
} from '@material-ui/core';

// Custom components
import { ChipList } from './';
import { EditModal } from '../General';

const chipUnit = ['GPT', 'GRO', 'G&A']
const chipLocation = ['NA East', 'NA West', 'NA Central', 'All NA', 'Germany', 'Israel', 'APAC']
// const chipPriority = ['High', 'Medium', 'Low']

const useStyles = makeStyles((theme) => ({
    chipTitle: {
        marginTop: '8px'
    },
    formControl: {
        minWidth: 240,
    },
}));

export function JobModal(props) {
    const dispatch = useDispatch();

    // Get job details and load into inputs
    const jobState = useSelector(state => state.job)
    const { job, loading, error } = jobState
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        if (job) {
            setInputs(job)
        }
    }, [job])

    // Render
    return (
        <EditModal
            title={'Edit Job'}
            // redux action to dispatch when saving
            onSave={() => dispatch(jobActions.updateJob(inputs))}

            // data
            initial={job}
            edited={inputs}
            loading={loading}
            error={error}
            {...props}
        >
            <Content
                inputs={inputs}
                setInputs={setInputs}
            />
        </EditModal>
    );
}

const Content = (props) => {
    const classes = useStyles();
    const { inputs, setInputs } = props;

    // Get all hiring managers for drop down
    const hmState = useSelector(state => state.hiringManagers)
    const { hiringManagers } = hmState

    const HiringMangerDropDown = () => {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel>Hiring Manager</InputLabel>
                { hiringManagers &&
                    <Select
                        input={<Input />}
                        value={inputs.hmid ? inputs.hmid : " "}
                        onChange={handleChange('hmid')}
                    >
                        {hiringManagers.map((hm) => (
                            <MenuItem value={hm.hmid} name={hm.firstName + ' ' + hm.lastName} key={hm.hmid}>
                                {hm.firstName + ' ' + hm.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                }
            </FormControl>
        )
    }

    const handleChange = (field) => (event) => {
        setInputs({ ...inputs, [field]: event.target.value })
    }

    // When user clicks on a chip, the component toggles whether that chip is in the
    // selected array/value, and we use that new array/value to set the corresponding 
    // field in the inputs state
    const handleChipChange = (field) => (newSelection) => {
        setInputs({ ...inputs, [field]: newSelection })
    }

    if (!inputs)
        return <div/>
    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                id="titles"
                label="Title"
                value={inputs.titles}
                onChange={handleChange('titles')}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="type"
                label="Type"
                value={inputs.type}
                onChange={handleChange('type')}
                fullWidth
            />

            <DialogContentText className={classes.chipTitle}>
                Units
            </DialogContentText>
            <ChipList labels={chipUnit} selected={inputs.unit} setSelected={handleChipChange('unit')} />

            <TextField
                autoFocus
                margin="dense"
                id="team"
                label="Team"
                value={inputs.team}
                onChange={handleChange('team')}
                fullWidth
            />

            <HiringMangerDropDown />

            <DialogContentText className={classes.chipTitle}>
                Location
            </DialogContentText>
            <ChipList labels={chipLocation} selected={inputs.location} setSelected={handleChipChange('location')} />

            <TextField
                autoFocus
                margin="dense"
                id="botID"
                label="Bot ID"
                value={inputs.botID}
                onChange={handleChange('botID')}
                fullWidth
            />

            {/* TODO Add Priority */}

        </>
    )
}
