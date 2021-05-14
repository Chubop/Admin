import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hmActions, jobActions } from '../../redux/actions';

// MUI
import {
    Checkbox,
    DialogContentText,
    makeStyles,
    TextField,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Custom components
import { EditModal } from '../General';
import { SearchObjectSelect } from '../General/Modals/SearchObjectSelect';

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
                jobs={jobs}
            />
        </EditModal>
    );
}

function Content(props) {
    const { inputs, setInputs, jobs } = props;

    const handleCheckChange = (field) => (event) => {
        setInputs({ ...inputs, [field]: event.target.checked })
    }

    const handleChange = (field) => (event) => {

        if(field === 'resetPassword'){
            setInputs({ ...inputs, [field]: event.target.checked })
        }else{
            setInputs({ ...inputs, [field]: event.target.value })
        }
    }

    if (!inputs || !jobs ){
        return <div />
    }
        
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
            
            <FormGroup row> 
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={inputs.resetPassword || false}
                            color="primary"
                            onChange={handleCheckChange('resetPassword')}
                        />
                    }
                    label="Reset Password"
                
                />
            </FormGroup>

            <FormGroup row> 
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={inputs.superuser || false}
                            color="primary"
                            onChange={handleCheckChange('superuser')}
                        />
                    }
                    label="Super User"
                
                />
            </FormGroup>
            

            {
                inputs.accessibleJobs &&
                <>
                    <DialogContentText />
                    <DialogContentText> Accessible Jobs </DialogContentText>
                    <SearchObjectSelect
                        onChange={(newValue) => setInputs({ ...inputs, ['accessibleJobs']: newValue })}

                        // Given an array of keys (JIDs) that are currently chosen
                        selectedIDs={inputs.accessibleJobs}
                        idKey='jid'
                        nameKey='titles'

                        searchList={jobs}
                        optionColumns={[
                            { label: 'Title', key: 'titles' },
                            { label: 'Type', key: 'type' },
                            { label: 'Hiring Manager', key: 'hm' },
                            { label: 'Unit', key: 'unit' },
                            { label: 'JID', key: 'jid' },
                        ]}
                        noneAddedMsg='No Jobs Chosen'

                        searchMessage='Search Jobs...'
                        searchKeys={['titles', 'type', 'hm', 'unit', 'jid']}
                    />
                </>
            }
        </>
    )
}
