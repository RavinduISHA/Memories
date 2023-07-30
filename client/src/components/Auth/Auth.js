import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google'
import Icon from './Icon'
import { signin, signup } from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export default function Auth() {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSignup, setisSignup] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup){
      dispatch(signup(formData, history))
    } else{
      dispatch(signin(formData, history))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setisSignup((previsSignup) => !previsSignup)
    setShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassowrd) => !prevShowPassowrd);

  const googleSuccess = async (res) =>{
    console.log(res)
  }
  const googleFailure = () =>{
    console.log('google sign in failed!')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus classes={classes} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input name='lastName' label='Last Name' handleChange={handleChange} classes={classes}/>
                  </Grid>
                </>
              )
            }
            <Grid item xs={12}>
              <Input name='email' label='Email Address' handleChange={handleChange} type='email' classes={classes}/>
            </Grid>
            <Grid item xs={12}>
              <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            </Grid>
              { isSignup &&
                <Grid item xs={12}>
                  <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
                </Grid>
              }       
              <Grid item xs={12}>
              <Grid item xs={12}>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
              </Grid>
              <GoogleOAuthProvider
                  clientId='144135918801-kh5qrtou6v5ma81tfg0g1cnvtglljtgc.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <Button
                      className={classes.googleButton}
                      color='primary'
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      variant='contained'
                      startIcon={<Icon />}
                    >
                      Google
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                />
              </Grid>
              <Grid container justify='flex-end'>
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup ? 'Already have account? Sign In' : 'Don\'t have an account? Sign Up'}
                  </Button>
                </Grid>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
