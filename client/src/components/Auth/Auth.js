import React, {useState} from 'react'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';

export default function Auth() {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);

  const isSignup = true;

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const handleShowPassword = () => setShowPassword((prevShowPassowrd) => !prevShowPassowrd);

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
                  <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                  <Input name='lastname' label='Last Name' handleChange={handleChange} half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
