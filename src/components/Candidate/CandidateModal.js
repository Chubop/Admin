import React, { useState } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { candidateActions } from '../../redux/actions';

// MUI
import {
    makeStyles,
    TextField,
} from '@material-ui/core';

// Custom components
import { EditModal } from '../General';

const useStyles = makeStyles((theme) => ({
}));

export function CandidateModal(props) {
    const dispatch = useDispatch();
    const { cid } = props

    const [inputs, setInputs] = useState({})

    const isInRedux = (candidate) => {
        return (candidate && cid && (candidate.cid === cid))
    }

    // Render
    return (
        <EditModal
            title={'Edit Candidate'}
            // redux action to dispatch when saving
            onSave={() => dispatch(candidateActions.updateCandidate(inputs))}
            // redux action to dispatch when loading
            dispatchGet={() => {dispatch(candidateActions.getCandidate(cid))}}
            // Redux state of data
            stateName='candidate' 
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
                id="greenhouse_cid"
                label="Greenhouse CID"
                value={inputs.greenhouse_cid}
                onChange={handleChange('greenhouse_cid')}
                fullWidth
            />
        </>
    )
}
