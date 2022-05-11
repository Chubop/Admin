import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


import { authActions } from './redux/authentication'

import { SignIn, ForgetPassword} from './pages/Authentication'
import Main from './pages/LoggedIn/Main'

function App() {
  const profile = useSelector(state => state.authentication.profile)
  const authenticated = useSelector(state => state.authentication.loggedIn)
  const dispatch = useDispatch()

  // Routes that are shown when logged in
  const loggedIn = () => {

    let preferences = JSON.parse(localStorage.getItem('preferences'))
    if (!preferences) {
      // Set all default preferences
      preferences = {
        "rowsPerPage": { "recentApplicants": 5, "applicantsPage": 5 },
        "daysMax": { "applications": 5 },
        "dashboard": { "statsDays": 5000 }
      }
    }
    else {
      // Set each default preference as needed
      if (!preferences.rowsPerPage) {
        preferences = {
          ...preferences,
          "rowsPerPage": { 
            "recentApplicants": 5, 
            "recentJobs": 5,
            "applicantsPage": 5,
            "candidatesPage": 5,
            "jobsPage": 5,
            "unsupJobPage": 5,
            "hmsPage": 5,
          },
        }
      }
      if (!preferences.daysMax) {
        preferences = {
          ...preferences,
          "daysMax": { "applications": 5 }
        }
      }
      if (!preferences.dashboard) {
        preferences = {
          ...preferences,
          "dashboard": { "statsDays": 5000 }
        }
      }
    }
    localStorage.setItem('preferences', JSON.stringify(preferences))

    return (
      <Router>
        <Main/>
      </Router>
    )
  }

  const forgetPassword = () => {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={ForgetPassword}/>
          <Route path="/forget" component={ForgetPassword}/>
          <Route component={ForgetPassword}/>
        </Switch>
      </Router>
    )
  }

  // Routes that are shown when logged out
  const loggedOut = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route path="/login" component={SignIn}/>
          <Route component={SignIn}/>
        </Switch>
      </Router>
    )
  }

  const current_env = process.env.REACT_APP_ENV
  if(current_env === 'production'){
    dispatch(authActions.IAPSelf())
  }

  if(current_env !== 'production' && profile){
    // Temporary Alt Forced Reset Password Flow
    // TODO: Change to SSO later
    let resetPassword = profile['resetPassword']
    if(resetPassword){
      return (
        <div className="App"> 
          {forgetPassword()}
        </div>
      )
    }

  }

  return (
    <div className="App">
      {authenticated ? loggedIn() : loggedOut()}
    </div>
  );
}

export default App;
