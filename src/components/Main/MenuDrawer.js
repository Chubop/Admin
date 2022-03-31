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
    useTheme,
    Typography
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
import Briefcase from "../../assets/icons/Briefcase.svg";
import Document from "../../assets/icons/Document.svg";
import ProfileShield from "../../assets/icons/ProfileShield.svg";
import TwoPeopleCircle from "../../assets/icons/TwoPeopleCircle.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authentication";
import { Link, } from 'react-router-dom'

const drawerWidth = 240;
const title = "Marlon Admin";

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
        paddingLeft: theme.spacing(2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },


}));

export function MenuDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const theme = useTheme();
    const { handleClose, open } = props

    return (
        <Drawer
            borderColor="white"
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Typography className={classes.drawerHeader} variant="h6">
                {/* <IconButton onClick={handleClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton> */}
                {title}
            </Typography>
            <List>
                <Link className={classes.link} to="/dashboard">
                    <ListItem button>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                </Link>
                <Link className={classes.link} to="/job">
                    <ListItem button href="/job">
                        <ListItemIcon><img src={Briefcase} style={{height: '1.5rem', width: '1.5rem'}}/></ListItemIcon>
                        <ListItemText primary={"Jobs"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/HM">
                    <ListItem button>
                        <ListItemIcon><img src={ProfileShield} style={{height: '1.5rem', width: '1.5rem'}}/></ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/applications">
                    <ListItem button>
                        <ListItemIcon><img src={Document} style={{height: '1.5rem', width: '1.5rem'}}/></ListItemIcon>
                        <ListItemText primary={"Applications"} />
                    </ListItem>
                </Link>

                <Link className={classes.link} to="/candidate">
                    <ListItem button>
                        <ListItemIcon><img src={TwoPeopleCircle} style={{height: '1.5rem', width: '1.5rem'}}/></ListItemIcon>
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