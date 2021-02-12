import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { candidateActions } from '../../redux/actions';

// MUI
import {
    makeStyles,
    TextField,
} from '@material-ui/core';

// Custom components
import { deepCopy, EditModal } from '../General';

const useStyles = makeStyles((theme) => ({
}));

export function CandidateModal(props) {
    const dispatch = useDispatch();

    // Get candidate details and load into initial inputs
    const candidatesState = useSelector(state => state.candidate)
    const { candidate, loading, error } = candidatesState
    const [inputs, setInputs] = useState({})
    useEffect(() => {
        if (candidate) {
            let initial = deepCopy(candidate)
            setInputs(initial)
        }
    }, [candidate])

    // Render
    return (
        <EditModal
            title={'Edit Candidate'}
            // redux action to dispatch when saving
            onSave={() => dispatch(candidateActions.updateCandidate(inputs))}

            // data
            initial={candidate}
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
