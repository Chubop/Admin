import React from 'react'
import { 
    Divider, 
    Drawer, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    makeStyles, 
    useTheme
} from "@material-ui/core";
import { 
    ChevronLeft, 
    ChevronRight, 
    Dashboard, 
    ExitToApp, 
    Face, 
    People, 
    Settings, 
    Work,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authentication";
import { Link, } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'None',
        color: 'black'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },


}));

export function MenuDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const theme = useTheme();
    const { handleClose, open } = props

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <Link className={classes.link} to="/dashboard">
                    <ListItem button>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                </Link>
                <Link className={classes.link} to="/job">
                    <ListItem button href="/job">
                        <ListItemIcon><Work /></ListItemIcon>
                        <ListItemText primary={"Jobs"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/HM">
                    <ListItem button>
                        <ListItemIcon><Face /></ListItemIcon>
                        <ListItemText primary={"Hiring Managers"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/applications">
                    <ListItem button>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary={"Applications"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/candidate">
                    <ListItem button>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary={"Candidates"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/settings">
                    <ListItem button href="/settings">
                        <ListItemIcon> <Settings /> </ListItemIcon>
                        <ListItemText primary={"Settings"} />
                    </ListItem>
                </Link>

                <ListItem button onClick={() => { dispatch(authActions.logout()) }}>
                    <ListItemIcon> <ExitToApp /> </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </List>
        </Drawer>
    )
}