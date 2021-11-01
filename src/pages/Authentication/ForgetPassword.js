import React, {useState} from 'react';
import {
    FormControlLabel,
    CssBaseline,
    Checkbox,
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

export function ForgetPassword(props){
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        password: '',
        rePassword: '',
        errorMsg: '',
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

        if(state.password != state.rePassword){
            error = true
            setState({
                ...state,
                errorMsg: 'Password does not match'
            })
        }else if( state.password === '' || state.password.length < 5){
            error = true
            setState({
                ...state,
                errorMsg: 'Password cannot be empty and needs to be at least 5 characters'
            })
        }

        return error
    }

    const loginSubmission = () => {
        // TODO: Add Form Validation

        setError(loginValidation())

        if(!error)
            dispatch(authActions.resetPassword(state))
    }


    return (
        <Container maxWidth="sm">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Forget Password
                </Typography>
                <form className={classes.form} noValidate>
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

                    <TextField 
                        id="rePassword"
                        margin="normal" 
                        label="Re-Enter Password" 
                        variant="outlined" 
                        type="password" 
                        fullWidth 
                        required
                        onChange={handleChange}
                    /> 

                    <Button  onClick={loginSubmission} type="button" fullWidth variant="contained" color="primary" className={classes.submit}> 
                        Reset Password
                    </Button>

                    <div style={{color: 'red', textAlign: 'center'}}>
                        {error && <span> {state.errorMsg} </span> }
                    </div> 

                </form>
            </div>
        </Container>
    )

}