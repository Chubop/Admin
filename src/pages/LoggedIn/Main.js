import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core'
import {
  Menu,
} from '@material-ui/icons'

import {
  Switch,
  Route,
} from 'react-router-dom'

// Redux

// Importing Pages
import { Applicant } from './Applicant'
import { Candidate } from './Candidate'
import { HiringManager } from './HiringManager'
import { Job } from './Job'
import { AppDetails, CandidateDetails, HMDetails, JobDetails } from './Details'
import { Settings } from './Settings'
import { DashBoard } from './DashBoard'

import { NotFound } from './NotFound'

// Importing Components
import Footer from './Footer'
import { MenuDrawer } from '../../components/Main/MenuDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Main() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Marlon Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <MenuDrawer
        handleClose={handleDrawerClose}
        open={drawerOpen}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        {/* Added to move content below appbar */}
        <div className={classes.drawerHeader} />

        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route path="/dashboard" component={DashBoard} />
          <Route exact path="/job" component={Job} />
          <Route path="/job/:jid" component={JobDetails} />

          <Route exact path="/hm" component={HiringManager} />
          <Route path="/hm/:hmid" component={HMDetails}/>

          <Route exact path="/applications" component={Applicant}/>
          <Route path="/applications/:jid/:aid" component={AppDetails}/>

          <Route exact path="/candidate" component={Candidate}/>
          <Route path="/candidate/:cid" component={CandidateDetails}/>

          <Route path="/settings" component={Settings}/>
          <Route component={NotFound}/>
          </Switch>

          <Footer/>
          
      </main>
    </div>
  );
}

export default Main