import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
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

    // Get applicant details and load into initial inputs
    const applicantState = useSelector(state => state.applicant)
    const { applicant, loading, error } = applicantState
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        if (applicant) {
            setInputs(applicant)
        }
    }, [applicant])

    // Render
    return (
        <EditModal
            title={'Edit Applicant'}
            // redux action to dispatch when saving
            onSave={() => dispatch(applicantActions.updateApplicant(inputs))}

            // data
            initial={applicant}
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
