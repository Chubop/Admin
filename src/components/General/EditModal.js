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
        width: '100%'
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
            let init = deepCopy(initialData)
            setChanges([])
            setInitial(init)
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
        if (diff.length > 0)
            setChanges(diff)
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
    const { loading, error, changes, confirmOpen, changeRender } = props
    const classes = useStyles()

    if (error)
        return <p>Network Error</p>
    if (loading)
        return <CircularProgress style={{ textAlign: "center" }} />

    // If user has opened the confirm panel
    if (confirmOpen) {
        // Print each change found in EditModal's useEffect
        const printChange = (change) => {
            let initial = change[1]
            let final = change[2]
            if (changeRender != undefined) {
                return changeRender(change)
            }
            return (
                <Typography className={classes.typography}>
                    {` ${change[0]}: "${printFormat(initial)}" ==> "${printFormat(final)}"`}
                </Typography>
            )
        }
        return <> { changes.map((change) => (printChange(change)))} </>
    }

    return <> {props.children} </>
}

function checkEqual(a, b) {
    if (Array.isArray(a)) {
        return (printFormat(a) === printFormat(b))
    }
    if (isObject(a)) {
        for (const field in a) {
            if (!checkEqual(a[field], b[field]))
                return false
        }
        return true
    }
    return (a === b)
}

function isObject(obj) {
    if (obj === null) {return false;}
    return ((typeof obj === 'object') && (typeof obj !== 'array'))
}

export function deepCopy(data) {
    if (Array.isArray(data)) {
        let init = []
        for (let i = 0; i < data.length; i++)
            init.push(deepCopy(data[i]))
        return init
    }
    if (isObject(data)) {
        let init = {}
        for (const field in data)
            init[field] = deepCopy(data[field])
        return init
    }
    return data
}