import React from 'react'

// redux
import { useDispatch } from 'react-redux'
import { hmActions } from '../../redux/actions'

// MUI
import { makeStyles, Paper } from '@material-ui/core';

// Custom Components
import { HMModal } from './'
import { ItemTable } from '../General';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
}));

export function HMTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch()

	// States
	const [open, setOpen] = React.useState(false);

	// Open the edit hm modal
	const openEditModal = (id) => {
		dispatch(hmActions.getHM(id.hmid))
		setOpen(true)
	};

	// Close the edit hm modal
	const handleClose = () => {
		setOpen(false);
	};

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
		{ id: 'department', numeric: false, disablePadding: false, label: 'Department' },
		{ id: 'team', numeric: false, disablePadding: false, label: 'Team' },
	];

	const idString = 'hmid'
	// This path is used to get to the details page
	const path = "HM"

	return (
		<>
			<Paper className={classes.paper}>
				<ItemTable
					title="Hiring Managers"
					idString={idString}
					path={path}
					headCells={headCells}
					handleClickEdit={openEditModal}
                    handleDelete={handleDelete}
					{...props}
				/>
			</Paper>
			<HMModal open={open} handleClose={handleClose} />
		</>
	)
}