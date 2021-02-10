import React, { Component } from 'react'
import PropTypes from 'prop-types';

// MUI Imports
import {
    withStyles,
    Grid,
    Avatar,
} from '@material-ui/core';
// Importing the icons
const link = require('../../assets/images/link.png')
const git = require('../../assets/images/git.png')
const website = require('../../assets/images/website.png')
const resume = require('../../assets/images/resume.png')

// Styling
const styles = theme => ({
    container:{
        padding: '0 10px 0 10px'
    },
})

export class LinkedItems extends Component 
{
    iconDisplay(item, value)
    {
        if(value === '' || value === null){
            return ""
        }

        if(item === 'linkedIn')
        {
            return(
                <Avatar alt="link" variant="square" src={link} style={{width: 40,height:40}}/>
            )
        }
        else if(item === 'resume')
        {
            return(
                <Avatar alt="resume" variant="square" src={resume} style={{width: 50,height:40}}/>
            )
        }
        else if(item === 'github')
        {
            return(
                <Avatar alt="git" variant="square" src={git} style={{width: 35,height:40}}/>
            )
        }
        else if(item === 'website')
        {
            return(
                <Avatar alt="web" variant="square" src={website} style={{width: 50,height:20, marginTop:10}}/>
            )
        }
        return ""
    }
    render() {
        const {classes} = this.props;
        const ref = this.props.reference
        const keys = Object.keys(this.props.reference)
        return (
            <Grid container
                direction="row"
                // justify="center"
                alignItems="flex-start"
            >
                {keys.map((key,index) => (
                    <div className={classes.container} key={index}>
                        <a href={ref[key]} target="_blank"> 
                            {this.iconDisplay(key, ref[key])}
                        </a>
                    </div>
                ))}
            </Grid>
        )
    }
}

LinkedItems.propTypes={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinkedItems)
