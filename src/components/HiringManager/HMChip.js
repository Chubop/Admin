import React from 'react';
import { Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    chip: {
      marginRight: '2px',
    },
  }));
  
export function HMChip(props){
    const classes = useStyles()

    let chipClick = () => {

    }

    return props.labels.map((value, index) => {
        return <Chip 
            className={classes.chip}
            size="medium"
            label={value}
            onClick={chipClick}
        />
    })
}