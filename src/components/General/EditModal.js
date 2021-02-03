import React, { useEffect, useState } from 'react';

// MUI
import {
    makeStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography,
} from '@material-ui/core';

// Custom
import {printFormat} from '../../functions'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    backDrop: {
        background: 'rgba(0,0,0,0.2)',
    },
    typography: {
        padding: theme.spacing(2),
    },
    actionButtons: {
        justifyContent: 'space-between'
    },
    title: {
        padding: theme.spacing(2, 2, 0)
    },
    dialogContent: {
        padding: theme.spacing(0, 2),
        minWidth: 375
    },
    loadingContent: { 
        display: 'flex', 
        justifyContent: 'center'
    }
}));

export function EditModal(props) {
    const classes = useStyles();

    const { title, initial: initialData, loading, error, edited } = props

    // States
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [changes, setChanges] = useState([])
    const [initial, setInitial] = useState({})

    // Get data and load into initial
    useEffect(() => {
        if (initialData) {
            // deep copy
            for (const field in initialData) {
                if (Array.isArray(initialData[field])) {
                    let array = []
                    for (let i = 0; i < initialData[field].length; i++) {
                        array.push(initialData[field][i])
                    }
                    initial[field] = array
                }
                else {
                    initial[field] = initialData[field]
                }
            }
            setChanges([])
            setInitial(initial)
        }
    }, [initialData])

    // Check if there are differences
    useEffect(() => {
        let diff = []
        // Compare initial data with edited data
        for (const field in initial) {
            if (!checkEqual(initial[field], edited[field]))
                diff.push([field, initial[field], edited[field]])
        }
        // If there are differences, open confirmation popup
        if (diff.length > 0) {
            setChanges(diff)
        }
    }, [edited])

    // Open confirm modal that shows changes
    const handleOkay = () => {
        setConfirmOpen(true)
    }

    // Edit modal closed
    const handleClose = () => {
        setConfirmOpen(false)
        props.handleClose()
    }

    // Called when user confirms changes
    const handleConfirm = () => {
        props.onSave()
        setConfirmOpen(false)
        props.handleClose()
    }

    // Confirmation popup cancelled
    const handleCancel = () => {
        setConfirmOpen(false)
    }

    const ActionButtons = () => {
        if (!confirmOpen) {
            // First screen
            return (
                <DialogActions className={classes.actionButtons}>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOkay} color="primary"
                        disabled={changes.length > 0 ? false : true}
                    >
                        Okay
                        </Button>
                </DialogActions>
            )
        }
        else {
            // Confirm Screen
            return (
                <DialogActions className={classes.actionButtons}>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Save
                    </Button>
                </DialogActions>
            )
        }
    }

    let isLoading = loading || !initialData

    return (
        <Dialog
            open={props.open} onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            scroll={'paper'}
            BackdropProps={{
                classes: {
                    root: classes.backDrop
                }
            }}
        >
            <DialogTitle id="form-dialog-title" className={classes.title}>{!confirmOpen ? title : "Save Changes?"}</DialogTitle>
            <DialogContent className={classes.dialogContent && isLoading && classes.loadingContent}>
                <Content {...props} changes={changes} confirmOpen={confirmOpen} loading={isLoading}/>
            </DialogContent>
            <ActionButtons/>
        </Dialog>
    );
}

const Content = (props) => {
    const { loading, error, changes, confirmOpen } = props
    const classes = useStyles()

    if (error)
        return <p>Network Error</p>
    if (loading)
        return <CircularProgress style={{ textAlign: "center" }} />
    // If user has opened the confirm panel
    if (confirmOpen)
        return (
            <>
                {
                    changes.map((change) => (
                        <Typography className={classes.typography}>
                            {` ${change[0]}: "${printFormat(change[1])}" ==> "${printFormat(change[2])}"`}
                        </Typography>
                    ))
                }
            </>
        )
    return <> {props.children} </>
}

function checkEqual(a, b) {
    if (Array.isArray(a)) {
        if (printFormat(a) === printFormat(b)) return true;
        return false
    }
    return (a === b)
}
