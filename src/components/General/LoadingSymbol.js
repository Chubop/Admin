import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loading: {
        textAlign: "center",
        position: "fixed",
        top: "50%",
        left: "50%"
    },
}));

export function LoadingSymbol() {
    const classes = useStyles()
    return (
        <CircularProgress className={classes.loading}/>
    )
}