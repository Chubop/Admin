import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom'

// MUI
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    makeStyles,
    lighten,
} from '@material-ui/core'

import {
    Delete,
    FilterList,
    Edit,
} from '@material-ui/icons'

// Custom
import { printFormat } from '../../functions'
import { useDispatch } from 'react-redux';
import { colors } from '../../theme/colors';

// Makes a row with the categories from headCells
function createRow(dataRow, allKeys, idString) {
    let row = {}
    row.key = dataRow[idString]
    for (let key of allKeys){
        let newCell = dataRow[key]
        if (!newCell) {
            if (newCell === 0) {
                newCell = 0
            }
            else {
                newCell = ""
            }
        }
        row[key] = newCell
    }
    return row;
}

// Makes all rows from items
function createRows(data, headCells, idString) {
    let rows = []
    for (let i = 0; i < data.length; i++) {
        rows[i] = createRow(data[i], headCells, idString)
    }
    return (rows)
}

function descendingComparator(a, b, orderBy) {
    if ((b[orderBy] || b[orderBy] === 0) && (a[orderBy] || a[orderBy] === 0)) { // always have empty values last when sorting
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const additionalColumns = 3
function EnhancedTableHead(props) {
    const { classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
        noEdit,
        noDelete,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const editCol = { id: 'edit', numeric: true, disablePadding: false, label: 'Edit' }
    const deleteCol = { id: 'delete', numeric: true, disablePadding: false, label: 'Delete' }
    let header = headCells
    if (!noEdit) {
        header = header.concat([editCol])
    }
    if (!noDelete) {
        header = header.concat([deleteCol])
    }

    return (
        <TableHead style={{backgroundColor: colors.components.tableHeader}}>
            <TableRow>
                {header.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Typography variant='subtitle1'>
                                {headCell.label}
                            </Typography>
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        color: colors.theme.text
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    filter: {
        color: 'white',
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, title, handleDelete } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="In Progress">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                // <Tooltip title="Filter list">
                <Tooltip title="IN PROGRESS">
                    <IconButton
                        onClick={props.handleFilterOpen}
                        className={classes.filter}
                        aria-label="filter list">
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    tableRow: {
        textDecoration: "none"
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export function ItemTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    // headCells are the columns to display, and include the value key
    // prefKey is the key to use to store the rowsPerPage preference in localStorage
    const { data, idString, headCells, path, title, prefKey } = props

    useEffect(() => {
        if (data) {
            let allKeys = headCells.map((cell) => cell.id)
            if (props.moreKeys)
                allKeys = allKeys.concat(props.moreKeys)
            setRows(createRows(data, allKeys, idString))

            let preferences = JSON.parse(localStorage.getItem('preferences'))
            let rowsPref = rowsPerPage
            if (prefKey) {
                // Check if preferences are stored and prefKey is given
                if (preferences) {
                    if (preferences.rowsPerPage && preferences.rowsPerPage[prefKey]) {
                        // Read stored value
                        rowsPref = preferences.rowsPerPage[prefKey]
                        setRowsPerPage(rowsPref)
                    }
                    if (!isNaN(preferences['rowsPerPage'])) { // Remove old preference
                        preferences['rowsPerPage'] = {}
                    }
                    preferences['rowsPerPage'][prefKey] = rowsPref
                    localStorage.setItem('preferences', JSON.stringify(preferences))
                }
                else {
                    preferences = {
                        'rowsPerPage': {
                            [prefKey]: rowsPref
                        }
                    }
                    localStorage.setItem('preferences', JSON.stringify(preferences))
                }
            }
        }
    }, [data])

    // If loading
    if (!data) {
        return <div />
    }

    // Sort the rows by property
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked && selected.length === 0) {
            const newSelecteds = rows.map((row) => row.key);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    // Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Pagination
    const handleChangeRowsPerPage = (event) => {
        let value = event.target.value
        // Set stored preferences
        let preferences = JSON.parse(localStorage.getItem('preferences'))
        preferences['rowsPerPage'][prefKey] = value === "All" ? 100 : value
        localStorage.setItem('preferences', JSON.stringify(preferences))

        // Set state
        if (value === 'All') {
            value = rows.length
        }
        value = parseInt(value, 10)
        setRowsPerPage(value);
        setPage(0);
    };

    const handleFilterOpen = (event) => {
        // TODO
    }

    const handleDelete = () => {
        // TODO
        console.log("In Progress")
        // let items = []
        // for (let s = 0; s < selected.length; s++) {
        //     for (let r = 0; r < rows.length; r++) {
        //         if (rows[r].key === selected[s]) {
        //             items.push(rows[r])
        //         }
        //     }
        // }
        // props.handleDelete(items)
    }

    // Check if key of row is in list of selected rows
    const isSelected = (key) => selected.indexOf(key) !== -1;

    // Find number of empty rows
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} title={title} handleFilterOpen={handleFilterOpen} handleDelete={handleDelete} />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                        {...props}
                    />
                    <TableBody>

                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.key);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                let detailsPath = `/${path}/${row.key}`
                                if (props.getDetailsPath !== undefined)
                                    detailsPath = props.getDetailsPath(row)

                                let deleteProps = [row.key]
                                let editID = { [idString]: row.key }
                                if ('jid' in row && 'aid' in row || props.includeJID) {
                                    deleteProps = [row['jid'], row.key]
                                    editID = { [idString]: row.key, 'jid': row['jid'] }
                                }

                                return (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.key}
                                        selected={isItemSelected}
                                        component={Link}
                                        to={detailsPath}
                                    >
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleSelectClick(event, row.key)}
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell> */}

                                        {headCells.map((cell) => {
                                            return (
                                                <TableCell
                                                    align={cell.numeric ? 'right' : 'left'}
                                                    padding={cell.disablePadding ? 'none' : 'default'}
                                                    key={cell.id}
                                                >
                                                    <Typography variant="subtitle2">

                                                    {
                                                        cell.contentFunction === undefined ?
                                                            printFormat(row[cell['id']], cell.suffix, cell.isDate)
                                                            :
                                                            <>
                                                                {cell.contentFunction(row[cell['id']], row)}
                                                            </>
                                                    }
                                                    </Typography>
                                                </TableCell>
                                            )
                                        })}
                                        {
                                            !props.noEdit &&
                                            <TableCell
                                                align="right"
                                                onClick={(event) => {
                                                    // Stopping link and preserving action 
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                }}
                                            >
                                                <Tooltip title="Open Edit Modal">
                                                    <IconButton aria-label="edit" color="primary" onClick={() => { props.handleClickEdit(editID) }}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        }
                                        {
                                            !props.noDelete &&
                                            <TableCell
                                                align="right"
                                                onClick={(event) => {
                                                    // Stopping link and preserving action 
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                }}
                                            >
                                                <Tooltip title="Delete">
                                                    <IconButton aria-label="delete" color="primary" onClick={() => { props.handleDelete(deleteProps) }}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        }
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && rows.length > rowsPerPage && (
                            <TableRow style={{ height: 81 * emptyRows }}>
                                <TableCell colSpan={headCells.length + additionalColumns} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100, 'All']}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}