import React, { useEffect, useState, useRef } from 'react'

import { Button, Grid, IconButton, InputAdornment, Paper, Popper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Add, Clear } from '@material-ui/icons';

import {colors} from '../../../theme/colors'

const highlightColor = colors.components.tableHeader

export function SearchObjectSelect(props) {
    const { selectedIDs, onChange: propsHandleChange, idKey, nameKey } = props
    const { searchList, optionColumns, noneAddedMsg, searchKeys, } = props

    const [selectedObjects, setSelectedObjects] = useState([])
    const [textFieldValue, setTextFieldValue] = useState('')
    const [matches, setMatches] = useState([])
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const [popupOpen, setPopupOpen] = useState(false)

    // Initialize selected objects using given array of keys from given array of possible data objects
    useEffect(() => {
        setSelectedObjects(selectedIDs)
        let initSelectedObjects = []
        for (let i = 0; i < selectedIDs.length; i++) {
            let keyValue = selectedIDs[i]
            let value = searchList.filter(option => option[idKey] === keyValue)
            initSelectedObjects.push(value[0])
        }
        setSelectedObjects(initSelectedObjects)
    }, [])

    // Width of modal can change
    const inputContainerRef = useRef(null)
    const [popupWidth, setPopupWidth] = useState()
    useEffect(() => {
        let inputContainerWidth = 0
        if (inputContainerRef) {
            inputContainerWidth = inputContainerRef.current.clientWidth
        }

        setPopupWidth(inputContainerWidth)
    }, [matches])

    // Adding a new selection
    const handleAddRow = (event, object, selected) => {
        if (!object || !object[idKey]) {
            object = searchList
                .filter(option =>
                    !selectedIDs.includes(option[idKey]) && isMatch(option[idKey], '')
                )[0]
            if (!object || !object[idKey]) {
                return
            }
        }
        let newID = object[idKey]

        // If we already have this button, don't add it
        if (selectedIDs.includes(newID))
            return

        // Pass new array up to parent
        let newSelected = [...selectedIDs, newID]
        propsHandleChange(newSelected)
        setMatches(getAllMatches(textFieldValue, newSelected))

        // Add new row with this value
        setSelectedObjects([...selectedObjects, object])
    }

    // Adds all matches from popup
    const handleAddAllMatches = () => {
        let selected = selectedIDs
        let objects = selectedObjects
        let allMatches = matches
        if (allMatches.length === 0)
            allMatches = getAllMatches('', selected)

        for (let i = 0; i < allMatches.length; i++) {
            objects.push(allMatches[i])
            selected.push(allMatches[i][idKey])
        }
        setSelectedObjects(objects)
        propsHandleChange(selected)
        setMatches([])
    }

    // When 'X' is clicked
    const handleRemoveRow = (object) => {
        let key = object[idKey]

        // Remove object from state from props and pass to parent 
        let newIDs = selectedIDs.filter(item => item !== key)
        propsHandleChange(newIDs)
        setMatches(getAllMatches(textFieldValue, newIDs))

        // Remove object from selected objects state
        let newObjects = selectedObjects.filter(item => item[idKey] !== key)
        setSelectedObjects(newObjects)
    }

    // Returns whether the given object has any properties (keys from searchKeys) that match given text
    // Also returns true if no given text
    const isMatch = (option, text) => {
        if (text === '')
            return true
        let string = ''
        for (let i = 0; i < searchKeys.length; i++) {
            let key = searchKeys[i]
            if (option[key])
                string += `${option[key]} `
        }
        return (string.toLowerCase().includes(text.toLowerCase()))
    }

    // Get all objects that
    // * are not part of the given list of ID's (selected)
    // * match the given text
    const getAllMatches = (text, selected) => {
        return searchList
            .filter(option => !(selected.includes(option[idKey])))
            .filter(option => isMatch(option, text))
    }

    // Render each row of the options in the popper
    const renderOption = (option, index) => {
        let columns = optionColumns
        let highlighted = highlightedIndex === index
        return (
            <TableRow key={`search-option-${idKey}-${option[idKey]}`}
                style={{ backgroundColor: highlighted && highlightColor }}
            >
                { columns.map((column) => <TableCell>{option[column.key]}</TableCell>)}
                <TableCell>
                    <IconButton onClick={(e) => {
                        handleAddRow(e, option)
                    }} >
                        <Add />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }

    // Handle arrow navigation
    // handle ctrl combos
    const handleKeyUp = (event) => {
        event.preventDefault()
        if (popupOpen) {
            if (event.ctrlKey) {
                switch (event.key) {
                    case "j":
                        highlightDown()
                        break;
                    case "k":
                        highlightUp()
                        break;
                    case "a":
                        handleAddAllMatches()
                        break;
                    default:
                        return;
                }
            }
            switch (event.keyCode) {
                case 13: // Enter
                    handleAddRow(event, matches[highlightedIndex], selectedIDs)
                    break;
                case 40: // Down arrow
                    highlightDown()
                    break;
                case 38: // Up arrow
                    highlightUp()
                    break;
                default:
                    return
            }
        }
    }

    // Handle keys that have default events that must be prevented
    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 9:
                setPopupOpen(false)
                setMatches([])
                break;
            case 27:
                event.preventDefault()
                event.stopPropagation()
                setTextFieldValue('')
                setPopupOpen(false)
                setMatches([])
                break;
            case 35: // End
                event.preventDefault()
                setHighlightedIndex(matches.length - 1)
                break;
            case 36: // Home
                event.preventDefault()
                setHighlightedIndex(0)
                break;
            default:
                return;
        }
    }

    // Move highlight up in list
    const highlightUp = () => {
        if (highlightedIndex > 0)
            setHighlightedIndex(highlightedIndex - 1)
    }

    // Move highlight down in list
    const highlightDown = () => {
        if (highlightedIndex < (matches.length - 1))
            setHighlightedIndex(highlightedIndex + 1)
    }

    if (!selectedIDs)
        return <div />
    return (
        <Grid container spacing={2} direction='column'>
            <Grid item>
                <div ref={inputContainerRef} style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <TextField
                        id={`search-box-${idKey}-${nameKey}`}
                        autoComplete={'off'}
                        fullWidth
                        placeholder={props.searchMessage}
                        value={textFieldValue}
                        onFocus={(e) => {
                            setMatches(getAllMatches(textFieldValue, selectedIDs))
                            setPopupOpen(true)
                        }}
                        onChange={(event) => {
                            let value = event.target.value
                            if (!popupOpen)
                                setPopupOpen(true)
                            setTextFieldValue(value);
                            let newMatches = getAllMatches(value, selectedIDs)
                            if (highlightedIndex >= newMatches.length) {
                                setHighlightedIndex(newMatches.length - 1)
                            }
                            else if (highlightedIndex < 0)
                                setHighlightedIndex(0)
                            setMatches(newMatches)
                        }}
                        // For arrow navigation
                        onKeyUp={handleKeyUp}
                        onKeyDown={handleKeyDown}

                        InputProps={{
                            endAdornment:
                                <InputAdornment>
                                    <IconButton
                                        onClick={() => {
                                            setPopupOpen(false)
                                            setMatches([])
                                            setTextFieldValue('')
                                            setHighlightedIndex(0)
                                        }}
                                        tabIndex="-1">
                                        <Clear />
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                    <Button onClick={() => handleAddAllMatches()} style={{ whiteSpace: 'nowrap' }}>
                        Add All
                    </Button>
                </div>
                {
                    matches.length > 0 &&
                    <Popper
                        anchorEl={inputContainerRef.current} open={popupOpen}
                        disableAutoFocus disableEnforceFocus
                        onFocus={() => setPopupOpen(true)}
                        style={{ width: popupWidth, zIndex: 1500 }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <Paper>
                            <Table>
                                <TableBody >
                                    {matches.map((row, index) => { return (renderOption(row, index)) })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Popper>
                }
            </Grid>
            <Grid item>
                {
                    selectedObjects.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow key={`selected-${nameKey}-${idKey}-head-row`}>
                                    {optionColumns.map((column) => <TableCell>{column.label}</TableCell>)}
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    selectedObjects.map((object) =>
                                        <TableRow key={`selected-${idKey}-${object[idKey]}`}>
                                            {optionColumns.map((column) =>
                                                <TableCell> {object[column.key]} </TableCell>)
                                            }
                                            <TableCell>
                                                <IconButton onClick={() => handleRemoveRow(object)}>
                                                    <Clear />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        :
                        <Typography> {noneAddedMsg} </Typography>
                }
            </Grid>
        </Grid>
    )
}

// TODO Require props

// AutocompleteObjectList.propTypes = {
// };