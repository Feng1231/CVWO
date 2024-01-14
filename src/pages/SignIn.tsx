import React, { FC, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { checkCookies, userSignIn } from '../components/Miscellaneous/apiRequests';
import { SignInProps, UserSignInProps } from '../App.types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// sign in page display
const SignIn: FC<SignInProps> = ({ handleModal, handleLogin }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [checked, setChecked] = useState(false);
  setTimeout(()=>{if (token && !checked) {
    checkCookies(token)
      .then(response => {
        if ('user' in response && response.success) {
          handleLogin(response.user);
          navigate('/');
        }
      });
    setChecked(true);
  }}, 500);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user:UserSignInProps = {
      username: (data.get('username')! as string).trim(),
      password: data.get('password')! as string
    }
      userSignIn(user)
        .then(response => {

          if('user' in response && response.success) {
            handleLogin(response.user);
            navigate('/');
          }
          if('errors' in response && !response.success) handleModal(response.errors);
        })
    };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="overline" fontSize={20}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >{showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}

          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            <Typography variant="overline">Sign In</Typography>
          </Button>
            <Grid container>
            
            <Grid item>
              <Link href="./SignUp" variant="body2">
                <Typography variant="overline">New to discum? Sign Up</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;


