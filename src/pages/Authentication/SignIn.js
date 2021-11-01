import React, {useState} from 'react';
import {
    FormControlLabel,
    CssBaseline,
    Switch,
    Container,
    TextField, 
    Typography,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux/authentication'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export function SignIn(props){
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const handleChange = (event) => {
        let newValue = event.target.value
        let id = event.target.id
        setState({
            ...state,
            [id]: newValue            
        })
    }

    const loginValidation = () => {
        let error = false

        if(state.email === ''){
            error = true
        }else if( state.password === '' || state.password.length < 5){
            error = true
        }

        return error
    }

    const loginSubmission = () => {
        // TODO: Add Form Validation

        setError(loginValidation())

        if(!error)
            dispatch(authActions.login(state))
    }


    return (
        <Container maxWidth="sm">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField 
                        id="email"
                        margin="normal" 
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        required
                        onChange={handleChange}
                    /> 

                    <TextField 
                        id="password"
                        margin="normal" 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        fullWidth 
                        required
                        onChange={handleChange}
                    /> 

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}

                    <Button  onClick={loginSubmission} type="button" fullWidth variant="contained" color="primary" className={classes.submit}> 
                        Login 
                    </Button>

                    <div style={{color: 'red', textAlign: 'center'}}>
                        {error && <span> Something went wrong </span> }
                    </div> 

                    {/* <a href="/signup"> Take me to sign up</a> */}

                </form>
            </div>
        </Container>
    )

}