import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { applicantActions } from '../../redux/actions';

// MUI
import {
    makeStyles,
    TextField,
} from '@material-ui/core';

// Custom components
import { EditModal } from '../General';

const useStyles = makeStyles((theme) => ({
}));

export function ApplicantModal(props) {
    const dispatch = useDispatch();
    const { aid, jid } = props

    const [inputs, setInputs] = useState({})
    const isInRedux = (applicant) => {
        return (applicant && aid && (applicant.aid === aid) && (applicant.jid === jid))
    }

    // Render
    return (
        <EditModal
            title={'Edit Application'}
            // redux action to dispatch when saving
            onSave={() => dispatch(applicantActions.updateApplicant(inputs))}
            // redux action to dispatch when loading
            dispatchGet={() => {dispatch(applicantActions.getApplicant(aid, jid))}}
            // Redux state of data
            stateName='applicant' 
            // Function to check if this data is loaded in redux
            isInRedux={isInRedux}
            // data
            setInputs={setInputs} edited={inputs} 

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

    // TODO figure out whether we should be able to change the email address, and how that would work with candidates
    return (
        <> 
            {/* First Name */}
            <TextField
                autoFocus
                margin="dense"
                id="first_name"
                label="First Name"
                value={inputs.first_name}
                onChange={handleChange('first_name')}
                fullWidth
            />

            {/* Last Name */}
            <TextField
                autoFocus
                margin="dense"
                id="last_name"
                label="Last Name"
                value={inputs.last_name}
                onChange={handleChange('last_name')}
                fullWidth
            />

            {/* Current Stage */}
            {/* <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                value={inputs.last_name}
                onChange={handleChange('lastName')}
                fullWidth
            /> */}

            {/* Status */}
            {/* <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                value={inputs.last_name}
                onChange={handleChange('lastName')}
                fullWidth
            /> */}

            {/* Green House Integration ID */}
            {/* <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                value={inputs.last_name}
                onChange={handleChange('lastName')}
                fullWidth
            /> */}

            
            {/* <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    value={inputs.email}
                    onChange={handleChange('email')}
                    fullWidth
            /> */}

            
        </>
    )
}
