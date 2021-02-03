import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))


export function ActionButton(){
    const classes = useStyles()
    return(
        <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
        </Fab>
    )
}