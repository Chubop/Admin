import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import React from 'react'

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
}));

export function DeleteConfirmation(props) {
    const classes = useStyles()

    const handleConfirm = () => {
        props.handleClose()
        props.handleDelete()
    }

    const ActionButtons = () => {
        return (
            <DialogActions className={classes.actionButtons}>
                <Button onClick={props.handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Delete
                </Button>
            </DialogActions>
        )
    }

    return(
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
            <DialogTitle id="form-dialog-title" className={classes.title}>Are you sure you want to delete this?</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <ActionButtons/>
        </Dialog>
    )
}