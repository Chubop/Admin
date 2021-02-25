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
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                value={inputs.name}
                onChange={handleChange('name')}
                fullWidth
            />


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
