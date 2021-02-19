import React from 'react'
import { Link } from 'react-router-dom';

// MUI
import { IconButton, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, CardHeader, CardContent, Card, makeStyles, Grid } from '@material-ui/core'
import { Flag, ZoomIn } from '@material-ui/icons';
import { printFormat } from '../../functions';
import { ApplicantTable } from '../Applicant';

const tabColor = '#1769aa'
const useStyles = makeStyles((theme) => ({
    cardHeader: {
        background: tabColor,
        color: 'white'
    },
}));

export function Alerts(props) {
    const { alerts } = props
    const classes = useStyles()

    if (!alerts)
        return <div/>
    return (
        <Grid container>
            {alerts.badNames &&
                <Grid item xs={12}>
                    <CardHeader className={classes.cardHeader} title={<>Invalid Names <Flag style={{ color: 'red' }} /></>} />
                    <ApplicantTable data={alerts.badNames} />
                </Grid>
            }
            {alerts.noGreenhouse &&
                <Grid item xs={12}>
                    <CardHeader className={classes.cardHeader} title={<>Not in Greenhouse <Flag style={{ color: 'red' }} /></>} />
                    <ApplicantTable data={alerts.noGreenhouse} />
                </Grid>
            }
        </Grid>
    )
}

function SimpleAppsTable(props) {
    const { applicants } = props
    return (
        <TableContainer>
            {
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> JID </TableCell>
                            <TableCell> AID </TableCell>
                            <TableCell> Screened </TableCell>
                            <TableCell> Details </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            applicants.map((applicant) => {
                                return (
                                    <TableRow>
                                        <TableCell> {applicant.name} </TableCell>
                                        <TableCell> {applicant.jid} </TableCell>
                                        <TableCell> {applicant.aid} </TableCell>
                                        <TableCell> {printFormat(applicant.created[0], '', true)} </TableCell>
                                        <TableCell>
                                            <Link to={`/applications/${applicant.jid}/${applicant.aid}`}>
                                                <IconButton>
                                                    <ZoomIn />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            }
        </TableContainer>
    )
}