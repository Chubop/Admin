import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    }
}));


export function NotFound() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>404</h1>
            <h3>Page not found</h3>
        </div>
    )
}