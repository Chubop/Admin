import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Button } from '@material-ui/core'

import { SignIn } from './pages'
import Main from './pages/LoggedIn/Main'

import { authActions } from './redux/actions'

function App() {
  const authenticated = useSelector(state => state.authentication.loggedIn)
  const dispatch = useDispatch()

  // Routes that are shown when logged in
  const loggedIn = () => {
    return (
      <Router>
        <Main/>
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

  const testFunction = () => {
    return(
      <>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            let profile = {
              email: "wvuong@liveperson.com",
              password: "123456"
            }
            dispatch(authActions.register(profile))
          }}  
        > 
          Sign Up
        </Button>

        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            let profile = {
              email: "wvuong@liveperson.com",
              password: "123456"
            }
            dispatch(authActions.login(profile))
          }}  
        > 
          Login 
        </Button>

        <Button
          variant="contained" 
          color="primary"
          onClick={() => {dispatch(authActions.logout())}}
        >
          Logout  
        </Button>
    </>
    )
  }

  
  return (
    <div className="App">
      {/* {testFunction()} */}
      {authenticated ? loggedIn() : loggedOut()}
    </div>
  );
}

export default App;
