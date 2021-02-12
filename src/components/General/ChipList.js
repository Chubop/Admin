import React from 'react';
import { Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    chip: {
        marginRight: '2px',
        marginBottom: '2px'
    },
}));

export function ChipList(props) {
    const classes = useStyles()
    // selected must be an array
    const { selected, setSelected } = props

    // When clicking on a chip, toggle whether it is selected
    const chipClick = (value) => {
        let newSelected = selected
        // If chip is currently selected
        if (inSelected(value)) {
            if (Array.isArray(newSelected)) {
                // Remove chip's value from array of selected
                let index = selected.indexOf(value)
                newSelected.splice(index, 1)
            }
            else {
                newSelected = ''
            }
        }
        // If chip is currently not selected
        else {
            if (Array.isArray(newSelected)) {
                // Add chip's value to end of array
                newSelected.push(value)
            }
            else {
                newSelected = value
            }
        }
        setSelected(newSelected)
    }

    // Checking if chip is selected
    function inSelected(value) {
        return Array.isArray(selected) && selected.includes(value)
            || value === selected
    }

    // Render all of the possible chip values and whether each is selected
    return props.labels.map((value) => {
        return <Chip
            color={inSelected(value) ? "primary" : "default"}
            className={classes.chip}
            size="medium"
            label={value}
            onClick={() => chipClick(value)}
        />
    })
}