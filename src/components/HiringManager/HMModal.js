import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hmActions, jobActions } from '../../redux/actions';

// MUI
import {
    makeStyles,
    TextField,
} from '@material-ui/core';

// Custom components
import { EditModal } from '../General';

const useStyles = makeStyles((theme) => ({
}));

export function HMModal(props) {
    const dispatch = useDispatch();
    const { hmid } = props

    const [inputs, setInputs] = useState({})
    const isInRedux = (hiringManager) => {
        return (hiringManager && hmid && (hiringManager.hmid === hmid))
    }

    // Get all jobs for drop down
    const { jobs, loading: jobsLoading } = useSelector(state => state.jobs)
    useEffect(() => {
        // load in all jobs if needed
        if (!jobs && props.open)
            dispatch(jobActions.getAllJobs())
    }, [props.open])

    // Render
    return (
        <EditModal
            title={'Edit Hiring Manager'}
            // redux action to dispatch when saving
            onSave={() => dispatch(hmActions.updateHM(inputs))}
            // redux action to dispatch when loading
            dispatchGet={() => {dispatch(hmActions.getHM(hmid))}}
            // Redux state of data
            stateName='hiringManager' 
            // Function to check if this data is loaded in redux
            isInRedux={isInRedux}
            // data
            setInputs={setInputs} edited={inputs} 
            // Make sure edit modal knows to show loading symbol when jobs are loading
            loading={jobsLoading}

            handleClose={() => {props.handleClose(); setInputs(null)}}
            {...props}
        >
            <Content
                inputs={inputs}
                setInputs={setInputs}
            />
        </EditModal>
    );
}

function Content(props) {
    const classes = useStyles();
    const { inputs, setInputs } = props;

    const handleChange = (field) => (event) => {
        setInputs({ ...inputs, [field]: event.target.value })
    }

    if (!inputs)
        return <div />
    // TODO figure out whether we should be able to change the email address, and how that would work with auth
    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                value={inputs.firstName}
                onChange={handleChange('firstName')}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                value={inputs.lastName}
                onChange={handleChange('lastName')}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="department"
                label="Department"
                value={inputs.department}
                onChange={handleChange('department')}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="team"
                label="Team"
                value={inputs.team}
                onChange={handleChange('team')}
                fullWidth
            />
        </>
    )
}
