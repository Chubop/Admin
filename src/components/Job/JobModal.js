import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hmActions, jobActions } from '../../redux/actions';

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
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';

import {
    FiberManualRecord
} from '@material-ui/icons'

// Custom components
import { EditModal, ChipList } from '../General';

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
    const { jid } = props

    const [inputs, setInputs] = useState({})
    const isInRedux = (job) => {
        return (job && jid && job.jid === jid)
    }

    // Get all hiring managers for drop down
    const { hiringManagers, loading: hmsLoading } = useSelector(state => state.hiringManagers)
    useEffect(() => {
        // load in all hiring managers if needed
        if (!hiringManagers && props.open)
            dispatch(hmActions.getAllHMs())
    }, [props.open])

    // Render
    return (
        <EditModal
            title={'Edit Job'}
            // redux action to dispatch when saving
            onSave={() => dispatch(jobActions.updateJob(inputs))}
            // redux action to dispatch when loading
            dispatchGet={() => {dispatch(jobActions.getJob(jid))}}
            // Redux state of data
            stateName='job' 
            // Function to check if this data is loaded in redux
            isInRedux={isInRedux}
            // data
            setInputs={setInputs} edited={inputs} 
            // Make sure edit modal knows to show loading symbol when HMs are loading
            loading={hmsLoading}

            handleClose={() => {props.handleClose(); setInputs(null)}}
            {...props}
        >
            <Content
                inputs={inputs}
                setInputs={setInputs}
                hiringManagers={hiringManagers}
            />
        </EditModal>
    );
}

const Content = (props) => {
    const classes = useStyles();
    const { inputs, setInputs, hiringManagers } = props;

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

    if (!inputs || !hiringManagers)
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

            <TextField
                autoFocus
                margin="dense"
                id="Appointment Link"
                label="Appointment Link"
                value={inputs.appointment_link}
                onChange={handleChange('appointment_link')}
                fullWidth
            />

            <Select
                value={inputs.status || ''}
                onChange={handleChange('status')}
            >
                <MenuItem value={"open"}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecord
                            style={{ color: "#4caf50" }}
                            fontSize={"small"}
                        />
                        <div> Open </div>
                    </div>
                </MenuItem>
                <MenuItem value={"closed"}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecord 
                            color={"secondary"}
                            fontSize={"small"} 
                        />
                        <div> Closed </div>
                    </div>
                </MenuItem>
                <MenuItem value={"draft"}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecord 
                            color={"disabled"}
                            fontSize={"small"} 
                        />
                        <div> Draft </div>
                    </div>
                </MenuItem>
            </Select>

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
