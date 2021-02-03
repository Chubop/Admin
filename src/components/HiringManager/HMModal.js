import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hmActions } from '../../redux/actions';

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

    // Get hiring manager details and load into inputs
    const hmState = useSelector(state => state.hiringManager)
    const { hiringManager, loading, error } = hmState
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        if (hiringManager) {
            setInputs(hiringManager)
        }
    }, [hiringManager])

    // Render
    return (
        <EditModal
            title={'Edit Hiring Manager'}
            // redux action to dispatch when saving
            onSave={() => dispatch(hmActions.updateHM(inputs))}

            // data
            initial={hiringManager}
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
