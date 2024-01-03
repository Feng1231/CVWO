import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import '../App.css';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { checkValidPasswordEdit } from './loginFunctions';
import'../App.types';

const Item = styled(Paper)(({ theme }) => ({
  width: 800,
  height: 500,
  padding: theme.spacing(3),
  ...theme.typography.body1,
  // textAlign: 'center'
  
}));
  var tempNewPassword: string = "";
  var tempConfirmPassword: string = "";
export default function ProfilePageBody() {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [countNewPassword, setCountNewPassword] = React.useState(0);
  const [countConfirmPassword, setCountConfirmPassword] = React.useState(0);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleMouseDownOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const resetValues = () => {
    setCountNewPassword(v => 0);
    setCountConfirmPassword(v => 0);
    tempNewPassword = "";
    tempConfirmPassword = "";
  }
  const [showForm, setShowForm] = React.useState(false);
  const confirmEdit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-restricted-globals
      var shouldEdit = confirm("Please confirm that you want to edit your password");
      if (shouldEdit) {
        checkValidPasswordEdit(data);
      }
  }
  const confirmDelete = () => {
    if (showForm) {
      resetValues();
      setShowForm(prevOpen => !prevOpen);
    }
    setTimeout(()=> {
        // eslint-disable-next-line no-restricted-globals
      var shouldDelete = confirm("Are you sure you want to delete your account?");
      if (shouldDelete) {
        alert('ok');
      }
    }, 1);
  }
  const handleEditPassword = () => {
    if (showForm) {
      resetValues();
    }
    setShowForm(prevOpen => !prevOpen);
  }

  function createData(username: string, userType: string, dateCreated: String) {
    return { username, userType, dateCreated };
  }

  const date = moment("12/02/2023 12:12").format("DD/MM/YYYY HH:mm");
  
  const rows = [
    createData('Admin', 'Admin', date)
    
  ];
    
  return (
      <div className='ProfilePageBody'>
        <Box
          sx={{ 
            mt: 3,
            display: 'flex',
          }}
          >

        <Item elevation={5}>
         <b>PROFILE</b>
          <Divider />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="User info table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="center">User Type</TableCell>
                  <TableCell align="right">Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell style={{width:80}} component="th" scope="row" align="left">
                      {row.username}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.userType}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.dateCreated}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              <TableCell align="left"><Button size='small' onClick={handleEditPassword}>Change Password</Button></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="right"><Button size='small' onClick={confirmDelete}>Delete Account</Button></TableCell>
              
              
              </TableFooter>
            </Table>
          </TableContainer>
          {showForm && (
            <Box component="form" onSubmit={confirmEdit} sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <TextField
                    size="small"
                    autoComplete="Old Password"
                    name="oldPassword"
                    required
                    fullWidth
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    label="Old Password"
                    autoFocus
                    InputProps={{
                      endAdornment: 
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}
                            edge="end"
                          >{showOldPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    }}
                    helperText=" "
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    error={(countNewPassword && countConfirmPassword ? true : false) && tempNewPassword !== tempConfirmPassword}
                    size="small"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    autoComplete="New Password"
                    InputProps={{
                      endAdornment: 
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                          >{showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    }}
                    onChange={e => {
                      setCountNewPassword(e.target.value.length);
                      tempNewPassword = e.target.value;
                    }}
                    helperText={countNewPassword && countConfirmPassword
                      ? (tempNewPassword !== tempConfirmPassword
                        ?"Ensure both password inputs are identical"
                        : " ")
                        : " "}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    error={(countNewPassword && countConfirmPassword ? true : false) && tempNewPassword !== tempConfirmPassword}
                    size="small"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
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
                    helperText={countNewPassword && countConfirmPassword
                      ? (tempNewPassword !== tempConfirmPassword
                        ? "Ensure both password inputs are identical"
                        : " ")
                        : " "}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 0, mb: 0 }}
              >
                Confirm
              </Button>
            </Box>
          )}
        </Item>
          </Box>

        </div>
  );
}
