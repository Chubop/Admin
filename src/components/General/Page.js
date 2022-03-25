import React from 'react'

// MUI
import { Grid, IconButton, makeStyles, Tooltip, Typography, } from '@material-ui/core'
import { Dashboard, Delete, Edit } from '@material-ui/icons';

// Custom Components
import { LoadingSymbol } from './LoadingSymbol';
import { colors } from '../../theme/colors';
import { Link } from 'react-router-dom';

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
    const { title, children, loading, error, onDeleteClick, onEditClick } = props

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <BreadCrumbs pageTitle={title} titles={props.breadCrumbs} />
                </Grid>
                <Grid item>
                    {
                        (onEditClick !== undefined && !error & !loading) ?
                            <IconButton onClick={onEditClick}>
                                <Edit />
                            </IconButton>
                            :
                            <div />
                    }
                    {
                        (onDeleteClick !== undefined && !error & !loading) ?
                            <Tooltip title={props.deleteTooltip || "Delete"}>
                                <IconButton onClick={onDeleteClick}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            :
                            <div />
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

function BreadCrumbs(props) {
    const { pageTitle, titles } = props;
    const classes = useStyles();

    if (pageTitle === "")
        return (<></>)

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item >
                <Link to="/dashboard" className={classes.link}>
                    <Grid container alignItems="center">
                        <Dashboard style={{ color: colors.greys.mediumGrey, marginRight: '4px' }} />
                        <Typography >
                            Home
                        </Typography>
                    </Grid>
                </Link>
            </Grid>
            {titles.map((title) => {
                if (typeof title === 'string') {
                    return (
                        <>
                            <Grid item>
                                <Typography>/</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ fontWeight: 600 }}> {title} </Typography>
                            </Grid>
                        </>
                    )
                }
                return (
                    <>
                        <Grid item>
                            <Typography>/</Typography>
                        </Grid>
                        <Grid item>
                            <Link to={title.link} className={classes.link}>
                                <Typography > {title.name} </Typography>
                            </Link>
                        </Grid>
                    </>
                )
            })}
        </Grid>

    )
}