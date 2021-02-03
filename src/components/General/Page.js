import React from 'react'

// MUI
import { Grid, IconButton, makeStyles, Typography, } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons';

// Custom Components
import { LoadingSymbol } from './LoadingSymbol';

const useStyles = makeStyles((theme) => ({
    title: {
        color: "black",
        paddingBottom: theme.spacing(4)
    },
    link: {
        textDecoration: 'None',
        color: 'black'
    },
    error: {
        textAlign: "center",
        left: "50%"
    }
}));

export function Page(props) {
    const classes = useStyles();
    const { title, children, loading, error, onDeleteClick, onEditClick} = props

    return (
        <>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h3" className={classes.title}> {title} </Typography>
                </Grid>
                <Grid item>
                    {
                        (onEditClick !== undefined && !error & !loading) ?
                        <IconButton onClick={onEditClick}>
                            <Edit />
                        </IconButton>
                        :
                        <div/>
                    }
                    {
                        (onDeleteClick !== undefined && !error & !loading) ?
                        <IconButton onClick={onDeleteClick}>
                            <Delete />
                        </IconButton>
                        :
                        <div/>
                    }
                </Grid>
            </Grid>
            {
                error ?
                    <Typography variant="h3" className={classes.error}>Network Error</Typography>
                    :
                    loading ?
                        <LoadingSymbol />
                        :
                        children
            }
        </>
    )
}