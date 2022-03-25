import React, { useState } from 'react'

// MUI
import { makeStyles, Paper, Typography } from '@material-ui/core';

// Custom Components
import { HMModal } from './'
import { PaginateTable, ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
}));

export function HMTable(props) {
	const classes = useStyles();

	const paginate = props.paginate ? true : false

	// States
	const [editOpen, setEditOpen] = useState(false);
	const [editHMID, setEditHMID] = useState();

	// Open the edit hm modal
	const openEditModal = (id) => {
		setEditHMID(id.hmid)
		setEditOpen(true)
	};

	// Close the edit hm modal
	const handleClose = () => { setEditOpen(false); };

	// When delete button in table is pressed
	const handleDelete = (hiringManagers) => {
		// TODO
		console.log(hiringManagers)
	}

	// These id's comes from the database, they must match
	// You can see the possible values to display in redux
	const headCells = [
		{ id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
		{ id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
		{
			id: "email", numeric: false, disablePadding: false, label: "Email",
			contentFunction: (email, { hmid }) => {
				return (<>
					<Typography>
						{email}
					</Typography>
					<Typography style={{ opacity: 0.3 }}>
						{hmid}
					</Typography>
				</>)
			}
		},
		{ id: 'department', numeric: false, disablePadding: false, label: 'Department' },
		{
			id: 'accessibleJobs', numeric: true, disablePadding: false, label: 'Accessible Jobs',
			contentFunction: (accessibleJobs, { }) => {
				if (Array.isArray(accessibleJobs))
					return (accessibleJobs.length)
				return 0
			}
		},
	];

	const idString = 'hmid'
	// This path is used to get to the details page
	const path = "HM"

	return (
		<>
			<Paper className={classes.paper} >
				<PaginateTable
					title="Hiring Managers"
					idString={idString}
					path={path}
					headCells={headCells}
					handleClickEdit={openEditModal}
					handleDelete={handleDelete}
					prefKey={"hmsPage"}
					moreKeys={['hmid']}
					noDelete
					{...props}
				/>
			</Paper>
			<HMModal open={editOpen} handleClose={handleClose} hmid={editHMID} />
		</>
	)
}