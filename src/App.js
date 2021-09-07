import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { SignIn, ForgetPassword} from './pages/Authentication'
import Main from './pages/LoggedIn/Main'

function App() {
  const profile = useSelector(state => state.authentication.profile)
  const authenticated = useSelector(state => state.authentication.loggedIn)

  // Routes that are shown when logged in
  const loggedIn = () => {

    let preferences = JSON.parse(localStorage.getItem('preferences'))
    if(!preferences){
      preferences = {"rowsPerPage":{"recentApplicants":5,"applicantsPage":5},"daysMax":{"applications":5}}
      localStorage.setItem('preferences', JSON.stringify(preferences))
    }

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
  
  if(profile){
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
