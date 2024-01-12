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
import { SignUpProps } from '../App.types';
import { userSignUp } from '../components/Miscellaneous/apiRequests';
import { useNavigate } from 'react-router-dom';


const SignUp: FC<SignUpProps> = ({handleModal}) => {
  const navigate = useNavigate();

  var tempPassword: string = "";
  var tempConfirmPassword: string = "";

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [countPassword, setCountPassword] = React.useState(0);
  const [countConfirmPassword, setCountConfirmPassword] = React.useState(0);
  const [message, setMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: (data.get('username')! as string).trim(),
      password: data.get('password')! as string,
      password_confirmation: data.get('confirmPassword')! as string
    }
    
    if (user.password !== user.password_confirmation) {
      return handleModal(["Password doesn't match confirmation!"]);
    }
    userSignUp(user)
      .then(response => {
          if ('message' in response && response.success) {
            setMessage(response.message);
            setTimeout(() => navigate('/SignIn'), 2000);
          }
          if ('errors' in response && !response.success) handleModal(response.errors);
        });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                helperText=" "
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={(countPassword && countConfirmPassword ? true : false) && tempPassword !== tempConfirmPassword}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="password"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >{showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                }}
                onChange={e => {
                  setCountPassword(e.target.value.length);
                  tempPassword = e.target.value;
                }}
                helperText={countPassword && countConfirmPassword
                  ? (tempPassword !== tempConfirmPassword
                    ?"Ensure both password inputs are identical"
                    : " ")
                    : " "}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={(countPassword && countConfirmPassword ? true : false) && tempPassword !== tempConfirmPassword}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                autoComplete="confirm-password"
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                }}
                onChange={e => {
                  setCountConfirmPassword(e.target.value.length);
                  tempConfirmPassword = e.target.value;
                }}
                helperText={countPassword && countConfirmPassword
                  ? (tempPassword !== tempConfirmPassword
                    ? "Ensure both password inputs are identical"
                    : " ")
                    : " "}                
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <h4 className="text-center p-1">{message}</h4>
        </Box>
      </Box>
      
    </Container>
  );
}
function handleModal(arg0: string[]) {
  throw new Error('Function not implemented.');
}

export default SignUp;